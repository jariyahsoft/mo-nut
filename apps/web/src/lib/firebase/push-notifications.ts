import { getMessaging, getToken, onMessage, deleteToken, isSupported } from 'firebase/messaging';
import type { FirebaseApp } from 'firebase/app';
import type { Messaging } from 'firebase/messaging';

export type NotificationPermissionState = 'granted' | 'denied' | 'default' | 'unsupported';

export interface PushSubscription {
  token: string;
  createdAt: string;
  expiresAt: string;
}

export interface NotificationCapabilities {
  supported: boolean;
  permission: NotificationPermissionState;
  serviceWorkerActive: boolean;
}

/**
 * Check Web Push notification capabilities in the current browser.
 */
export async function checkNotificationCapabilities(): Promise<NotificationCapabilities> {
  // Check if we're in a browser environment
  if (typeof window === 'undefined') {
    return {
      supported: false,
      permission: 'unsupported',
      serviceWorkerActive: false,
    };
  }

  // Check Firebase Messaging support
  const messagingSupported = await isSupported();

  if (!messagingSupported || !('Notification' in window) || !('serviceWorker' in navigator)) {
    return {
      supported: false,
      permission: 'unsupported',
      serviceWorkerActive: false,
    };
  }

  // Check service worker registration
  const registration = await navigator.serviceWorker.getRegistration();
  const serviceWorkerActive = registration?.active !== null && registration?.active !== undefined;

  return {
    supported: true,
    permission: Notification.permission as NotificationPermissionState,
    serviceWorkerActive,
  };
}

/**
 * Request notification permission from the user.
 * Returns the new permission state.
 */
export async function requestNotificationPermission(): Promise<NotificationPermissionState> {
  if (typeof window === 'undefined' || !('Notification' in window)) {
    return 'unsupported';
  }

  try {
    const permission = await Notification.requestPermission();
    return permission as NotificationPermissionState;
  } catch (error) {
    console.error('[Push] Permission request failed:', error);
    return 'denied';
  }
}

/**
 * Subscribe to Web Push notifications and get FCM token.
 *
 * Prerequisites:
 * - Notification permission granted
 * - Service worker registered
 * - VAPID key configured
 */
export async function subscribeToPush(app: FirebaseApp): Promise<PushSubscription | null> {
  const capabilities = await checkNotificationCapabilities();

  if (!capabilities.supported) {
    console.warn('[Push] Web Push not supported in this environment');
    return null;
  }

  if (capabilities.permission !== 'granted') {
    console.warn('[Push] Notification permission not granted');
    return null;
  }

  if (!capabilities.serviceWorkerActive) {
    console.warn('[Push] Service worker not active');
    return null;
  }

  try {
    const messaging = getMessaging(app);
    const vapidKey = process.env.NEXT_PUBLIC_FCM_VAPID_KEY;

    if (!vapidKey) {
      console.error('[Push] VAPID key not configured');
      return null;
    }

    const token = await getToken(messaging, { vapidKey });

    if (!token) {
      console.warn('[Push] Failed to get FCM token');
      return null;
    }

    // Token is valid for ~2 months, set expiry conservatively at 30 days
    const now = new Date();
    const expiresAt = new Date(now.getTime() + 30 * 24 * 60 * 60 * 1000);

    return {
      token,
      createdAt: now.toISOString(),
      expiresAt: expiresAt.toISOString(),
    };
  } catch (error) {
    console.error('[Push] Subscription failed:', error);
    return null;
  }
}

/**
 * Unsubscribe from Web Push notifications.
 */
export async function unsubscribeFromPush(app: FirebaseApp): Promise<boolean> {
  try {
    const messaging = getMessaging(app);
    await deleteToken(messaging);
    return true;
  } catch (error) {
    console.error('[Push] Unsubscribe failed:', error);
    return false;
  }
}

/**
 * Set up foreground message handler for in-app notifications.
 * This only receives messages when the app is in focus.
 */
export function setupForegroundMessageHandler(
  app: FirebaseApp,
  onNotification: (payload: unknown) => void
): () => void {
  try {
    const messaging = getMessaging(app);

    const unsubscribe = onMessage(messaging, (payload) => {
      console.info('[Push] Foreground message received:', payload);
      onNotification(payload);
    });

    return unsubscribe;
  } catch (error) {
    console.error('[Push] Failed to setup foreground handler:', error);
    return () => {}; // noop
  }
}

/**
 * Refresh FCM token if it's close to expiration.
 * Should be called on app startup and periodically.
 */
export async function refreshTokenIfNeeded(
  app: FirebaseApp,
  currentSubscription: PushSubscription | null
): Promise<PushSubscription | null> {
  if (!currentSubscription) {
    return await subscribeToPush(app);
  }

  const expiresAt = new Date(currentSubscription.expiresAt);
  const now = new Date();
  const daysUntilExpiry = (expiresAt.getTime() - now.getTime()) / (1000 * 60 * 60 * 24);

  // Refresh if expiring within 7 days
  if (daysUntilExpiry < 7) {
    console.info('[Push] Token expiring soon, refreshing...');
    await unsubscribeFromPush(app);
    return await subscribeToPush(app);
  }

  return currentSubscription;
}
