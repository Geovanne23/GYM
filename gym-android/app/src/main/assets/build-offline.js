const fs = require('fs');
const path = require('path');

const inputPath = path.join(__dirname, '..', '..', '..', '..', '..', 'index.html');
const outputPath = path.join(__dirname, 'index.html');

let html = fs.readFileSync(inputPath, 'utf8');

// Remove preconnect e fontes externas (não funcionam offline)
html = html.replace(/<link rel="preconnect" href="https:\/\/fonts\.googleapis\.com" \/>\r?\n/g, '');
html = html.replace(/<link rel="preconnect" href="https:\/\/fonts\.gstatic\.com" crossorigin \/>\r?\n/g, '');
html = html.replace(/<link href="https:\/\/fonts\.googleapis\.com[^"]*" rel="stylesheet" \/>\r?\n/g, '');

// Remove PWA manifest (não funciona em file://)
html = html.replace(/<link rel="manifest"[^>]+\/>\r?\n/g, '');

// Injeta data.js antes do script inline principal
html = html.replace('<script>', '<script src="data.js"></script>\n  <script>');

// Remove registro do Service Worker
html = html.replace(
  /\/\/ Registrar Service Worker\s*\r?\n\s*if \('serviceWorker' in navigator\) \{[\s\S]*?\}\s*\}\s*\);/m,
  '// Service Worker desativado no app Android'
);

fs.writeFileSync(outputPath, html, 'utf8');
console.log('✅ index.html offline criado em:', outputPath);
