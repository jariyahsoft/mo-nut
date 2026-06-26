import { describe, it, beforeEach } from 'node:test';
import { strict as assert } from 'node:assert';
import {
  MemoryStorageEngine,
  OfflineStoreManager,
} from '../dist/index.js';

describe('OfflineStoreManager with IndexedDB isolated cache', () => {
  let store;

  beforeEach(() => {
    store = new OfflineStoreManager(new MemoryStorageEngine());
  });

  it('should require active patient context for operations', async () => {
    await assert.rejects(
      async () => await store.getCache('medication', 'med-1'),
      (err) => err.message === 'NO_ACTIVE_PATIENT_CONTEXT'
    );

    await store.setContext('user-1', 'patient-1');
    await assert.doesNotReject(async () => await store.getCache('medication', 'med-1'));
  });

  it('should store and retrieve data from isolated patient cache', async () => {
    await store.setContext('user-1', 'patient-1');
    await store.setCache('medication', 'med-1', { displayName: 'Aspirin' }, 1);

    const retrieved = await store.getCache('medication', 'med-1');
    assert.ok(retrieved);
    assert.equal(retrieved.payload.displayName, 'Aspirin');
    assert.equal(retrieved.patientId, 'patient-1');
    assert.equal(retrieved.version, 1);
  });

  it('should enqueue offline mutations with clientMutationId', async () => {
    await store.setContext('user-1', 'patient-1');

    const mutation = await store.enqueueMutation('measurement', 'msm-1', 'create', {
      measurementType: 'weight',
      value: { weight_kg: 70 },
    });

    assert.ok(mutation.clientMutationId);
    assert.equal(mutation.entityType, 'measurement');
    assert.equal(mutation.status, 'pending');
    assert.equal(mutation.retryCount, 0);
    assert.equal(mutation.maxRetries, 3);

    const mutations = await store.listActiveMutations();
    assert.equal(mutations.length, 1);
    assert.equal(mutations[0].clientMutationId, mutation.clientMutationId);
  });
});

describe('Sync Queue processing', () => {
  let store;

  beforeEach(() => {
    store = new OfflineStoreManager(new MemoryStorageEngine());
  });

  it('should sync offline measurements once', async () => {
    await store.setContext('user-1', 'patient-1');

    await store.enqueueMutation('measurement', 'msm-1', 'create', {
      measurementType: 'weight',
      value: { weight_kg: 70 },
    });

    const result = await store.processSyncQueue({
      syncMutation: async () => ({
        success: true,
        serverEntity: { id: 'msm-1', version: 1 },
      }),
    });

    assert.equal(result.successCount, 1);
    assert.equal(result.conflictCount, 0);
    assert.equal(result.failedCount, 0);

    const cache = await store.getCache('measurement', 'msm-1');
    assert.equal(cache.version, 1);
  });

  it('should not block valid items on partial failures', async () => {
    await store.setContext('user-1', 'patient-1');

    await store.enqueueMutation('medication', 'med-1', 'create', { displayName: 'Aspirin' });
    await store.enqueueMutation('medication', 'med-fail', 'create', { displayName: 'Bad' });

    const result = await store.processSyncQueue({
      syncMutation: async (mutation) => {
        if (mutation.entityId === 'med-fail') {
          return { success: false, error: { message: 'Rejected' } };
        }
        return { success: true };
      },
    });

    assert.equal(result.successCount, 1);
    assert.equal(result.failedCount, 1);
  });
});

describe('Entity policy enforcement', () => {
  let store;

  beforeEach(async () => {
    store = new OfflineStoreManager(new MemoryStorageEngine());
    await store.setContext('user-1', 'patient-1');
  });

  it('should reject duplicate create in queue', async () => {
    await store.enqueueMutation('medication', 'med-1', 'create', { name: 'Aspirin' });

    const policy = await store.applyEntityPolicy('medication', 'med-1', 'create', { name: 'Aspirin' });
    assert.equal(policy.allowed, false);
    assert.match(policy.reason, /DUPLICATE_CREATE_IN_FLIGHT/);
  });

  it('should reject stale version update', async () => {
    await store.setCache('medication', 'med-1', { name: 'Aspirin' }, 2);

    const policy = await store.applyEntityPolicy('medication', 'med-1', 'update', { name: 'Aspirin Updated', version: 1 });
    assert.equal(policy.allowed, false);
    assert.match(policy.reason, /STALE_VERSION/);
  });

  it('should require correction reason for dose final action change', async () => {
    await store.setCache('dose', 'dose-1', { status: 'taken' }, 1);

    const result = await store.applyEntityPolicy('dose', 'dose-1', 'update', { status: 'skipped' });
    assert.equal(result.allowed, false);
    assert.match(result.reason, /CORRECTION_REASON_REQUIRED/);
  });

  it('should allow dose correction with reason', async () => {
    await store.setCache('dose', 'dose-1', { status: 'taken' }, 1);

    const result = await store.applyEntityPolicy('dose', 'dose-1', 'update', {
      status: 'skipped',
      correctionReason: 'User realized mistake',
    });
    assert.equal(result.allowed, true);
  });
});

describe('Account switch clear-data policy', () => {
  let store;

  beforeEach(async () => {
    store = new OfflineStoreManager(new MemoryStorageEngine());
    await store.setContext('user-1', 'patient-1');
    await store.setCache('medication', 'med-1', { name: 'Aspirin' }, 1);
    await store.enqueueMutation('measurement', 'msm-pending', 'create', { value: { weight_kg: 70 } });
  });

  it('should block clear with pending mutations unless forced', async () => {
    await assert.rejects(
      async () => await store.clearAllUserData(false),
      (err) => err.message.includes('UNSYNCED_MUTATIONS_EXIST')
    );

    const cache = await store.getCache('medication', 'med-1');
    assert.ok(cache);
  });

  it('should force clear and remove all data', async () => {
    const result = await store.clearAllUserData(true);
    assert.equal(result.success, true);
    assert.equal(result.pendingCount, 1);

    assert.equal(store.getActivePatientId(), '');
    assert.equal(store.getActiveUserId(), '');

    await assert.rejects(
      async () => await store.getCache('medication', 'med-1'),
      (err) => err.message === 'NO_ACTIVE_PATIENT_CONTEXT'
    );
  });
});
