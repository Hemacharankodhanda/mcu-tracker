/* =============================================================
   MCU Tracker — Service Worker (sw.js)
   Precaches app shell, stale-while-revalidate for TMDB posters
   ============================================================= */

const CACHE_NAME = 'mcu-tracker-shell-v1';
const POSTER_CACHE_NAME = 'mcu-tracker-posters-v1';

const APP_SHELL = [
  './',
  './index.html',
  './manifest.webmanifest',
  './css/variables.css',
  './css/base.css',
  './css/components.css',
  './css/layout.css',
  './css/pages.css',
  './js/data.js',
  './js/tmdb.js',
  './js/storage.js',
  './js/tracker.js',
  './js/timeline.js',
  './js/quiz.js',
  './js/profile.js',
  './js/share.js',
  './js/upcoming.js',
  './js/details.js',
  './js/animations.js',
  './js/pwa.js',
  './js/app.js',
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

  // Bypass analytics / insights
  if (url.pathname.includes('/_vercel/')) {
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

  // 3. App Shell: Cache-First with Network Fallback
  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      if (cachedResponse) {
        return cachedResponse;
      }
      return fetch(event.request).then((networkResponse) => {
        // Cache same-origin valid GET requests
        if (event.request.method === 'GET' && networkResponse && networkResponse.status === 200 && url.origin === self.location.origin) {
          const responseToCache = networkResponse.clone();
          caches.open(CACHE_NAME).then((cache) => {
            cache.put(event.request, responseToCache);
          });
        }
        return networkResponse;
      }).catch(() => {
        // Offline navigation fallback to index.html
        if (event.request.mode === 'navigate') {
          return caches.match('./index.html') || caches.match('./');
        }
      });
    })
  );
});

