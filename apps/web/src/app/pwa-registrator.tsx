'use client';

import { useEffect, useState } from 'react';
import { registerServiceWorker, PWAInstallManager, applyUpdate } from '../lib/pwa/install-prompt';

/**
 * Client component that registers the Service Worker and manages install/update UI.
 * Renders nothing visible by default; shows update banner when new version is available.
 */
export function PWARegistrator() {
  const [updateAvailable, setUpdateAvailable] = useState(false);
  const [installManager, setInstallManager] = useState<PWAInstallManager | null>(null);

  useEffect(() => {
    // Register Service Worker
    registerServiceWorker().then((registration) => {
      if (registration) {
        // Watch for update events
        const handler = () => {
          setUpdateAvailable(true);
        };
        window.addEventListener('pwa-update-available', handler);
        return () => window.removeEventListener('pwa-update-available', handler);
      }
    });

    // Initialize install prompt manager
    const manager = new PWAInstallManager();
    setInstallManager(manager);
    manager.init();
  }, []);

  const handleUpdate = async () => {
    if (!navigator.serviceWorker.controller) return;

    const registration = await navigator.serviceWorker.getRegistration();
    if (registration) {
      await applyUpdate(registration);
      setUpdateAvailable(false);
    }
  };

  return (
    <>
      {/* Update-available banner */}
      {updateAvailable && (
        <div className="pwa-update-banner">
          <span>อัปเดตใหม่พร้อมใช้งาน / Update available</span>
          <button onClick={handleUpdate} className="pwa-update-btn">
            อัปเดต / Refresh
          </button>
        </div>
      )}
    </>
  );
}
