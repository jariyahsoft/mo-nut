/**
 * PWA Install Prompt and Update Flow Manager
 *
 * Features:
 * - Captures beforeinstallprompt event for deferred install UI
 * - Shows iOS install guidance (Safari share button detection)
 * - Manages update flow preserving pending offline mutations
 * - Non-blocking install prompt — never interrupts user flow
 */

export interface PWAInstallState {
  canInstall: boolean;
  isiOS: boolean;
  isStandalone: boolean;
  updateAvailable: boolean;
}

export class PWAInstallManager {
  private deferredPrompt: any = null;
  private _state: PWAInstallState = {
    canInstall: false,
    isiOS: false,
    isStandalone: false,
    updateAvailable: false,
  };
  private listeners: Array<(state: PWAInstallState) => void> = [];

  constructor() {
    // Detect standalone mode
    this._state.isStandalone =
      window.matchMedia('(display-mode: standalone)').matches ||
      (window.navigator as any).standalone === true;

    // Detect iOS Safari
    this._state.isiOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !(window as any).MSStream;

    this._state.canInstall = false; // Will be set by beforeinstallprompt
  }

  /**
   * Initialize install prompt listeners
   */
  init() {
    window.addEventListener('beforeinstallprompt', (e) => {
      e.preventDefault();
      this.deferredPrompt = e;
      this._state.canInstall = true;
      this.notifyListeners();
    });

    window.addEventListener('appinstalled', () => {
      this.deferredPrompt = null;
      this._state.canInstall = false;
      this.notifyListeners();
    });

    // Watch standalone mode changes
    window.matchMedia('(display-mode: standalone)').addEventListener('change', (e) => {
      this._state.isStandalone = e.matches;
      this.notifyListeners();
    });

    // Listen for service worker updates
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.addEventListener('controllerchange', () => {
        // New SW has taken over — page will reload, no action needed
      });
    }
  }

  get state(): Readonly<PWAInstallState> {
    return this._state;
  }

  /**
   * Show the install prompt (only after user gesture)
   */
  async promptInstall(): Promise<boolean> {
    if (!this.deferredPrompt) {
      return false;
    }

    this.deferredPrompt.prompt();
    const result = await this.deferredPrompt.userChoice;
    this.deferredPrompt = null;
    this._state.canInstall = false;
    this.notifyListeners();

    return result.outcome === 'accepted';
  }

  /**
   * Register a state change listener
   */
  onChange(callback: (state: PWAInstallState) => void) {
    this.listeners.push(callback);
    return () => {
      this.listeners = this.listeners.filter((l) => l !== callback);
    };
  }

  private notifyListeners() {
    for (const cb of this.listeners) {
      cb(this._state);
    }
  }

  /**
   * Check if iOS install guidance should be shown
   * (iOS Safari that's not in standalone mode)
   */
  get shouldShowIOSGuidance(): boolean {
    return this._state.isiOS && !this._state.isStandalone;
  }
}

/**
 * Service worker registration with update handling
 */
export async function registerServiceWorker() {
  if (!('serviceWorker' in navigator)) {
    console.info('[PWA] Service Worker not supported in this browser');
    return null;
  }

  try {
    const registration = await navigator.serviceWorker.register('/sw.js', {
      scope: '/',
    });

    // Check for updates on page load
    registration.addEventListener('updatefound', () => {
      const newWorker = registration.installing;
      if (newWorker) {
        newWorker.addEventListener('statechange', () => {
          if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
            // New version available — dispatch custom event for UI to show update banner
            window.dispatchEvent(new CustomEvent('pwa-update-available', { detail: { registration } }));
          }
        });
      }
    });

    return registration;
  } catch (err) {
    console.error('[PWA] Service Worker registration failed:', err);
    return null;
  }
}

/**
 * Apply pending update: communicate with SW to skip waiting, then reload
 * Preserves pending offline mutations (stored in IndexedDB, untouched by reload)
 */
export async function applyUpdate(registration: ServiceWorkerRegistration) {
  if (!registration.waiting) return;

  // Tell waiting SW to take over
  registration.waiting.postMessage({ type: 'SKIP_WAITING' });

  // Wait for the new SW to become active
  await new Promise<void>((resolve) => {
    const onStateChange = () => {
      if (registration.active?.state === 'activated') {
        resolve();
      }
    };
    registration.addEventListener('statechange', onStateChange);
    // Fallback: reload after short delay
    setTimeout(resolve, 3000);
  });

  // Reload to pick up new version
  window.location.reload();
}
