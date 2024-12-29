importScripts('/app/uv/uv.bundle.js');
importScripts('/app/uv/uv.config.js');
importScripts('/app/uv/uv.sw.js');

const sw = new UVServiceWorker();

self.addEventListener('fetch', (event) => event.respondWith(sw.fetch(event)));
