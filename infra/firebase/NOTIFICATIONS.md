# App Check and Notifications

## Overview

This directory contains configuration and implementation for Firebase App Check and Web Push notifications. These features provide security validation and user engagement while maintaining privacy and graceful degradation.

## App Check

### Purpose

Firebase App Check protects backend resources from abuse by verifying that requests come from legitimate clients. It validates requests to Firestore, Storage, and Cloud Functions.

### Configuration

**File:** `app-check.json`

- **Local/Development**: Uses debug tokens to avoid blocking legitimate development traffic
- **Staging**: Uses reCAPTCHA v3 for web clients
- **Production**: Uses reCAPTCHA Enterprise for enhanced security

### Setup

1. **Enable App Check** in Firebase Console:
   - Go to Project Settings > App Check
   - Register your web app
   - Generate reCAPTCHA keys for each environment

2. **Configure Environment Variables**:
   ```bash
   NEXT_PUBLIC_FIREBASE_ENV=local|development|staging|production
   NEXT_PUBLIC_APPCHECK_DEBUG_TOKEN=<token-for-local-dev>
   NEXT_PUBLIC_RECAPTCHA_SITE_KEY=<site-key-for-env>
   ```

3. **Local Development**:
   - Start the app and open browser console
   - Copy the debug token from console logs
   - Register it in Firebase Console > App Check > Debug tokens
   - Refresh the app

### Implementation

- `apps/web/src/lib/firebase/app-check.ts`: Client initialization
- Enforcement configured in `app-check.json`

## Web Push Notifications

### Architecture

**Three-layer approach:**

1. **Web Push (FCM)**: Browser push when app is in background (opt-in enhancement)
2. **Foreground Handler**: Direct messaging when app is in focus
3. **In-app Store**: Baseline notification delivery (always available)

### Configuration

**File:** `push-notifications.json`

Defines:
- FCM VAPID key for Web Push
- Service worker path and scope
- Notification channels (dose, appointment, caregiver alert, general)
- Privacy levels (minimal, summary, full)
- Quiet hours settings
- Deep link patterns
- Retry policy

### Setup

1. **Generate VAPID Key** in Firebase Console:
   - Go to Project Settings > Cloud Messaging
   - Generate Web Push certificate
   - Copy the VAPID public key

2. **Configure Environment Variables**:
   ```bash
   NEXT_PUBLIC_FCM_VAPID_KEY=<your-vapid-key>
   ```

3. **Service Worker**:
   - Located at `apps/web/public/firebase-messaging-sw.js`
   - Must be served from root for proper scope
   - Replace `__FIREBASE_*__` placeholders with actual config

### Implementation

**Client Libraries:**

- `apps/web/src/lib/firebase/push-notifications.ts`: Web Push subscription management
- `apps/web/src/lib/notifications/in-app-store.ts`: In-app notification fallback

**Key Functions:**

```typescript
// Check capabilities
const capabilities = await checkNotificationCapabilities();

// Request permission
const permission = await requestNotificationPermission();

// Subscribe to push
const subscription = await subscribeToPush(app);

// Setup foreground handler
const unsubscribe = setupForegroundMessageHandler(app, (payload) => {
  // Handle notification
});

// Add in-app notification (always works)
addInAppNotification({
  type: 'dose_reminder',
  title: 'เวลายา',
  body: 'ถึงเวลารับประทานยาแล้ว',
  priority: 'high',
});
```

## Notification Lifecycle

### Subscription

1. **Check Support**: Verify browser capabilities
2. **Request Permission**: Ask user for notification permission
3. **Subscribe**: Get FCM token and register with backend
4. **Refresh**: Automatically refresh tokens before expiry (30 days)

### Delivery

1. **Server sends to FCM**: Backend calls FCM API with device tokens
2. **FCM delivers**:
   - **App in focus**: Foreground handler receives message
   - **App in background**: Service worker shows notification
   - **Permission denied/unsupported**: Falls back to in-app store only

3. **User interaction**:
   - Click notification → Navigate to deep link
   - Dismiss → Close without action

### Privacy Levels

**Minimal (default):**
- Title: "Mo-nut"
- Body: "คุณมีการแจ้งเตือนใหม่"
- No sensitive information on lock screen

**Summary:**
- Title: "Mo-nut"
- Body: Category only (e.g., "การแจ้งเตือนยา")
- No specific details

**Full (opt-in):**
- Complete notification text with details

### Quiet Hours

- **Default**: 22:00 - 07:00 (Asia/Bangkok)
- User-configurable start/end times
- Non-critical notifications are deferred
- High-priority notifications (SOS, critical dose) override quiet hours

## Testing

### Local Development

1. **Start Emulators**:
   ```bash
   pnpm firebase:emulators
   ```

2. **Test App Check**:
   - Open browser console
   - Register debug token from console logs
   - Verify Firestore/Storage requests succeed

3. **Test Notifications**:
   - Click "Request Permission" in notification settings
   - Send test notification from Firebase Console
   - Verify delivery in different states (focus/background)

### Staging/Production

1. **Verify reCAPTCHA** is properly configured
2. **Test subscription flow** end-to-end
3. **Verify privacy levels** work correctly
4. **Test quiet hours** behavior
5. **Check deep links** navigate correctly

## Security Considerations

### App Check

- **Debug tokens** are for development only, never use in production
- **reCAPTCHA Enterprise** provides better protection than v3
- **Enforcement** is enabled for all Firebase services in non-local environments
- Failures are logged but don't block app functionality

### Notifications

- **No PHI in payloads**: Only reference IDs and minimal text
- **Privacy by default**: Use minimal privacy level
- **Hidden payloads**: Sensitive data fetched after authentication
- **HTTPS deep links**: All links use secure protocol
- **Token security**: FCM tokens treated as sensitive, stored securely

## Graceful Degradation

### Web Push Unavailable

When Web Push is denied, unsupported, or fails:

1. **In-app store** continues to work
2. **Notifications** are queued locally
3. **Badge count** shows unread notifications
4. **User guidance** explains how to enable push later

### Service Worker Inactive

If service worker fails to register:

1. **Foreground notifications** still work when app is open
2. **In-app store** provides full notification history
3. **Status indicator** shows degraded notification capability

## Monitoring

Track these metrics in production:

- **App Check**: Token generation success rate, validation errors
- **Push subscriptions**: Active subscriptions, refresh success rate
- **Delivery**: Sent, delivered, opened, dismissed counts per channel
- **Errors**: Permission denials, service worker failures, FCM errors
- **Privacy**: Distribution of privacy levels chosen by users

## Common Issues

### App Check Debug Token Not Working

- Verify token is registered in Firebase Console
- Check browser console for App Check errors
- Ensure `NEXT_PUBLIC_APPCHECK_DEBUG_TOKEN` is set
- Try generating a new debug token

### Notifications Not Appearing

- Check browser permission is granted
- Verify service worker is registered and active
- Check FCM VAPID key is correct
- Look for errors in service worker console
- Test with Firebase Console test message

### Service Worker Not Updating

- Hard refresh browser (Ctrl+Shift+R)
- Unregister service worker in DevTools > Application
- Check service worker cache is cleared
- Verify `firebase-messaging-sw.js` is served from root

## References

- [Firebase App Check Docs](https://firebase.google.com/docs/app-check)
- [Firebase Cloud Messaging Web](https://firebase.google.com/docs/cloud-messaging/js/receive)
- [Web Push Protocol](https://web.dev/push-notifications-overview/)
- [Service Worker API](https://developer.mozilla.org/en-US/docs/Web/API/Service_Worker_API)
