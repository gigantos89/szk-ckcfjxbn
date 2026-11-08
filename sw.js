var V='szk-v69',LIB='szk-lib',LIBH=['cdn.jsdelivr.net','cdnjs.cloudflare.com','unpkg.com'];
self.addEventListener('install',function(e){e.waitUntil(caches.open(V).then(function(c){return c.addAll(['./','index.html','manifest.webmanifest','icon-192.png','icon-512.png']);}));self.skipWaiting();});
self.addEventListener('activate',function(e){e.waitUntil(caches.keys().then(function(k){return Promise.all(k.filter(function(x){return x!==V&&x!==LIB;}).map(function(x){return caches.delete(x);}));}));self.clients.claim();});
self.addEventListener('fetch',function(e){var r=e.request,u=new URL(r.url);
 if(r.method==='GET'&&LIBH.indexOf(u.hostname)>=0){e.respondWith(caches.open(LIB).then(function(c){return c.match(r).then(function(m){if(m)return m;return fetch(r).then(function(res){if(res&&res.status===200)c.put(r,res.clone());return res;});});}));return;}
 if(r.method!=='GET'||u.origin!==location.origin)return;
 e.respondWith(fetch(r).then(function(res){var cp=res.clone();caches.open(V).then(function(c){c.put(r,cp);});return res;}).catch(function(){return caches.match(r).then(function(m){return m||caches.match('index.html');});}));});
