const CACHE_NAME = 'estimado-matias-v1';
const urlsToCache = [
  '/',
  '/index.html',
  '/css/demo.css',
  '/css/style.css',
  '/css/knobKnob.css',
  '/css/playericons.css',
  '/js/modernizr.custom.69142.js',
  '/js/transform.js',
  '/js/knobKnob.jquery.js',
  '/js/loadingScreen.js',
  '/js/jquery.cassette.js',
  '/js/cassette-cdn-override.js',
  '/images/P504.webp',
  'https://ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.min.js',
  'https://fonts.googleapis.com/css?family=Aldrich',
  'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css'
];

// Install event - cache resources
self.addEventListener('install', event => {
  console.log('Service Worker: Installing...');
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Service Worker: Caching files');
        return cache.addAll(urlsToCache);
      })
      .then(() => self.skipWaiting())
      .catch(err => console.error('Service Worker: Cache failed', err))
  );
});

// Activate event - clean up old caches
self.addEventListener('activate', event => {
  console.log('Service Worker: Activating...');
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheName !== CACHE_NAME) {
            console.log('Service Worker: Clearing old cache');
            return caches.delete(cacheName);
          }
        })
      );
    }).then(() => self.clients.claim())
  );
});

// Fetch event - serve from cache, fallback to network
self.addEventListener('fetch', event => {
  if (event.request.method !== 'GET') {
    return;
  }

  event.respondWith(
    caches.match(event.request)
      .then(response => {
        if (response) {
          console.log('Service Worker: Serving from cache', event.request.url);
          return response;
        }
        
        console.log('Service Worker: Fetching from network', event.request.url);
        return fetch(event.request)
          .then(response => {
            if (!response || response.status !== 200 || response.type !== 'basic') {
              return response;
            }
            
            const responseToCache = response.clone();
            caches.open(CACHE_NAME)
              .then(cache => {
                cache.put(event.request, responseToCache);
              });
            
            return response;
          });
      })
      .catch(() => {
        console.log('Service Worker: Network failed, serving fallback');
        return caches.match('/index.html');
      })
  );
});