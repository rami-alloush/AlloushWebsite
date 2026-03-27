// Service Worker - Network-first for HTML, Cache-first for static assets
const CACHE_VERSION = 'dev'; // Replaced automatically with git commit SHA on deploy
const CACHE_NAME = `alloush-portfolio-${CACHE_VERSION}`;

const STATIC_ASSETS = [
    '/hero-pattern.webp',
    'https://fonts.googleapis.com/css2?family=Manrope:wght@300;400;500;600;700&family=Space+Grotesk:wght@500;600;700&display=swap',
];

// Install event - pre-cache static assets only
self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then((cache) => cache.addAll(STATIC_ASSETS.map(url => new Request(url, { cache: 'reload' }))))
            .catch(() => { /* Silently fail */ })
    );
    // Activate new SW immediately without waiting for old tabs to close
    self.skipWaiting();
});

// Activate event - delete ALL old caches
self.addEventListener('activate', (event) => {
    event.waitUntil(
        caches.keys().then((cacheNames) =>
            Promise.all(
                cacheNames
                    .filter((name) => name !== CACHE_NAME)
                    .map((name) => caches.delete(name))
            )
        )
    );
    self.clients.claim();
});

// Fetch event
self.addEventListener('fetch', (event) => {
    const url = new URL(event.request.url);

    // --- Network-first for HTML pages ---
    // Always try to get the freshest HTML from the network.
    if (event.request.destination === 'document' || url.pathname.endsWith('.html') || url.pathname === '/') {
        event.respondWith(
            fetch(event.request)
                .then((networkResponse) => {
                    // If we got a valid response, update the cache and return it
                    if (networkResponse && networkResponse.status === 200) {
                        const responseToCache = networkResponse.clone();
                        caches.open(CACHE_NAME).then((cache) => cache.put(event.request, responseToCache));
                    }
                    return networkResponse;
                })
                .catch(() => {
                    // Network failed, serve cached version as fallback
                    return caches.match(event.request).then(r => r || caches.match('/index.html'));
                })
        );
        return;
    }

    // --- Cache-first for static assets (images, fonts, etc.) ---
    // Skip non-same-origin requests that aren't fonts
    if (!url.origin.startsWith(self.location.origin) &&
        !event.request.url.startsWith('https://fonts.googleapis.com') &&
        !event.request.url.startsWith('https://fonts.gstatic.com')) {
        return;
    }

    event.respondWith(
        caches.match(event.request).then((cachedResponse) => {
            if (cachedResponse) {
                return cachedResponse; // Serve from cache
            }
            // Not in cache - fetch from network and cache it
            return fetch(event.request.clone()).then((networkResponse) => {
                if (!networkResponse || networkResponse.status !== 200 || networkResponse.type === 'error') {
                    return networkResponse;
                }
                const responseToCache = networkResponse.clone();
                caches.open(CACHE_NAME).then((cache) => cache.put(event.request, responseToCache));
                return networkResponse;
            });
        })
    );
});
