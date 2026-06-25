import { initializeAppCheck, ReCaptchaV3Provider, ReCaptchaEnterpriseProvider, CustomProvider } from 'firebase/app-check';
import type { FirebaseApp } from 'firebase/app';

/**
 * Initialize Firebase App Check with environment-appropriate provider.
 *
 * App Check helps protect backend resources from abuse by validating requests
 * originate from your app. It uses platform-specific attestation:
 * - Local/Dev: Debug tokens (manual registration)
 * - Staging/Prod: reCAPTCHA v3 or Enterprise
 *
 * @see docs: https://firebase.google.com/docs/app-check
 */
export function initializeAppCheckSafely(app: FirebaseApp): void {
  // Skip in server-side rendering context
  if (typeof window === 'undefined') {
    return;
  }

  const env = process.env.NEXT_PUBLIC_FIREBASE_ENV || 'local';

  try {
    switch (env) {
      case 'local':
      case 'development':
        // Local development uses debug tokens
        // Debug tokens must be registered in Firebase Console > App Check > Debug tokens
        // The token is generated in browser console on first load
        if (process.env.NEXT_PUBLIC_APPCHECK_DEBUG_TOKEN) {
          // @ts-expect-error - self.FIREBASE_APPCHECK_DEBUG_TOKEN is the official debug mechanism
          self.FIREBASE_APPCHECK_DEBUG_TOKEN = process.env.NEXT_PUBLIC_APPCHECK_DEBUG_TOKEN;
        }

        // In local/dev, use a custom provider that always returns a valid token
        // This prevents blocking legitimate development traffic
        const debugProvider = new CustomProvider({
          getToken: () => Promise.resolve({
            token: process.env.NEXT_PUBLIC_APPCHECK_DEBUG_TOKEN || 'debug-token-local',
            expireTimeMillis: Date.now() + 3600000, // 1 hour
          }),
        });

        initializeAppCheck(app, {
          provider: debugProvider,
          isTokenAutoRefreshEnabled: true,
        });

        console.info('[App Check] Initialized with debug provider for local development');
        break;

      case 'staging':
        // Staging uses reCAPTCHA v3
        if (!process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY) {
          console.warn('[App Check] reCAPTCHA site key missing for staging');
          return;
        }

        initializeAppCheck(app, {
          provider: new ReCaptchaV3Provider(process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY),
          isTokenAutoRefreshEnabled: true,
        });

        console.info('[App Check] Initialized with reCAPTCHA v3 for staging');
        break;

      case 'production':
        // Production uses reCAPTCHA Enterprise for enhanced security
        if (!process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY) {
          console.error('[App Check] reCAPTCHA Enterprise site key missing for production');
          return;
        }

        initializeAppCheck(app, {
          provider: new ReCaptchaEnterpriseProvider(process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY),
          isTokenAutoRefreshEnabled: true,
        });

        console.info('[App Check] Initialized with reCAPTCHA Enterprise for production');
        break;

      default:
        console.warn(`[App Check] Unknown environment: ${env}, skipping initialization`);
    }
  } catch (error) {
    // App Check initialization failures should not block app functionality
    // Log the error but allow the app to continue
    console.error('[App Check] Initialization failed:', error);
  }
}

/**
 * Check if App Check is supported in the current environment.
 */
export function isAppCheckSupported(): boolean {
  return typeof window !== 'undefined' && 'firebase' in window;
}
