/**
 * In-app Notification Store
 *
 * Provides baseline notification delivery when Web Push is unavailable,
 * denied, or unsupported. All notifications are stored here regardless
 * of Web Push status to ensure no messages are lost.
 */

export interface InAppNotification {
  id: string;
  type: 'dose_reminder' | 'appointment_reminder' | 'caregiver_alert' | 'general';
  title: string;
  body: string;
  data?: Record<string, unknown>;
  deepLink?: string;
  createdAt: string;
  readAt?: string;
  priority: 'high' | 'default';
}

export interface NotificationPreferences {
  privacyLevel: 'minimal' | 'summary' | 'full';
  quietHoursEnabled: boolean;
  quietHoursStart: string; // HH:mm
  quietHoursEnd: string; // HH:mm
  timezone: string;
}

const STORAGE_KEY = 'mo-nut:notifications';
const PREFERENCES_KEY = 'mo-nut:notification-preferences';
const MAX_STORED_NOTIFICATIONS = 100;

/**
 * Get all in-app notifications from local storage.
 */
export function getInAppNotifications(): InAppNotification[] {
  if (typeof window === 'undefined') {
    return [];
  }

  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) {
      return [];
    }

    return JSON.parse(stored) as InAppNotification[];
  } catch (error) {
    console.error('[Notifications] Failed to load from storage:', error);
    return [];
  }
}

/**
 * Add a new in-app notification.
 */
export function addInAppNotification(notification: Omit<InAppNotification, 'id' | 'createdAt'>): InAppNotification {
  const newNotification: InAppNotification = {
    ...notification,
    id: crypto.randomUUID(),
    createdAt: new Date().toISOString(),
  };

  const notifications = getInAppNotifications();
  notifications.unshift(newNotification);

  // Keep only the most recent notifications
  const trimmed = notifications.slice(0, MAX_STORED_NOTIFICATIONS);

  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(trimmed));
  } catch (error) {
    console.error('[Notifications] Failed to save to storage:', error);
  }

  return newNotification;
}

/**
 * Mark a notification as read.
 */
export function markNotificationAsRead(id: string): void {
  const notifications = getInAppNotifications();
  const notification = notifications.find((n) => n.id === id);

  if (notification && !notification.readAt) {
    notification.readAt = new Date().toISOString();

    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(notifications));
    } catch (error) {
      console.error('[Notifications] Failed to mark as read:', error);
    }
  }
}

/**
 * Mark all notifications as read.
 */
export function markAllNotificationsAsRead(): void {
  const notifications = getInAppNotifications();
  const now = new Date().toISOString();

  notifications.forEach((n) => {
    if (!n.readAt) {
      n.readAt = now;
    }
  });

  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(notifications));
  } catch (error) {
    console.error('[Notifications] Failed to mark all as read:', error);
  }
}

/**
 * Get unread notification count.
 */
export function getUnreadCount(): number {
  const notifications = getInAppNotifications();
  return notifications.filter((n) => !n.readAt).length;
}

/**
 * Clear all in-app notifications.
 */
export function clearAllNotifications(): void {
  if (typeof window === 'undefined') {
    return;
  }

  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch (error) {
    console.error('[Notifications] Failed to clear storage:', error);
  }
}

/**
 * Get notification preferences.
 */
export function getNotificationPreferences(): NotificationPreferences {
  if (typeof window === 'undefined') {
    return getDefaultPreferences();
  }

  try {
    const stored = localStorage.getItem(PREFERENCES_KEY);
    if (!stored) {
      return getDefaultPreferences();
    }

    return JSON.parse(stored) as NotificationPreferences;
  } catch (error) {
    console.error('[Notifications] Failed to load preferences:', error);
    return getDefaultPreferences();
  }
}

/**
 * Update notification preferences.
 */
export function updateNotificationPreferences(preferences: Partial<NotificationPreferences>): NotificationPreferences {
  const current = getNotificationPreferences();
  const updated = { ...current, ...preferences };

  try {
    localStorage.setItem(PREFERENCES_KEY, JSON.stringify(updated));
  } catch (error) {
    console.error('[Notifications] Failed to save preferences:', error);
  }

  return updated;
}

/**
 * Check if current time is within quiet hours.
 */
export function isQuietHours(preferences: NotificationPreferences): boolean {
  if (!preferences.quietHoursEnabled) {
    return false;
  }

  try {
    const now = new Date();
    const formatter = new Intl.DateTimeFormat('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: false,
      timeZone: preferences.timezone,
    });

    const currentTime = formatter.format(now);
    const currentParts = currentTime.split(':').map(Number);
    const currentHour = currentParts[0] ?? 0;
    const currentMinute = currentParts[1] ?? 0;
    const currentMinutes = currentHour * 60 + currentMinute;

    const startParts = preferences.quietHoursStart.split(':').map(Number);
    const startHour = startParts[0] ?? 0;
    const startMinute = startParts[1] ?? 0;
    const startMinutes = startHour * 60 + startMinute;

    const endParts = preferences.quietHoursEnd.split(':').map(Number);
    const endHour = endParts[0] ?? 0;
    const endMinute = endParts[1] ?? 0;
    const endMinutes = endHour * 60 + endMinute;

    // Handle quiet hours that span midnight
    if (startMinutes > endMinutes) {
      return currentMinutes >= startMinutes || currentMinutes < endMinutes;
    }

    return currentMinutes >= startMinutes && currentMinutes < endMinutes;
  } catch (error) {
    console.error('[Notifications] Quiet hours check failed:', error);
    return false;
  }
}

/**
 * Apply privacy level to notification content.
 */
export function applyPrivacyLevel(
  notification: InAppNotification,
  privacyLevel: NotificationPreferences['privacyLevel']
): InAppNotification {
  switch (privacyLevel) {
    case 'minimal':
      return {
        ...notification,
        title: 'Mo-nut',
        body: 'คุณมีการแจ้งเตือนใหม่',
      };

    case 'summary':
      return {
        ...notification,
        title: 'Mo-nut',
        body: getCategoryLabel(notification.type),
      };

    case 'full':
    default:
      return notification;
  }
}

function getDefaultPreferences(): NotificationPreferences {
  return {
    privacyLevel: 'minimal',
    quietHoursEnabled: true,
    quietHoursStart: '22:00',
    quietHoursEnd: '07:00',
    timezone: 'Asia/Bangkok',
  };
}

function getCategoryLabel(type: InAppNotification['type']): string {
  switch (type) {
    case 'dose_reminder':
      return 'การแจ้งเตือนยา';
    case 'appointment_reminder':
      return 'การแจ้งเตือนนัดหมาย';
    case 'caregiver_alert':
      return 'การแจ้งเตือนจากผู้ดูแล';
    case 'general':
    default:
      return 'การแจ้งเตือน';
  }
}
