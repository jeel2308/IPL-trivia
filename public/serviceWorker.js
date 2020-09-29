const CACHE_NAME = 'ipl-trivia';

const urlsToCache = ['/','/teams','/two-teams'];

self.addEventListener('install',function(event){
   event.waitUntil(
       caches.open(CACHE_NAME)
           .then(function(cache){
               return cache.addAll(urlsToCache);
           })
   )
});

self.addEventListener('fetch',function(event){
   event.respondWith(
       caches.match(event.request).then(function(res){
           if(res) return res;
           return fetch(event.request);
       })
   )
});

self.addEventListener('activate',function(event){
   let cacheWhiteList = ['ipl-trivia'];
   event.waitUntil(
       caches.keys().then(function(cacheNames){
           return Promise.all(
               cacheNames.map(function(cacheName){
                   if(cacheWhiteList.indexOf(cacheName)===-1){
                       return caches.delete(cacheName);
                   }
               })
           )
       })
   )
});