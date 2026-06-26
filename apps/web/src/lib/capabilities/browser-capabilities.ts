/**
 * Browser Capability Adapters with Feature Detection and Fallbacks
 *
 * Every adapter follows the pattern:
 * 1. Detect native API availability
 * 2. Return adapter with canonical interface
 * 3. Provide fallback strategy when API unavailable
 */

// ---------------------------------------------------------------------------
// Feature detection
// ---------------------------------------------------------------------------

export interface CapabilityMap {
  camera: boolean;
  mediaRecorder: boolean;
  geolocation: boolean;
  webShare: boolean;
  pushNotifications: boolean;
  backgroundSync: boolean;
  storageQuota: boolean;
  tel: boolean;
  fileSystem: boolean;
  offline: boolean;
}

export function detectCapabilities(): CapabilityMap {
  return {
    camera: !!(navigator.mediaDevices?.getUserMedia),
    mediaRecorder: typeof MediaRecorder !== 'undefined',
    geolocation: !!navigator.geolocation,
    webShare: !!navigator.share,
    pushNotifications: !!(
      'Notification' in window &&
      navigator.serviceWorker &&
      'PushManager' in window
    ),
    backgroundSync: !!('SyncManager' in window),
    storageQuota: !!navigator.storage?.estimate,
    tel: true, // tel: protocol
    fileSystem: !!('showOpenFilePicker' in window),
    offline: !!navigator.onLine,
  };
}

// ---------------------------------------------------------------------------
// Camera Adapter
// ---------------------------------------------------------------------------

export interface PhotoCaptureResult {
  blob: Blob;
  dataUrl: string;
  file: File;
}

export interface CameraAdapter {
  capturePhoto(): Promise<PhotoCaptureResult>;
  isSupported: boolean;
}

export function createCameraAdapter(): CameraAdapter {
  const isSupported = !!(navigator.mediaDevices?.getUserMedia);

  return {
    isSupported,
    async capturePhoto(): Promise<PhotoCaptureResult> {
      if (!isSupported) throw new Error('CAMERA_NOT_SUPPORTED');

      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: 'environment' },
        audio: false,
      });

      const video = document.createElement('video');
      video.srcObject = stream;
      video.play();

      // Wait for video to be ready
      await new Promise((resolve) => { video.onloadedmetadata = resolve; });

      const canvas = document.createElement('canvas');
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      canvas.getContext('2d')!.drawImage(video, 0, 0);

      stream.getTracks().forEach((t) => t.stop());

      const blob = await new Promise<Blob>((resolve) =>
        canvas.toBlob((b) => resolve(b!), 'image/jpeg', 0.85)
      );

      const file = new File([blob], `photo_${Date.now()}.jpg`, { type: 'image/jpeg' });

      return {
        blob,
        dataUrl: canvas.toDataURL('image/jpeg', 0.85),
        file,
      };
    },
  };
}

export function createFileFallbackAdapter(): CameraAdapter {
  return {
    isSupported: true,
    async capturePhoto(): Promise<PhotoCaptureResult> {
      return new Promise((resolve, reject) => {
        const input = document.createElement('input');
        input.type = 'file';
        input.accept = 'image/*';
        input.capture = 'environment';

        input.onchange = async () => {
          const file = input.files?.[0];
          if (!file) return reject(new Error('NO_FILE_SELECTED'));

          const dataUrl = await new Promise<string>((resolve) => {
            const reader = new FileReader();
            reader.onload = () => resolve(reader.result as string);
            reader.readAsDataURL(file);
          });

          resolve({ blob: file, dataUrl, file });
        };

        input.click();
      });
    },
  };
}

// ---------------------------------------------------------------------------
// MediaRecorder Adapter
// ---------------------------------------------------------------------------

export interface AudioRecordingResult {
  blob: Blob;
  durationMs: number;
}

export interface MediaRecorderAdapter {
  startRecording(): Promise<void>;
  stopRecording(): Promise<AudioRecordingResult>;
  isSupported: boolean;
}

export function createMediaRecorderAdapter(): MediaRecorderAdapter {
  const isSupported = typeof MediaRecorder !== 'undefined' && !!(navigator.mediaDevices?.getUserMedia);

  let mediaRecorder: MediaRecorder | null = null;
  let chunks: Blob[] = [];
  let startTime = 0;

  return {
    isSupported,
    async startRecording(): Promise<void> {
      if (!isSupported) throw new Error('MEDIA_RECORDER_NOT_SUPPORTED');

      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      chunks = [];
      startTime = Date.now();

      mediaRecorder = new MediaRecorder(stream, { mimeType: 'audio/webm' });
      mediaRecorder.ondataavailable = (e) => {
        if (e.data.size > 0) chunks.push(e.data);
      };

      mediaRecorder.start();
    },

    async stopRecording(): Promise<AudioRecordingResult> {
      if (!mediaRecorder) throw new Error('NO_ACTIVE_RECORDING');

      return new Promise((resolve, reject) => {
        mediaRecorder!.onstop = () => {
          const blob = new Blob(chunks, { type: 'audio/webm' });
          const tracks = mediaRecorder!.stream?.getTracks();
          tracks?.forEach((t) => t.stop());

          resolve({
            blob,
            durationMs: Date.now() - startTime,
          });
        };

        mediaRecorder!.onerror = () => reject(new Error('RECORDING_FAILED'));
        mediaRecorder!.stop();
      });
    },
  };
}

export function createMediaRecorderFallbackAdapter(): MediaRecorderAdapter {
  return {
    isSupported: true,
    async startRecording(): Promise<void> {
      // Fallback: no-op, user will upload file instead
    },
    async stopRecording(): Promise<AudioRecordingResult> {
      throw new Error('RECORDING_NOT_SUPPORTED_USE_FILE_UPLOAD');
    },
  };
}

// ---------------------------------------------------------------------------
// Geolocation Adapter
// ---------------------------------------------------------------------------

export interface GeoLocationResult {
  latitude: number;
  longitude: number;
  accuracy: number;
  timestamp: number;
}

export interface GeolocationAdapter {
  getCurrentPosition(): Promise<GeoLocationResult>;
  isSupported: boolean;
}

export function createGeolocationAdapter(): GeolocationAdapter {
  const isSupported = !!navigator.geolocation;

  return {
    isSupported,
    getCurrentPosition(): Promise<GeoLocationResult> {
      if (!isSupported) throw new Error('GEOLOCATION_NOT_SUPPORTED');

      return new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(
          (pos) =>
            resolve({
              latitude: pos.coords.latitude,
              longitude: pos.coords.longitude,
              accuracy: pos.coords.accuracy,
              timestamp: pos.timestamp,
            }),
          (err) => reject(new Error(`GEOLOCATION_ERROR: ${err.code}`)),
          { enableHighAccuracy: true, timeout: 10000, maximumAge: 300000 }
        );
      });
    },
  };
}

// ---------------------------------------------------------------------------
// Web Share Adapter
// ---------------------------------------------------------------------------

export interface WebShareAdapter {
  share(data: { title?: string; text?: string; url?: string; files?: File[] }): Promise<void>;
  canShareFiles: boolean;
  isSupported: boolean;
}

export function createWebShareAdapter(): WebShareAdapter {
  const isSupported = !!navigator.share;
  const canShareFiles = !!navigator.canShare;

  return {
    isSupported,
    canShareFiles,
    async share(data): Promise<void> {
      if (!isSupported) throw new Error('WEB_SHARE_NOT_SUPPORTED');

      if (data.files && data.files.length > 0 && !canShareFiles) {
        throw new Error('FILE_SHARE_NOT_SUPPORTED');
      }

      await navigator.share(data);
    },
  };
}

export function createWebShareFallbackAdapter(): WebShareAdapter {
  return {
    isSupported: true,
    canShareFiles: false,
    async share(data): Promise<void> {
      const url = data.url || window.location.href;
      const text = data.text || '';

      // Fallback: copy to clipboard
      await navigator.clipboard.writeText(`${text}\n${url}`);
    },
  };
}

// ---------------------------------------------------------------------------
// Storage Quota Adapter
// ---------------------------------------------------------------------------

export interface StorageQuotaInfo {
  usage: number;
  quota: number;
  percentageUsed: number;
  isLow: boolean;
}

export interface StorageQuotaAdapter {
  estimate(): Promise<StorageQuotaInfo>;
  isSupported: boolean;
}

export function createStorageQuotaAdapter(): StorageQuotaAdapter {
  const isSupported = !!navigator.storage?.estimate;

  return {
    isSupported,
    async estimate(): Promise<StorageQuotaInfo> {
      if (!isSupported) {
        return { usage: 0, quota: Infinity, percentageUsed: 0, isLow: false };
      }

      const est = await navigator.storage.estimate();
      const usage = est.usage ?? 0;
      const quota = est.quota ?? 0;
      const percentageUsed = quota > 0 ? (usage / quota) * 100 : 0;

      return {
        usage,
        quota,
        percentageUsed,
        isLow: percentageUsed > 80,
      };
    },
  };
}

// ---------------------------------------------------------------------------
// Background Sync Adapter
// ---------------------------------------------------------------------------

export interface BackgroundSyncAdapter {
  register(tag: string): Promise<void>;
  getTags(): Promise<string[]>;
  isSupported: boolean;
}

export function createBackgroundSyncAdapter(): BackgroundSyncAdapter {
  const isSupported = !!('SyncManager' in window);

  return {
    isSupported,
    async register(tag: string): Promise<void> {
      if (!isSupported) throw new Error('BACKGROUND_SYNC_NOT_SUPPORTED');

      const registration = await navigator.serviceWorker.ready;
      await (registration as any).sync.register(tag);
    },
    async getTags(): Promise<string[]> {
      if (!isSupported) return [];
      const registration = await navigator.serviceWorker.ready;
      return await (registration as any).sync.getTags();
    },
  };
}

// ---------------------------------------------------------------------------
// Unified Capability Provider
// ---------------------------------------------------------------------------

export interface CapabilityProvider {
  camera: CameraAdapter;
  mediaRecorder: MediaRecorderAdapter;
  geolocation: GeolocationAdapter;
  webShare: WebShareAdapter;
  storageQuota: StorageQuotaAdapter;
  backgroundSync: BackgroundSyncAdapter;
  capabilities: CapabilityMap;
}

export function createCapabilityProvider(): CapabilityProvider {
  const caps = detectCapabilities();

  return {
    camera: caps.camera ? createCameraAdapter() : createFileFallbackAdapter(),
    mediaRecorder: caps.mediaRecorder ? createMediaRecorderAdapter() : createMediaRecorderFallbackAdapter(),
    geolocation: createGeolocationAdapter(),
    webShare: caps.webShare ? createWebShareAdapter() : createWebShareFallbackAdapter(),
    storageQuota: createStorageQuotaAdapter(),
    backgroundSync: createBackgroundSyncAdapter(),
    capabilities: caps,
  };
}
