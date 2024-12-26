const CACHE_NAME = 'calculator-cache-v1';
const urlsToCache = [
    '/calculator/',
    '/calculator/index.html',
    '/calculator/style.css',
    '/calculator/script.js',
    '/calculator/manifest.json',
    // Add other assets like images if needed
];

self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => {
                console.log('Opened cache');
                return cache.addAll(urlsToCache);
            })
    );
});

self.addEventListener('fetch', event => {
    event.respondWith(
        caches.match(event.request)
            .then(response => {
                if (response) {
                    return response; // Return from cache if found
                }
                return fetch(event.request); // Fetch from network if not in cache
            })
    );
});