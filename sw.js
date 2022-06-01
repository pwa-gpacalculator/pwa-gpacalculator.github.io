// // console.log('service worker inside sw.js');

// const cacheName = 'app-shell-rsrs';
// const assets = [
//   '/',
//   'index.html',
//   'app.js',
//   'materialize.min.js',
//   'css/style.css',
//   'css/materialize.min.css',
//   'src/icon/assets/icons/icon-512x512.png'
// ];



// // install service worker
// self.addEventListener('install', evt => {
//   console.log('service worker installed');

//   evt.waitUntil(
//     caches.open(cacheName).then(cache => {
//       cache.addAll(assets);
//     })
//   );

// });

// // activate service worker
// self.addEventListener('activate', evt => {
//   console.log('service worker activated');
// });

// self.addEventListener('fetch', evt => {
//   console.log(evt);

//   evt.respondWith(
//     caches.match(evt.request).then(cacheRes => {
//       return cacheRes || evt.request;
//     })
//   );

  
// });










// Cache names
var dataCacheName = 'GPA-Cal'
var cacheName = 'GPA_Cal'
// Application shell files to be cached
var filesToCache = [
  '/',
  'index.html',
  'app.js',
  'materialize.min.js',
  'css/style.css',
  'css/materialize.min.css',
  'src/icon/assets/icons/icon-512x512.png'
]
self.addEventListener('install', function (e) {
      console.log('[ServiceWorker] Install')
      e.waitUntil(
             caches.open(cacheName).then(function (cache) {
                     console.log('[ServiceWorker] Caching app shell')
                     return cache.addAll(filesToCache)
              })
      )
})
self.addEventListener('activate', function (e) {
      console.log('[ServiceWorker] Activate')
      e.waitUntil(
              caches.keys().then(function (keyList) {
                       return Promise.all(keyList.map(function (key) {
                               if (key !== cacheName && key !== dataCacheName) {
                                    console.log('[ServiceWorker] Removing old cache', key)
                                    return caches.delete(key)
                               }
                        }))
              })
      )
      return self.clients.claim()
})
self.addEventListener('fetch', function (e) {
      console.log('[ServiceWorker] Fetch', e.request.url)
      e.respondWith(
             caches.match(e.request).then(function (response) {
                     return response || fetch(e.request)
             })
       )
})







