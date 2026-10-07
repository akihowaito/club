const CACHE = 'mioo-pocket-v91';
self.addEventListener('activate', event => event.waitUntil((async () => {
  for (const key of await caches.keys()) if (key.startsWith('mioo-pocket-') && key !== CACHE) await caches.delete(key);
  await self.clients.claim();
})()));
self.addEventListener('fetch', event => {
  const request = event.request, url = new URL(request.url);
  if (request.method !== 'GET' || url.origin !== location.origin || !url.pathname.startsWith(new URL(self.registration.scope).pathname)) return;
  if (request.mode === 'navigate') {
    event.respondWith(fetch(request).then(async response => {
      if (response.ok) { const cache = await caches.open(CACHE); await cache.put(request, response.clone()); }
      return response;
    }).catch(async () => await caches.match(request) || Response.error()));
  } else if (/\.(js|css|webp|png)$/.test(url.pathname)) {
    event.respondWith((async () => {
      const cached = await caches.match(request);
      if (cached) return cached;
      const response = await fetch(request);
      if (response.ok) { const cache = await caches.open(CACHE); await cache.put(request, response.clone()); }
      return response;
    })());
  }
});
