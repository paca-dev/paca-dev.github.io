self.addEventListener('install', function(event) {
    event.waitUntil(
        caches.open('my-site-cache').then(function(cache) {
            return cache.addAll([
                '/',
                '/index.html',
                '/assets/css/style.css',
                '/assets/js/main.js',
                // Add other assets you want to cache
            ]);
        })
    );
});

self.addEventListener('fetch', function(event) {
    event.respondWith(
        caches.match(event.request).then(function(response) {
            return response || fetch(event.request);
        })
    );
});
