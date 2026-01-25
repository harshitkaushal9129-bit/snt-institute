const CACHE_NAME = 'snt-v1';
const ASSETS = [
  'https://harshitkaushal9129-bit.github.io/snt-institute/Index.html',
  'https://harshitkaushal9129-bit.github.io/snt-institute/SNT.jpg',
  'https://harshitkaushal9129-bit.github.io/snt-institute/manifest.json'
];

// Install Event - Files ko cache mein save karna
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(ASSETS);
    })
  );
});

// Fetch Event - Offline hone par cache se file dena
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
});
