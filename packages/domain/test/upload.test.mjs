import { describe, it, beforeEach } from 'node:test';
import { strict as assert } from 'node:assert';
import { UploadEngine } from '../dist/index.js';

class InMemoryUploadTransport {
  constructor() {
    this.chunks = new Map();
    this.finalized = new Map();
    this.aborted = new Set();
  }

  async uploadChunk(fileId, chunkIndex, data, checksum) {
    const key = `${fileId}:${chunkIndex}`;
    this.chunks.set(key, { data, checksum });
    return { etag: `etag-${fileId}-${chunkIndex}` };
  }

  async finalize(fileId, totalChunks, checksum) {
    // Verify all chunks present
    for (let i = 0; i < totalChunks; i++) {
      if (!this.chunks.has(`${fileId}:${i}`)) {
        throw new Error(`MISSING_CHUNK_${i}`);
      }
    }
    this.finalized.set(fileId, checksum);
    return { assetId: `asset-${fileId}`, objectKey: `uploads/${fileId}` };
  }

  async abort(fileId) {
    this.aborted.add(fileId);
    // Remove chunk data
    for (const [key] of this.chunks) {
      if (key.startsWith(`${fileId}:`)) {
        this.chunks.delete(key);
      }
    }
  }
}

class InMemoryUploadStore {
  constructor() {
    this.manifests = new Map();
    this.chunks = new Map();
  }

  async getManifest(fileId) {
    return this.manifests.get(fileId) || null;
  }

  async saveManifest(m) {
    this.manifests.set(m.fileId, { ...m });
  }

  async listPending() {
    return Array.from(this.manifests.values());
  }

  async deleteManifest(fileId) {
    this.manifests.delete(fileId);
  }

  async getChunkData(fileId, chunkIndex) {
    const key = `${fileId}:${chunkIndex}`;
    return this.chunks.get(key) || null;
  }

  async saveChunkData(fileId, chunkIndex, data) {
    this.chunks.set(`${fileId}:${chunkIndex}`, data);
  }

  async deleteChunkData(fileId, chunkIndex) {
    this.chunks.delete(`${fileId}:${chunkIndex}`);
  }
}

describe('UploadEngine - Resumable Upload with Checksum Handshake', () => {
  let transport;
  let store;
  let engine;

  beforeEach(() => {
    transport = new InMemoryUploadTransport();
    store = new InMemoryUploadStore();
    engine = new UploadEngine(transport, store);
  });

  it('should start and complete a multi-chunk upload', async () => {
    const fileId = 'upload-001';
    const fileData = new Uint8Array(1024 * 512); // 512 KiB
    const chunkSize = 256 * 1024; // 256 KiB → 2 chunks
    const checksum = 'test-checksum';

    // Start upload
    const manifest = await engine.start(fileId, 'patient-1',
      { name: 'test.jpg', mimeType: 'image/jpeg', size: fileData.length },
      checksum, chunkSize
    );
    assert.equal(manifest.totalChunks, 2);
    assert.equal(manifest.status, 'uploading');

    // Upload chunk 0
    const chunk0 = fileData.slice(0, chunkSize);
    const prog0 = await engine.uploadNextChunk(fileId, chunk0);
    assert.equal(prog0.percentage, 50);
    assert.equal(prog0.status, 'uploading');

    // Upload chunk 1
    const chunk1 = fileData.slice(chunkSize);
    const prog1 = await engine.uploadNextChunk(fileId, chunk1);
    assert.equal(prog1.percentage, 100);
    assert.equal(prog1.status, 'completed');

    // Verify finalization
    assert.ok(transport.finalized.has(fileId));
    assert.equal(transport.finalized.get(fileId), checksum);
  });

  it('should resume interrupted upload without duplicating chunks', async () => {
    const fileId = 'upload-002';
    const fileData = new Uint8Array(768 * 1024); // 768 KiB → 3 chunks
    const chunkSize = 256 * 1024;
    const checksum = 'resume-checksum';

    await engine.start(fileId, 'patient-1',
      { name: 'doc.pdf', mimeType: 'application/pdf', size: fileData.length },
      checksum, chunkSize
    );

    // Upload chunk 0, then simulate interruption
    await engine.uploadNextChunk(fileId, fileData.slice(0, chunkSize));

    // Create new engine (simulating page refresh)
    const engine2 = new UploadEngine(transport, store);
    const resumedManifest = await engine2.start(fileId, 'patient-1',
      { name: 'doc.pdf', mimeType: 'application/pdf', size: fileData.length },
      checksum, chunkSize
    );
    assert.equal(resumedManifest.uploadedChunks.length, 1);
    assert.equal(resumedManifest.uploadedChunks[0], 0);

    // Resume from chunk 1
    const prog1 = await engine2.uploadNextChunk(fileId, fileData.slice(chunkSize, chunkSize * 2));
    assert.equal(prog1.percentage, 67); // 2/3 = 66.666 → Math.round → 67%

    // Upload chunk 2 → finalize
    const prog2 = await engine2.uploadNextChunk(fileId, fileData.slice(chunkSize * 2));
    assert.equal(prog2.status, 'completed');
  });

  it('should cancel an incomplete upload and clean up state', async () => {
    const fileId = 'upload-003';
    const fileData = new Uint8Array(512 * 1024);
    const chunkSize = 256 * 1024;

    await engine.start(fileId, 'patient-1',
      { name: 'temp.dat', mimeType: 'application/octet-stream', size: fileData.length },
      'cancel-checksum', chunkSize
    );

    await engine.uploadNextChunk(fileId, fileData.slice(0, chunkSize));

    // Cancel before completion
    await engine.cancel(fileId);

    const manifest = await store.getManifest(fileId);
    assert.equal(manifest.status, 'cancelled');
    assert.ok(transport.aborted.has(fileId));

    // Confirm cleanup only after confirmed sync
    const cleaned = await engine.cleanupCompleted();
    assert.equal(cleaned, 1); // cancelled manifest cleaned up
  });

  it('should never remove unsynced media silently', async () => {
    const fileId = 'upload-004';
    const chunkSize = 256 * 1024;
    const fileData = new Uint8Array(chunkSize * 3); // 3 chunks — 1 won't complete it

    await engine.start(fileId, 'patient-2',
      { name: 'unsynced.jpg', mimeType: 'image/jpeg', size: fileData.length },
      'unsynced-checksum',
      chunkSize
    );

    // Upload only 1 of 3 chunks — should stay 'uploading'
    await engine.uploadNextChunk(fileId, fileData.slice(0, chunkSize));

    // cleanupCompleted should only remove completed/cancelled manifests
    const cleaned = await engine.cleanupCompleted();
    assert.equal(cleaned, 0); // uploading manifest not removed

    // Manifest still exists
    const manifest = await store.getManifest(fileId);
    assert.ok(manifest);
    assert.equal(manifest.status, 'uploading');
  });
});
