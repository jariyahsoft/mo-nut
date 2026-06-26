/**
 * Mo-nut Service Worker v1.0.0
 *
 * Cache Strategy:
 * - App Shell (Cache First): HTML shell, JS/CSS assets, fonts, icons
 * - Policy-Approved Network First: API data endpoints requiring freshness
 * - Network Only (ever): PHI-rich endpoints, auth tokens, mutation APIs
 * - Old-cache cleanup on activate
 */

const CACHE_VERSION = 'v1';
const STATIC_CACHE = `mo-nut-static-${CACHE_VERSION}`;
const DATA_CACHE = `mo-nut-data-${CACHE_VERSION}`;

// App Shell assets — these are safe to cache first
const APP_SHELL_URLS = [
  '/',
  '/offline.html',
  '/manifest.json',
  '/icons/icon-192.svg',
  '/icons/icon-512.svg',
  '/icons/badge-96.svg',
];

// Network-first URL patterns — fresh data preferred, fallback to cache offline
const NETWORK_FIRST_PATTERNS = [
  /^\/api\/patients\//,
  /^\/api\/medications\//,
  /^\/api\/appointments\//,
  /^\/api\/measurements\//,
];

// Network-only patterns — never cache, PHI or token-bearing endpoints
const NETWORK_ONLY_PATTERNS = [
  /^\/api\/auth\//,
  /^\/api\/upload\//,
  /^\/api\/share-links\//,
  /^\/api\/sos\//,
  /^\/api\/audit\//,
  /^\/api\/sync\//,
];

// Install: pre-cache the App Shell for offline access
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(STATIC_CACHE).then((cache) => {
      return cache.addAll(APP_SHELL_URLS);
    }).then(() => {
      // Skip waiting so the new SW activates immediately on next navigation
      return self.skipWaiting();
    })
  );
});

// Activate: clean up old caches and claim clients
self.addEventListener('activate', (event) => {
  const expectedCaches = [STATIC_CACHE, DATA_CACHE];

  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames
          .filter((name) => !expectedCaches.includes(name))
          .map((name) => caches.delete(name))
      );
    }).then(() => {
      // Claim all controlled clients so the SW handles all open tabs
      return self.clients.claim();
    })
  );
});

// Fetch: apply caching strategy per request URL
self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);

  // Skip non-GET and cross-origin requests
  if (request.method !== 'GET' || url.origin !== self.location.origin) {
    return;
  }

  // Network-Only: do not cache PHI, auth, or mutation endpoints
  if (NETWORK_ONLY_PATTERNS.some((pattern) => pattern.test(url.pathname))) {
    return;
  }

  // Network-First: API data endpoints
  if (NETWORK_FIRST_PATTERNS.some((pattern) => pattern.test(url.pathname))) {
    event.respondWith(networkFirstWithFallback(request, DATA_CACHE));
    return;
  }

  // App Shell / Static: cache-first with offline fallback
  if (request.destination === 'document' ||
      request.destination === 'style' ||
      request.destination === 'script' ||
      request.destination === 'font' ||
      request.destination === 'image' ||
      url.pathname.startsWith('/_next/static') ||
      url.pathname.startsWith('/icons/')) {
    event.respondWith(cacheFirstWithFallback(request, STATIC_CACHE));
    return;
  }

  // Default: network-first for other same-origin GET requests
  event.respondWith(networkFirstWithFallback(request, DATA_CACHE));
});

async function cacheFirstWithFallback(request, cacheName) {
  const cached = await caches.match(request);
  if (cached) {
    return cached;
  }

  try {
    const networkResponse = await fetch(request);
    if (networkResponse.ok) {
      const cache = await caches.open(cacheName);
      cache.put(request, networkResponse.clone());
    }
    return networkResponse;
  } catch (err) {
    // Offline: return offline page for documents
    if (request.destination === 'document') {
      const offlinePage = await caches.match('/offline.html');
      if (offlinePage) return offlinePage;
    }
    // Return cached fallback or throw
    throw err;
  }
}

async function networkFirstWithFallback(request, cacheName) {
  try {
    const networkResponse = await fetch(request);
    if (networkResponse.ok) {
      const cache = await caches.open(cacheName);
      cache.put(request, networkResponse.clone());
    }
    return networkResponse;
  } catch (err) {
    const cached = await caches.match(request);
    if (cached) {
      return cached;
    }
    // Offline fallback for documents
    if (request.destination === 'document') {
      const offlinePage = await caches.match('/offline.html');
      if (offlinePage) return offlinePage;
    }
    throw err;
  }
}

// Message handler for postMessage communication (update flow, cache purge)
self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }

  if (event.data && event.data.type === 'CLEAR_DATA_CACHE') {
    caches.delete(DATA_CACHE).then(() => {
      event.ports?.[0]?.postMessage({ status: 'cleared' });
    });
  }
});
