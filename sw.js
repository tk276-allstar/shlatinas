const C='claridad-v1',F=['./','index.html','units.json','manifest.json','icon-192.png','icon-512.png'];
addEventListener('install',e=>e.waitUntil(caches.open(C).then(c=>c.addAll(F)).then(()=>skipWaiting())));
addEventListener('activate',e=>e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(x=>x!=C).map(x=>caches.delete(x)))).then(()=>clients.claim())));
addEventListener('fetch',e=>{if(e.request.method!='GET')return;e.respondWith(caches.open(C).then(async c=>{const m=await c.match(e.request);const n=fetch(e.request).then(r=>{if(r.ok)c.put(e.request,r.clone());return r}).catch(()=>m);return m||n}))});
