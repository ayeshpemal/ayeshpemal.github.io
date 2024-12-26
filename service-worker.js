const CACHE_NAME = 'calculator-v1';
const REPO_NAME = '/calculator'; // Change this to match your repository name

const ASSETS_TO_CACHE = [
  `${REPO_NAME}/`,
  `${REPO_NAME}/index.html`,
  `${REPO_NAME}/style.css`,
  `${REPO_NAME}/index.js`,
  `${REPO_NAME}/manifest.json`,
  `${REPO_NAME}/icons/icon-192x192.png`,
  `${REPO_NAME}/icons/icon-512x512.png`
];

// Install event
self.addEventListener('install', (event) => {
  console.log('Service Worker: Installing....');
  
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('Service Worker: Caching Files');
        return cache.addAll(ASSETS_TO_CACHE);
      })
  );
});

// Activate event
self.addEventListener('activate', (event) => {
  console.log('Service Worker: Activated');
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});

// Fetch event
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request)
      .then((response) => {
        return response || fetch(event.request);
      })
      .catch(() => {
        return new Response('Offline content here');
      })
  );
});