const http = require('http');
const fs = require('fs');
const path = require('path');
const zlib = require('zlib');

const PORT = process.env.PORT || 3000;
const ROOT = __dirname; // Usa o diretório do projeto, independente do cwd

// ====== MIME TYPES ======
const MIME_TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.css':  'text/css; charset=utf-8',
  '.js':   'application/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.png':  'image/png',
  '.jpg':  'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.gif':  'image/gif',
  '.svg':  'image/svg+xml',
  '.ico':  'image/x-icon',
  '.webp': 'image/webp',
  '.woff': 'font/woff',
  '.woff2':'font/woff2',
  '.ttf':  'font/ttf',
  '.otf':  'font/otf',
  '.mp4':  'video/mp4',
  '.webm': 'video/webm',
  '.pdf':  'application/pdf',
  '.mp3':  'audio/mpeg',
  '.txt':  'text/plain; charset=utf-8',
  '.xml':  'application/xml',
  '.webmanifest': 'application/manifest+json',
};

function getMime(filePath) {
  return MIME_TYPES[path.extname(filePath).toLowerCase()] || 'application/octet-stream';
}

// ====== AUTO-DISCOVERY: Varre HTMLs recursivamente ======
// Mapeia "slug" → caminho absoluto
// Ex: about.html → /seu/dir/about.html
//     produtos/index.html → /seu/dir/produtos/index.html
const htmlMap = {}; // { slug: absolutePath }
let rootFile = null; // Arquivo da raiz (/)

const ROOT_CANDIDATES = ['index.html', 'main.html'];

function slugify(filePath) {
  // Converte caminho relativo ao ROOT em slug limpo
  // produtos/sobre.html → /produtos/sobre
  // index.html → '' (raiz)
  let rel = path.relative(ROOT, filePath).replace(/\\/g, '/');
  // Remove .html
  rel = rel.replace(/\.html$/, '');
  // index → '' (dentro de subpasta vira a pasta)
  rel = rel.replace(/\/index$/, '').replace(/^index$/, '');
  return rel; // ex: '', 'about', 'produtos/sobre'
}

function scanHTMLFiles(dir = ROOT) {
  let entries;
  try { entries = fs.readdirSync(dir, { withFileTypes: true }); }
  catch { return; }

  for (const entry of entries) {
    // Ignora node_modules, .git, pastas ocultas
    if (entry.name.startsWith('.') || entry.name === 'node_modules') continue;

    const full = path.join(dir, entry.name);

    if (entry.isDirectory()) {
      scanHTMLFiles(full);
    } else if (entry.isFile() && entry.name.endsWith('.html')) {
      const slug = slugify(full);
      htmlMap[slug] = full;
    }
  }

  // Detecta arquivo raiz
  for (const candidate of ROOT_CANDIDATES) {
    const fp = path.join(ROOT, candidate);
    if (fs.existsSync(fp)) { rootFile = fp; break; }
  }

  // Fallback: primeiro .html encontrado na raiz
  if (!rootFile) {
    const rootHtmls = Object.entries(htmlMap)
      .filter(([slug]) => !slug.includes('/'))
      .sort(([a], [b]) => a.localeCompare(b));
    if (rootHtmls.length) rootFile = rootHtmls[0][1];
  }
}

// ====== IN-MEMORY CACHE (lazy, por demanda) ======
const pageCache = {};

function minifyHTML(html) {
  return html
    .replace(/<!--(?!\[if)[\s\S]*?-->/g, '')
    .replace(/>\s{2,}</g, '> <')
    .replace(/\s+>/g, '>')
    .replace(/\n\s*\n/g, '\n')
    .trim();
}

function cacheFile(filePath) {
  if (pageCache[filePath]) return pageCache[filePath];
  if (!fs.existsSync(filePath)) return null;

  const ext = path.extname(filePath).toLowerCase();
  const raw = fs.readFileSync(filePath);

  let processedRaw = raw;
  if (ext === '.html') {
    processedRaw = Buffer.from(minifyHTML(raw.toString('utf8')), 'utf8');
  }

  pageCache[filePath] = {
    raw:     processedRaw,
    gzip:    zlib.gzipSync(processedRaw),
    deflate: zlib.deflateSync(processedRaw),
    mime:    getMime(filePath),
  };
  return pageCache[filePath];
}

// ====== CACHE-CONTROL ======
function getCacheControl(ext) {
  if (['.png','.jpg','.jpeg','.gif','.svg','.ico','.webp',
       '.woff','.woff2','.ttf','.otf','.mp4','.webm','.mp3'].includes(ext)) {
    return 'public, max-age=31536000';
  }
  if (['.js', '.css'].includes(ext)) return 'public, max-age=604800';
  return 'no-cache';
}

// ====== SEND ======
function send(req, res, statusCode, filePath, cached) {
  const ext = path.extname(filePath).toLowerCase();
  const headers = {
    'Content-Type': getMime(filePath),
    'Cache-Control': getCacheControl(ext),
    'X-Content-Type-Options': 'nosniff',
  };

  const ae = req.headers['accept-encoding'] || '';
  if (cached.gzip && ae.includes('gzip')) {
    headers['Content-Encoding'] = 'gzip';
    headers['Vary'] = 'Accept-Encoding';
    res.writeHead(statusCode, headers);
    res.end(cached.gzip);
  } else if (cached.deflate && ae.includes('deflate')) {
    headers['Content-Encoding'] = 'deflate';
    headers['Vary'] = 'Accept-Encoding';
    res.writeHead(statusCode, headers);
    res.end(cached.deflate);
  } else {
    res.writeHead(statusCode, headers);
    res.end(cached.raw);
  }
}

// ====== 404 FALLBACK ======
const FALLBACK_404 = Buffer.from(`<!DOCTYPE html>
<html lang="pt-BR">
<head><meta charset="utf-8"><title>404 — Não encontrado</title>
<style>
  body { font-family: monospace; display: flex; flex-direction: column;
         align-items: center; justify-content: center; height: 100vh;
         margin: 0; background: #0f0f0f; color: #eee; }
  h1 { font-size: 6rem; margin: 0; color: #ff4444; }
  p  { color: #888; }
  a  { color: #4af; }
</style>
</head>
<body>
  <h1>404</h1>
  <p>Página não encontrada.</p>
  <a href="/">← Voltar ao início</a>
</body>
</html>`, 'utf8');

function serve404(req, res) {
  const custom = path.join(ROOT, '404.html');
  const cached = cacheFile(custom);
  if (cached) {
    send(req, res, 404, custom, cached);
    return;
  }
  // Fallback inline
  res.writeHead(404, { 'Content-Type': 'text/html; charset=utf-8' });
  res.end(FALLBACK_404);
}

// ====== SERVE FILE ======
function serveFile(req, res, filePath, statusCode = 200) {
  const cached = cacheFile(filePath);
  if (cached) {
    send(req, res, statusCode, filePath, cached);
    return;
  }

  // Arquivo binário (imagem, mp3 etc) — lê do disco sem cachear
  fs.readFile(filePath, (err, data) => {
    if (err) { serve404(req, res); return; }
    const ext = path.extname(filePath).toLowerCase();
    const headers = {
      'Content-Type': getMime(filePath),
      'Cache-Control': getCacheControl(ext),
      'X-Content-Type-Options': 'nosniff',
    };
    res.writeHead(statusCode, headers);
    res.end(data);
  });
}

// ====== RESOLVE PRETTY URL → filePath ======
// Retorna { filePath, redirect } ou null (404)
function resolveURL(urlPath) {
  // Raiz
  if (urlPath === '/') {
    if (rootFile) return { filePath: rootFile };
    return null;
  }

  const clean = urlPath.replace(/^\//, ''); // remove leading /

  // 1. Arquivo com extensão (assets, css, js, etc.)
  const absolute = path.join(ROOT, clean);
  if (path.extname(clean)) {
    try {
      const stat = fs.statSync(absolute);
      if (stat.isFile()) return { filePath: absolute };
    } catch { /* não existe */ }
    return null;
  }

  // 2. Pretty URL: slug exato no mapa
  if (htmlMap[clean]) return { filePath: htmlMap[clean] };

  // 3. Slug sem trailing slash
  if (htmlMap[clean.replace(/\/$/, '')]) return { filePath: htmlMap[clean.replace(/\/$/, '')] };

  // 4. Arquivo físico (sem extensão na URL, mas existe no disco como arquivo)
  try {
    const stat = fs.statSync(absolute);
    if (stat.isFile()) return { filePath: absolute };
  } catch { /* não existe ou é diretório → 404 */ }

  return null;
}

// ====== SERVIDOR ======
const server = http.createServer((req, res) => {
  let urlPath;
  try {
    urlPath = decodeURIComponent(req.url.split('?')[0]);
  } catch {
    urlPath = req.url.split('?')[0];
  }

  // Remove trailing slash (exceto raiz)
  if (urlPath !== '/' && urlPath.endsWith('/')) {
    res.writeHead(301, { 'Location': urlPath.slice(0, -1) });
    res.end(); return;
  }

  // Redireciona /pagina.html → /pagina (Pretty URLs)
  if (urlPath.endsWith('.html') && urlPath !== '/404.html') {
    const pretty = urlPath.slice(0, -5) || '/';
    res.writeHead(301, { 'Location': pretty });
    res.end(); return;
  }

  // Redireciona /index → /
  if (urlPath === '/index') {
    res.writeHead(301, { 'Location': '/' });
    res.end(); return;
  }

  console.log(`[${new Date().toLocaleTimeString()}] ${req.method} ${urlPath}`);

  // Security: path traversal
  const absolute = path.resolve(ROOT, urlPath.replace(/^\//, ''));
  if (!absolute.startsWith(ROOT)) {
    res.writeHead(403); res.end('403 Forbidden'); return;
  }

  const resolved = resolveURL(urlPath);
  if (resolved) {
    serveFile(req, res, resolved.filePath);
  } else {
    serve404(req, res);
  }
});

// ====== HOT-RELOAD: Monitora mudanças no diretório ======
function rebuildEntry(filePath) {
  const ext = path.extname(filePath).toLowerCase();
  delete pageCache[filePath];
  if (ext === '.html') {
    Object.keys(htmlMap).forEach(k => delete htmlMap[k]);
    rootFile = null;
    scanHTMLFiles();
    const updated = Object.keys(htmlMap).map(s => '  /' + s).sort().join('\n') || '  (nenhum)';
    console.log('\n  🔄  Mapa atualizado:\n' + updated + '\n');
  }
}

function watchRoot() {
  try {
    fs.watch(ROOT, { recursive: true }, (event, filename) => {
      if (!filename) return;
      if (filename.startsWith('.') || filename.includes('node_modules') || filename.includes('.git')) return;
      const filePath = path.join(ROOT, filename);
      console.log(`  👁  [${event}] ${filename}`);
      rebuildEntry(filePath);
    });
    console.log('  Hot-reload ativo (monitorando mudancas)\n');
  } catch (err) {
    console.warn('  ⚠  fs.watch indisponível:', err.message);
  }
}

// ====== INICIALIZAÇÃO ======
scanHTMLFiles();
watchRoot();

const pages = Object.keys(htmlMap).map(s => '/' + s).sort();

server.listen(PORT, () => {
  console.log('');
  console.log('  ╔══════════════════════════════════════════════════════╗');
  console.log('  ║   🚀  Servidor universal iniciado                    ║');
  console.log(`  ║   Local:   http://localhost:${PORT}                     ║`);
  console.log(`  ║   Diretório: ${ROOT.length > 36 ? '...' + ROOT.slice(-33) : ROOT.padEnd(36)} ║`);
  console.log('  ╠══════════════════════════════════════════════════════╣');
  console.log(`  ║   Raiz (/)  →  ${rootFile ? path.relative(ROOT, rootFile).padEnd(35) : 'nenhum index/main.html'.padEnd(35)} ║`);
  console.log('  ╠══════════════════════════════════════════════════════╣');
  console.log('  ║   Pretty URLs descobertas:                           ║');
  if (pages.length === 0) {
    console.log('  ║     (nenhum .html encontrado)                        ║');
  } else {
    pages.forEach(p => {
      const label = (p || '/').padEnd(50);
      console.log(`  ║   ${label.slice(0, 50)}  ║`);
    });
  }
  console.log('  ╚══════════════════════════════════════════════════════╝');
  console.log('');
});

server.on('error', (err) => {
  if (err.code === 'EADDRINUSE') {
    console.error(`\n❌  Porta ${PORT} já está em uso.\n`);
  } else {
    console.error('Erro no servidor:', err);
  }
  process.exit(1);
});
