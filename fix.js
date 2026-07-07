const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

// Remover PWA e web fonts (offline mode)
html = html.replace(/<link rel="manifest" href="manifest\.json" \/>/g, '');
html = html.replace(/<link rel="preconnect" href="https:\/\/fonts\.googleapis\.com" \/>\r?\n/g, '');
html = html.replace(/<link rel="preconnect" href="https:\/\/fonts\.gstatic\.com" crossorigin \/>\r?\n/g, '');
html = html.replace(/<link href="https:\/\/fonts\.googleapis\.com[^"]*" rel="stylesheet" \/>\r?\n/g, '');

// Phosphor icons async
html = html.replace('<script src="https://unpkg.com/@phosphor-icons/web"></script>', '<script async src="https://unpkg.com/@phosphor-icons/web"></script>');

// Injetar data.js e Error Logger global no inicio do script principal
html = html.replace('<script>', `<script src="data.js"></script>\n  <script>
    window.onerror = function(m, u, l, c, e) {
      var s = document.getElementById("splashScreen");
      if(s) s.innerHTML += '<div style="color:red;z-index:9999;position:absolute;top:0;font-size:12px">ERR: ' + m + ' na linha ' + l + '</div>';
    };
    window.addEventListener("unhandledrejection", function(e) {
      var s = document.getElementById("splashScreen");
      if(s) s.innerHTML += '<div style="color:red;z-index:9999;position:absolute;top:20px;font-size:12px">PROMISE ERR: ' + e.reason + '</div>';
    });
`);

// Substituir a logica de fechar splash screen para evitar travamentos
const splashRegex = /\/\/\s*SPLASH SCREEN[^<]+window\.addEventListener\('load', \(\) => \{[\s\S]+?\}\);/m;
const safeSplash = `// SPLASH SCREEN — Animação automática de entrada
    function hideSplash() {
      const splash = document.getElementById('splashScreen');
      const content = document.getElementById('splashContent');
      if (!splash || splash.dataset.hidden) return;
      splash.dataset.hidden = "true";

      setTimeout(() => {
        if (content) {
          content.style.transition = 'transform 0.5s cubic-bezier(0.4,0,0.2,1), opacity 0.45s ease';
          content.style.transform = 'scale(0.85) translateY(-10px)';
          content.style.opacity = '0';
        }
        setTimeout(() => {
          splash.classList.add('hide');
          setTimeout(() => splash.style.display = 'none', 700);
        }, 300);
      }, 500);
    }
    document.addEventListener('DOMContentLoaded', hideSplash);
    window.addEventListener('load', hideSplash);
    setTimeout(hideSplash, 2500);`;

html = html.replace(splashRegex, safeSplash);

// Remover service worker initialization
const swRegex = /if \('serviceWorker' in navigator\) \{[\s\S]+?\}/m;
html = html.replace(swRegex, '// SW disabled for Android asset');

fs.writeFileSync('gym-android/app/src/main/assets/index.html', html);
console.log('Fixed index.html size: ' + html.length);
