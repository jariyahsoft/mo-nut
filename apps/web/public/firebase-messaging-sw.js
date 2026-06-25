/**
 * Firebase Messaging Service Worker
 *
 * Handles background push notifications when the app is not in focus.
 * Must be served from the root path to have full scope over the app.
 *
 * @see https://firebase.google.com/docs/cloud-messaging/js/receive
 */

importScripts('https://www.gstatic.com/firebasejs/10.7.1/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/10.7.1/firebase-messaging-compat.js');

// Firebase configuration will be injected at build time or from environment
// For now, use a placeholder that will be replaced during deployment
const firebaseConfig = {
  apiKey: '__FIREBASE_API_KEY__',
  authDomain: '__FIREBASE_AUTH_DOMAIN__',
  projectId: '__FIREBASE_PROJECT_ID__',
  storageBucket: '__FIREBASE_STORAGE_BUCKET__',
  messagingSenderId: '__FIREBASE_MESSAGING_SENDER_ID__',
  appId: '__FIREBASE_APP_ID__',
};

firebase.initializeApp(firebaseConfig);

const messaging = firebase.messaging();

/**
 * Handle background messages when the app is not in focus.
 */
messaging.onBackgroundMessage((payload) => {
  console.log('[Service Worker] Background message received:', payload);

  const notificationTitle = payload.notification?.title || 'Mo-nut';
  const notificationOptions = {
    body: payload.notification?.body || 'คุณมีการแจ้งเตือนใหม่',
    icon: payload.notification?.icon || '/icon-192.png',
    badge: '/badge-96.png',
    tag: payload.data?.notificationId || 'mo-nut-notification',
    requireInteraction: payload.data?.priority === 'high',
    data: payload.data || {},
    actions: [
      {
        action: 'open',
        title: 'เปิด',
      },
      {
        action: 'dismiss',
        title: 'ปิด',
      },
    ],
  };

  // Show notification
  return self.registration.showNotification(notificationTitle, notificationOptions);
});

/**
 * Handle notification click events.
 */
self.addEventListener('notificationclick', (event) => {
  console.log('[Service Worker] Notification clicked:', event);

  event.notification.close();

  if (event.action === 'dismiss') {
    return;
  }

  // Open app or focus existing window
  const urlToOpen = event.notification.data?.deepLink || '/';

  event.waitUntil(
    clients.matchAll({ type: 'window', includeUncontrolled: true }).then((clientList) => {
      // Focus existing window if available
      for (const client of clientList) {
        if (client.url === urlToOpen && 'focus' in client) {
          return client.focus();
        }
      }

      // Open new window
      if (clients.openWindow) {
        return clients.openWindow(urlToOpen);
      }
    })
  );
});

/**
 * Handle notification close events.
 */
self.addEventListener('notificationclose', (event) => {
  console.log('[Service Worker] Notification closed:', event);
  // Could track dismissals here for analytics
});
