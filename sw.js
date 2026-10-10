// اسم ذاكرة التخزين المؤقت
const CACHE_NAME = 'stars-game-v1';

// الملفات التي نريد تخزينها
const FILES_TO_CACHE = [
  './',
  './index.html',
  './manifest.json',
  './icon-512.png'
];

// عند التثبيت: خزّن الملفات
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log('✅ تم تخزين الملفات');
      return cache.addAll(FILES_TO_CACHE);
    })
  );
  self.skipWaiting();
});

// عند التفعيل: احذف الذاكرات القديمة
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.filter((key) => key !== CACHE_NAME)
            .map((key) => caches.delete(key))
      );
    })
  );
  self.clients.claim();
});

// عند الطلب: أعد الملف من الذاكرة أو من الشبكة
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
});