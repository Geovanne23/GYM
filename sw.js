const CACHE_NAME = 'gym-cache-v1';
const ASSETS_TO_CACHE = [
  '/',
  '/index.html',
  '/styles.css',
  '/manifest.json',
  '/img/icon.png',
  '/img/splash.png',
  'https://unpkg.com/@phosphor-icons/web'
];

// Instalação do Service Worker
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log('[Service Worker] Caching app shell and static assets');
      return cache.addAll(ASSETS_TO_CACHE);
    }).then(() => self.skipWaiting())
  );
});

// Ativação e limpeza de cache antigo
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cache) => {
          if (cache !== CACHE_NAME) {
            console.log('[Service Worker] Removing old cache:', cache);
            return caches.delete(cache);
          }
        })
      );
    }).then(() => self.clients.claim())
  );
});

// Interceptar requisições
self.addEventListener('fetch', (event) => {
  const req = event.request;
  
  // Ignorar requisições de API (o frontend lidará com sincronização/cache local de dados da API)
  if (req.url.includes('/api/')) {
    return;
  }

  // Estratégia Cache-First (com fallback de rede) para recursos estáticos e externos
  event.respondWith(
    caches.match(req).then((cachedResponse) => {
      if (cachedResponse) {
        // Atualiza o cache em background se o arquivo estático mudar
        fetch(req).then((networkResponse) => {
          if (networkResponse.status === 200) {
            caches.open(CACHE_NAME).then((cache) => cache.put(req, networkResponse));
          }
        }).catch(() => { /* ignora se falhar */ });

        return cachedResponse;
      }

      return fetch(req).then((networkResponse) => {
        // Cacheia novas requisições de fontes ou ícones de terceiros que ocorrem em runtime
        if (
          networkResponse.status === 200 &&
          (req.url.includes('fonts.googleapis.com') ||
           req.url.includes('fonts.gstatic.com') ||
           req.url.includes('unpkg.com'))
        ) {
          const responseClone = networkResponse.clone();
          caches.open(CACHE_NAME).then((cache) => {
            cache.put(req, responseClone);
          });
        }
        return networkResponse;
      }).catch((err) => {
        // Fallback para index.html se tudo falhar (SPA fallback)
        if (req.mode === 'navigate') {
          return caches.match('/');
        }
        throw err;
      });
    })
  );
});
