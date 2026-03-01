// Minimal service worker — prevents 404 on /sw.js requests
self.addEventListener('install', () => self.skipWaiting());
self.addEventListener('activate', (e) => e.waitUntil(self.clients.claim()));
