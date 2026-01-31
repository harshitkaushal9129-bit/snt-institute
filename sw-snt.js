const CACHE_NAME = 'snt-institute-v4'; // Version update kiya
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
  'manifest-snt.json', // Sahi naam
  'receipt.html',
  'sw-snt.js', // Sahi naam
  'v-receipt.html',
  'Logo.jpg',
  'SNT.jpg'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log('SNT App: Caching assets');
      // cache.addAll fail ho jata hai agar koi file miss ho, isliye individual error handling
      return Promise.allSettled(
        assetsToCache.map(asset => cache.add(asset).catch(err => console.log(`Failed to cache: ${asset}`, err)))
      );
    })
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cache) => {
          if (cache !== CACHE_NAME) {
            return caches.delete(cache);
          }
        })
      );
    })
  );
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    fetch(event.request).catch(() => {
      return caches.match(event.request);
    })
  );
});
