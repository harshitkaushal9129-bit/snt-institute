const CACHE_NAME = 'snt-institute-v3';
const assetsToCache = [
  'dashboard.html',
  'Index.html',
  'admin.html',
  'attendence.html',
  'basic.html',
  'calendar.html',
  'display.html',
  'id-card.html',
  'id-verify.html',
  'manifest.json',
  'receipt.html',
  'sw.js',
  'v-receipt.html',
  'Logo.jpg',
  'Logo (1).jpg',
  'SNT.jpg'
];

// Install Service Worker and Cache Files
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log('SNT App: Caching all assets');
      return cache.addAll(assetsToCache);
    })
  );
});

// Activate and Clean Old Caches
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cache) => {
          if (cache !== CACHE_NAME) {
            console.log('SNT App: Clearing old cache');
            return caches.delete(cache);
          }
        })
      );
    })
  );
});

// Fetch Strategy: Network first, fallback to cache
self.addEventListener('fetch', (event) => {
  event.respondWith(
    fetch(event.request).catch(() => {
      return caches.match(event.request);
    })
  );
});
