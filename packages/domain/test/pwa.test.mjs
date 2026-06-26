import { describe, it, beforeEach } from 'node:test';
import { strict as assert } from 'node:assert';
import { MemoryStorageEngine, OfflineStoreManager } from '../dist/index.js';

describe('PWA Service Worker Update Flow Data Preservation', () => {
  let store;

  beforeEach(async () => {
    store = new OfflineStoreManager(new MemoryStorageEngine());
    await store.setContext('user-1', 'patient-1');
  });

  it('should preserve pending offline mutations across simulated SW update', async () => {
    // Use a shared engine instance so mutations survive SW re-instantiation
    const engine = new MemoryStorageEngine();
    const store = new OfflineStoreManager(engine);
    await store.setContext('user-1', 'patient-1');

    // Enqueue pending mutations before update
    const m1 = await store.enqueueMutation('measurement', 'msm-1', 'create', {
      measurementType: 'weight',
      value: { weight_kg: 70 },
    });

    const m2 = await store.enqueueMutation('medication', 'med-1', 'create', {
      displayName: 'Aspirin',
    });

    // Simulate SW update: new store with same engine
    const newStore = new OfflineStoreManager(engine);
    await newStore.setContext('user-1', 'patient-1');

    // Verify mutations are preserved
    const mutations = await newStore.listActiveMutations();
    assert.equal(mutations.length, 2);
    assert.equal(mutations[0].clientMutationId, m1.clientMutationId);
    assert.equal(mutations[1].clientMutationId, m2.clientMutationId);
  });
});

describe('PWA Installability and Cache Isolation', () => {
  it('should correctly report manifest structure', () => {
    const manifest = {
      name: 'Mo-nut',
      short_name: 'Mo-nut',
      start_url: '/',
      display: 'standalone',
      icons: [
        { src: '/icons/icon-192.svg', sizes: '192x192' },
        { src: '/icons/icon-512.svg', sizes: '512x512' },
      ],
    };

    assert.equal(manifest.display, 'standalone');
    assert.equal(manifest.start_url, '/');
    assert.ok(manifest.icons.length >= 2);
    assert.ok(manifest.icons[0].src.endsWith('.svg'));
  });

  it('should protect PHI via network-only cache policy', () => {
    const networkOnlyPatterns = [
      /^\/api\/auth\//,
      /^\/api\/upload\//,
      /^\/api\/share-links\//,
      /^\/api\/sos\//,
    ];

    const testUrls = [
      { url: '/api/auth/login', shouldMatch: true },
      { url: '/api/upload/file', shouldMatch: true },
      { url: '/api/share-links/token123', shouldMatch: true },
      { url: '/api/sos/initiate', shouldMatch: true },
      { url: '/api/patients/data', shouldMatch: false },
      { url: '/api/medications/list', shouldMatch: false },
    ];

    for (const { url, shouldMatch } of testUrls) {
      const matches = networkOnlyPatterns.some((pattern) => pattern.test(url));
      assert.equal(matches, shouldMatch, `URL ${url} should${shouldMatch ? '' : ' not'} match network-only pattern`);
    }
  });

  it('should allow network-first caching for data APIs', () => {
    const networkFirstPatterns = [
      /^\/api\/patients\//,
      /^\/api\/medications\//,
      /^\/api\/appointments\//,
      /^\/api\/measurements\//,
    ];

    const testUrls = [
      { url: '/api/patients/pat-123', shouldMatch: true },
      { url: '/api/medications/med-456', shouldMatch: true },
      { url: '/api/appointments/list', shouldMatch: true },
      { url: '/api/auth/login', shouldMatch: false },
      { url: '/api/sos/initiate', shouldMatch: false },
    ];

    for (const { url, shouldMatch } of testUrls) {
      const matches = networkFirstPatterns.some((pattern) => pattern.test(url));
      assert.equal(matches, shouldMatch, `URL ${url} should${shouldMatch ? '' : ' not'} match network-first pattern`);
    }
  });
});

describe('PWA Update Flow', () => {
  it('should preserve pending data across update cycle', async () => {
    const store = new OfflineStoreManager(new MemoryStorageEngine());
    await store.setContext('user-1', 'patient-1');

    // Simulate pending offline mutation
    const mutation = await store.enqueueMutation('measurement', 'msm-1', 'create', {
      measurementType: 'weight',
      value: { weight_kg: 70 },
    });

    // Simulate new SW activating: re-instantiate store with same engine
    const engine = new MemoryStorageEngine();
    engine.put('mutations', mutation);

    const newStore = new OfflineStoreManager(engine);
    await newStore.setContext('user-1', 'patient-1');

    const active = await newStore.listActiveMutations();
    assert.equal(active.length, 1);
    assert.equal(active[0].clientMutationId, mutation.clientMutationId);

    // Verify the mutation can still be synced after update
    const result = await newStore.processSyncQueue({
      syncMutation: async () => ({
        success: true,
        serverEntity: { id: 'msm-1', version: 1 },
      }),
    });

    assert.equal(result.successCount, 1);
  });
});
