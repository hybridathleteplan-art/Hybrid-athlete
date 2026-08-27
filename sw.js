// Service Worker for Hybrid Athlete.
// This file must be hosted at the ROOT of your site (same folder as index.html), e.g.
// https://your-app.vercel.app/sw.js — a service worker can only control pages at or
// below the folder it's served from, so it can't live in a subfolder.

self.addEventListener('push', (event) => {
  let data = { title: 'Hybrid Athlete', body: 'You have a notification' };
  try { data = event.data.json(); } catch (e) {}
  event.waitUntil(
    self.registration.showNotification(data.title, {
      body: data.body,
    })
  );
});

self.addEventListener('notificationclick', (event) => {
  event.notification.close();
  event.waitUntil(
    clients.matchAll({ type: 'window' }).then((clientList) => {
      for (const client of clientList) {
        if ('focus' in client) return client.focus();
      }
      if (clients.openWindow) return clients.openWindow('/');
    })
  );
});
