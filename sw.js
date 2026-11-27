/* =============================================================
   MCU Tracker — Service Worker (sw.js)
   Precaches app shell, stale-while-revalidate for TMDB posters
   ============================================================= */

const CACHE_NAME = 'mcu-tracker-shell-v16';
const POSTER_CACHE_NAME = 'mcu-tracker-posters-v1';

const APP_SHELL = [
  './',
  './index.html',
  './manifest.webmanifest',
  './css/bundle.css',
  './js/bundle.js',
  './icons/icon-192.png',
  './icons/icon-512.png'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(APP_SHELL);
    }).then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.map((key) => {
          if (key !== CACHE_NAME && key !== POSTER_CACHE_NAME) {
            return caches.delete(key);
          }
        })
      );
    }).then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (event) => {
  const url = new URL(event.request.url);

  // Bypass analytics / insights and serverless API proxy routes
  if (url.pathname.includes('/_vercel/') || url.pathname.startsWith('/api/')) {
    return;
  }

  // 1. TMDB Posters: Stale-While-Revalidate
  if (url.hostname === 'image.tmdb.org') {
    event.respondWith(
      caches.open(POSTER_CACHE_NAME).then(async (cache) => {
        const cachedResponse = await cache.match(event.request);
        const fetchPromise = fetch(event.request).then((networkResponse) => {
          if (networkResponse && networkResponse.status === 200) {
            cache.put(event.request, networkResponse.clone());
          }
          return networkResponse;
        }).catch((err) => {
          // If offline and no cache, fallback gracefully
          return cachedResponse;
        });

        // Return cached immediately if available, otherwise wait for network
        return cachedResponse || fetchPromise;
      })
    );
    return;
  }

  // 2. CDNs (Google Fonts, Lucide icons): Stale-While-Revalidate
  if (url.hostname.includes('fonts.googleapis.com') || 
      url.hostname.includes('fonts.gstatic.com') || 
      url.hostname.includes('unpkg.com')) {
    event.respondWith(
      caches.open(CACHE_NAME).then(async (cache) => {
        const cachedResponse = await cache.match(event.request);
        const fetchPromise = fetch(event.request).then((networkResponse) => {
          if (networkResponse && networkResponse.status === 200) {
            cache.put(event.request, networkResponse.clone());
          }
          return networkResponse;
        }).catch(() => cachedResponse);
        return cachedResponse || fetchPromise;
      })
    );
    return;
  }

  // 3. App Shell: Network-First with Cache Fallback (always fresh online, works offline)
  event.respondWith(
    fetch(event.request).then((networkResponse) => {
      if (event.request.method === 'GET' && networkResponse && networkResponse.status === 200 && url.origin === self.location.origin) {
        const responseToCache = networkResponse.clone();
        caches.open(CACHE_NAME).then((cache) => {
          cache.put(event.request, responseToCache);
        });
      }
      return networkResponse;
    }).catch(() => {
      return caches.match(event.request).then((cachedResponse) => {
        if (cachedResponse) return cachedResponse;
        if (event.request.mode === 'navigate') {
          return caches.match('./index.html') || caches.match('./');
        }
      });
    })
  );
});

