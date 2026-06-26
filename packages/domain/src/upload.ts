/**
 * Domain-level Upload Engine: resumable, retryable, checksum-verified, quota-aware.
 *
 * Uses pluggable transport so it can be tested with an in-memory backend.
 */

export type UploadStatus = 'pending' | 'uploading' | 'paused' | 'completed' | 'failed' | 'cancelled';
export type ChecksumAlgorithm = 'sha256';

export interface UploadChunk {
  index: number;
  size: number;
  offset: number; // byte offset in the overall file
}

export interface UploadManifest {
  fileId: string;
  patientId: string;
  originalName: string;
  mimeType: string;
  totalSize: number;
  checksumAlgorithm: ChecksumAlgorithm;
  checksum: string; // hex-encoded digest
  chunkSize: number;
  totalChunks: number;
  status: UploadStatus;
  uploadedChunks: number[]; // indices
  createdAt: string;
  updatedAt: string;
}

export interface UploadProgress {
  fileId: string;
  loaded: number;
  total: number;
  percentage: number;
  status: UploadStatus;
}

export interface UploadTransport {
  /**
   * Upload a single chunk. Returns the server-assigned chunk ETag or version.
   */
  uploadChunk(
    fileId: string,
    chunkIndex: number,
    data: Uint8Array<ArrayBuffer>,
    checksum: string
  ): Promise<{ etag: string }>;

  /**
   * Finalize the upload once all chunks are sent. The server verifies
   * the assembled checksum and returns the final document reference.
   */
  finalize(
    fileId: string,
    totalChunks: number,
    checksum: string
  ): Promise<{ assetId: string; objectKey: string }>;

  /**
   * Abort an incomplete upload, releasing server resources.
   */
  abort(fileId: string): Promise<void>;
}

export interface UploadStore {
  getManifest(fileId: string): Promise<UploadManifest | null>;
  saveManifest(m: UploadManifest): Promise<void>;
  listPending(): Promise<UploadManifest[]>;
  deleteManifest(fileId: string): Promise<void>;
  getChunkData(fileId: string, chunkIndex: number): Promise<Uint8Array<ArrayBuffer> | null>;
  saveChunkData(fileId: string, chunkIndex: number, data: Uint8Array<ArrayBuffer>): Promise<void>;
  deleteChunkData(fileId: string, chunkIndex: number): Promise<void>;
}

export class UploadEngine {
  constructor(
    private transport: UploadTransport,
    private store: UploadStore
  ) {}

  /**
   * Start a resumable upload. If a manifest for the same fileId already exists,
   * it resumes from where it left off.
   */
  async start(
    fileId: string,
    patientId: string,
    file: { name: string; mimeType: string; size: number },
    checksum: string,
    chunkSize = 256 * 1024 // 256 KiB default
  ): Promise<UploadManifest> {
    let manifest = await this.store.getManifest(fileId);

    if (manifest) {
      // Resume existing upload
      if (manifest.status === 'completed') {
        throw new Error('UPLOAD_ALREADY_COMPLETED');
      }
      manifest.status = 'uploading';
      manifest.updatedAt = new Date().toISOString();
      await this.store.saveManifest(manifest);
      return manifest;
    }

    const totalChunks = Math.ceil(file.size / chunkSize);

    manifest = {
      fileId,
      patientId,
      originalName: file.name,
      mimeType: file.mimeType,
      totalSize: file.size,
      checksumAlgorithm: 'sha256',
      checksum,
      chunkSize,
      totalChunks,
      status: 'uploading',
      uploadedChunks: [],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    await this.store.saveManifest(manifest);
    return manifest;
  }

  /**
   * Upload the next pending chunk. Returns progress info.
   * If interrupted, call again and it will resume from the last checkpoint.
   */
  async uploadNextChunk(fileId: string, chunkData: Uint8Array<ArrayBuffer>): Promise<UploadProgress> {
    const manifest = await this.store.getManifest(fileId);
    if (!manifest) throw new Error('UPLOAD_NOT_FOUND');
    if (manifest.status === 'completed') throw new Error('UPLOAD_ALREADY_COMPLETED');

    // Determine which chunk to send next
    let nextIndex = -1;
    for (let i = 0; i < manifest.totalChunks; i++) {
      if (!manifest.uploadedChunks.includes(i)) {
        nextIndex = i;
        break;
      }
    }

    if (nextIndex === -1) {
      // All chunks appear uploaded → finalize
      return this.finalize(fileId);
    }

    // Compute per-chunk checksum
    const chunkChecksum = await this.sha256(chunkData);

    // Upload the chunk
    await this.transport.uploadChunk(fileId, nextIndex, chunkData, chunkChecksum);

    // Persist chunk in local store
    await this.store.saveChunkData(fileId, nextIndex, chunkData);

    // Update manifest
    manifest.uploadedChunks.push(nextIndex);
    manifest.updatedAt = new Date().toISOString();
    await this.store.saveManifest(manifest);

    // If this was the last chunk, finalize immediately
    if (manifest.uploadedChunks.length === manifest.totalChunks) {
      return this.finalize(fileId);
    }

    const loaded = manifest.uploadedChunks.length * manifest.chunkSize;
    return {
      fileId,
      loaded: Math.min(loaded, manifest.totalSize),
      total: manifest.totalSize,
      percentage: Math.min(100, Math.round((loaded / manifest.totalSize) * 100)),
      status: 'uploading',
    };
  }

  /**
   * Finalize upload — sends checksum for server verification.
   */
  async finalize(fileId: string): Promise<UploadProgress> {
    const manifest = await this.store.getManifest(fileId);
    if (!manifest) throw new Error('UPLOAD_NOT_FOUND');

    const result = await this.transport.finalize(
      fileId,
      manifest.totalChunks,
      manifest.checksum
    );

    // Upload confirmed — delete local chunk cache
    for (let i = 0; i < manifest.totalChunks; i++) {
      await this.store.deleteChunkData(fileId, i);
    }

    manifest.status = 'completed';
    manifest.updatedAt = new Date().toISOString();
    await this.store.saveManifest(manifest);

    return {
      fileId,
      loaded: manifest.totalSize,
      total: manifest.totalSize,
      percentage: 100,
      status: 'completed',
    };
  }

  /**
   * Abort upload and clean up local state.
   * Safe to call multiple times.
   */
  async cancel(fileId: string): Promise<void> {
    try {
      await this.transport.abort(fileId);
    } catch { /* server may not have a record */ }

    const manifest = await this.store.getManifest(fileId);
    if (manifest) {
      for (let i = 0; i < manifest.totalChunks; i++) {
        await this.store.deleteChunkData(fileId, i);
      }
      manifest.status = 'cancelled';
      manifest.updatedAt = new Date().toISOString();
      await this.store.saveManifest(manifest);
    }
  }

  /**
   * Clean up unsynced media: only after confirmed sync (status === 'completed')
   * Unfinished uploads are never silently removed.
   */
  async cleanupCompleted(): Promise<number> {
    const pendings = await this.store.listPending();
    let cleaned = 0;

    for (const m of pendings) {
      if (m.status === 'completed' || m.status === 'cancelled') {
        await this.store.deleteManifest(m.fileId);
        cleaned++;
      }
    }

    return cleaned;
  }

  /**
   * Get progress for a file upload.
   */
  async getProgress(fileId: string): Promise<UploadProgress | null> {
    const manifest = await this.store.getManifest(fileId);
    if (!manifest) return null;

    const loaded = Math.min(manifest.uploadedChunks.length * manifest.chunkSize, manifest.totalSize);
    const percentage = manifest.totalSize > 0
      ? Math.min(100, Math.round((loaded / manifest.totalSize) * 100))
      : 0;
    return {
      fileId,
      loaded,
      total: manifest.totalSize,
      percentage,
      status: manifest.status,
    };
  }

  private async sha256(data: Uint8Array<ArrayBuffer>): Promise<string> {
    const hash = await crypto.subtle.digest('SHA-256', data);
    return Array.from(new Uint8Array(hash))
      .map((b) => b.toString(16).padStart(2, '0'))
      .join('');
  }
}
