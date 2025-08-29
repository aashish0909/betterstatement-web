// This is a basic service worker file.
// For this app, its main purpose is to make the app installable (PWA).

self.addEventListener('install', (event) => {
  console.log('Service Worker installing.');
});

self.addEventListener('fetch', (event) => {
  // We are not caching anything in this simple version,
  // but this event listener is often required for PWA criteria.
  event.respondWith(fetch(event.request));
});
