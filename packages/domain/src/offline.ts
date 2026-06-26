/**
 * Offline Cache, Sync Queue, and Entity Policy Models
 */
export type SyncStatus = 'pending' | 'syncing' | 'synced' | 'failed' | 'conflict';

export interface OfflineMutation {
  clientMutationId: string;
  patientId: string;
  userId: string;
  entityType: string;
  entityId: string;
  operation: 'create' | 'update' | 'delete';
  payload: Record<string, unknown>;
  status: SyncStatus;
  retryCount: number;
  maxRetries: number;
  nextRetryAt?: string;
  errorMessage?: string;
  conflictRecord?: {
    serverVersion: number;
    clientVersion: number;
    serverPayload: Record<string, unknown>;
  };
  createdAt: string;
}

export interface OfflineCache {
  patientId: string;
  entityType: string;
  entityId: string;
  payload: Record<string, unknown>;
  version: number;
  updatedAt: string;
}

export interface IDBStorageEngine {
  get(storeName: string, key: string): Promise<unknown>;
  put(storeName: string, value: unknown): Promise<void>;
  delete(storeName: string, key: string): Promise<void>;
  getAll(storeName: string): Promise<unknown[]>;
  clear(storeName: string): Promise<void>;
}

export class MemoryStorageEngine implements IDBStorageEngine {
  private stores = new Map<string, Map<string, unknown>>();

  private getStore(name: string): Map<string, unknown> {
    if (!this.stores.has(name)) {
      this.stores.set(name, new Map());
    }
    return this.stores.get(name)!;
  }

  async get(storeName: string, key: string): Promise<unknown> {
    return this.getStore(storeName).get(key) ?? null;
  }

  async put(storeName: string, value: unknown): Promise<void> {
    const v = value as Record<string, unknown>;
    const key = (v.clientMutationId as string)
      || `${v.patientId}:${v.entityType}:${v.entityId}`
      || (v.id as string);
    this.getStore(storeName).set(key, value);
  }

  async delete(storeName: string, key: string): Promise<void> {
    this.getStore(storeName).delete(key);
  }

  async getAll(storeName: string): Promise<unknown[]> {
    return Array.from(this.getStore(storeName).values());
  }

  async clear(storeName: string): Promise<void> {
    this.getStore(storeName).clear();
  }
}

function generateId(): string {
  return crypto.randomUUID();
}

export class OfflineStoreManager {
  private db: IDBStorageEngine;
  private currentUserId = '';
  private activePatientId = '';

  constructor(engine?: IDBStorageEngine) {
    this.db = engine ?? new MemoryStorageEngine();
  }

  async setContext(userId: string, patientId: string) {
    this.currentUserId = userId;
    this.activePatientId = patientId;
  }

  clearContext() {
    this.currentUserId = '';
    this.activePatientId = '';
  }

  getActivePatientId(): string {
    return this.activePatientId;
  }

  getActiveUserId(): string {
    return this.currentUserId;
  }

  async getCache(entityType: string, entityId: string): Promise<OfflineCache | null> {
    if (!this.activePatientId) throw new Error('NO_ACTIVE_PATIENT_CONTEXT');
    const key = `${this.activePatientId}:${entityType}:${entityId}`;
    const cache = (await this.db.get('caches', key)) as OfflineCache | null;
    if (!cache || cache.patientId !== this.activePatientId) return null;
    return cache;
  }

  async setCache(entityType: string, entityId: string, payload: Record<string, unknown>, version: number) {
    if (!this.activePatientId) throw new Error('NO_ACTIVE_PATIENT_CONTEXT');
    const key = `${this.activePatientId}:${entityType}:${entityId}`;
    const cache: OfflineCache = {
      patientId: this.activePatientId,
      entityType,
      entityId,
      payload,
      version,
      updatedAt: new Date().toISOString(),
    };
    await this.db.put('caches', cache);
  }

  async deleteCache(entityType: string, entityId: string) {
    if (!this.activePatientId) throw new Error('NO_ACTIVE_PATIENT_CONTEXT');
    const key = `${this.activePatientId}:${entityType}:${entityId}`;
    await this.db.delete('caches', key);
  }

  async enqueueMutation(
    entityType: string,
    entityId: string,
    operation: 'create' | 'update' | 'delete',
    payload: Record<string, unknown>
  ): Promise<OfflineMutation> {
    if (!this.activePatientId || !this.currentUserId) {
      throw new Error('NO_ACTIVE_CONTEXT');
    }

    const mutation: OfflineMutation = {
      clientMutationId: generateId(),
      patientId: this.activePatientId,
      userId: this.currentUserId,
      entityType,
      entityId,
      operation,
      payload,
      status: 'pending',
      retryCount: 0,
      maxRetries: 3,
      createdAt: new Date().toISOString(),
    };

    await this.db.put('mutations', mutation);
    return mutation;
  }

  async listActiveMutations(): Promise<OfflineMutation[]> {
    if (!this.activePatientId || !this.currentUserId) {
      throw new Error('NO_ACTIVE_CONTEXT');
    }

    const all = (await this.db.getAll('mutations')) as OfflineMutation[];
    return all
      .filter((m) => m.patientId === this.activePatientId && m.userId === this.currentUserId)
      .sort((a, b) => a.createdAt.localeCompare(b.createdAt));
  }

  async clearAllUserData(force = false): Promise<{ success: boolean; pendingCount: number }> {
    const allMutations = (await this.db.getAll('mutations')) as OfflineMutation[];
    const pending = allMutations.filter((m) => m.status === 'pending' || m.status === 'syncing');

    if (pending.length > 0 && !force) {
      throw new Error(`UNSYNCED_MUTATIONS_EXIST: ${pending.length} pending mutations exist. Clear with force=true to discard.`);
    }

    await this.db.clear('caches');
    await this.db.clear('mutations');
    this.clearContext();

    return { success: true, pendingCount: pending.length };
  }

  async processSyncQueue(
    serverClient: {
      syncMutation: (mutation: OfflineMutation) => Promise<{ success: boolean; serverEntity?: Record<string, unknown>; error?: { code?: string; message?: string; serverVersion?: number; serverPayload?: Record<string, unknown> } }>;
    }
  ): Promise<{ successCount: number; conflictCount: number; failedCount: number }> {
    const mutations = await this.listActiveMutations();
    let successCount = 0;
    let conflictCount = 0;
    let failedCount = 0;

    for (const mutation of mutations) {
      if (mutation.status !== 'pending' && mutation.status !== 'failed') continue;

      mutation.status = 'syncing';
      await this.db.put('mutations', mutation);

      try {
        const result = await serverClient.syncMutation(mutation);

        if (result.success) {
          mutation.status = 'synced';
          await this.db.put('mutations', mutation);
          if (result.serverEntity) {
            await this.setCache(mutation.entityType, mutation.entityId, result.serverEntity, (result.serverEntity.version as number) ?? 1);
          }
          successCount++;
        } else if (result.error?.code === 'VERSION_CONFLICT') {
          conflictCount++;
          mutation.status = 'conflict';
          mutation.conflictRecord = {
            serverVersion: result.error.serverVersion ?? 0,
            clientVersion: (mutation.payload.version as number) ?? 1,
            serverPayload: result.error.serverPayload ?? {},
          };
          await this.db.put('mutations', mutation);

          if (result.error.serverPayload) {
            await this.setCache(mutation.entityType, mutation.entityId, result.error.serverPayload, result.error.serverVersion ?? 0);
          }
        } else {
          failedCount++;
          mutation.status = 'failed';
          mutation.retryCount += 1;
          mutation.errorMessage = result.error?.message ?? 'Sync failed';
          await this.db.put('mutations', mutation);
        }
      } catch (err: unknown) {
        failedCount++;
        mutation.status = 'failed';
        mutation.retryCount += 1;
        mutation.errorMessage = err instanceof Error ? err.message : 'Network exception';
        await this.db.put('mutations', mutation);
      }
    }

    return { successCount, conflictCount, failedCount };
  }

  async applyEntityPolicy(
    entityType: string,
    entityId: string,
    operation: 'create' | 'update' | 'delete',
    payload: Record<string, unknown>
  ): Promise<{ allowed: boolean; reason?: string }> {
    if (operation === 'create') {
      const existingCache = await this.getCache(entityType, entityId);
      if (existingCache) {
        return { allowed: false, reason: `DUPLICATE_CREATE: Entity ${entityType}:${entityId} already exists in local cache` };
      }

      const mutations = await this.listActiveMutations();
      const inFlightNew = mutations.find(
        (m) => m.entityType === entityType && m.entityId === entityId && m.operation === 'create'
      );
      if (inFlightNew) {
        return { allowed: false, reason: 'DUPLICATE_CREATE_IN_FLIGHT: Creational mutation already in queue' };
      }
    }

    if (operation === 'update') {
      const activeCache = await this.getCache(entityType, entityId);
      if (activeCache && payload.version) {
        const pv = payload.version as number;
        if (pv < activeCache.version) {
          return {
            allowed: false,
            reason: `STALE_VERSION: Local cache has version ${activeCache.version}, update payload has version ${pv}`,
          };
        }
      }
    }

    if (entityType === 'dose' && operation === 'update') {
      const activeCache = await this.getCache('dose', entityId);
      if (activeCache) {
        const currentStatus = activeCache.payload.status as string;
        const newStatus = payload.status as string;

        const isFinal = currentStatus === 'taken' || currentStatus === 'skipped';
        const isNewFinal = newStatus === 'taken' || newStatus === 'skipped';

        if (isFinal && isNewFinal && currentStatus !== newStatus) {
          if (!payload.correctionReason) {
            return {
              allowed: false,
              reason: `CORRECTION_REASON_REQUIRED: Correcting final dose state from ${currentStatus} to ${newStatus} requires reason`,
            };
          }
        }
      }
    }

    if (entityType === 'checklist' && operation === 'update') {
      const activeCache = await this.getCache('checklist', entityId);
      if (activeCache && (activeCache.payload.status as string) === 'completed' && (payload.status as string) === 'active') {
        if (!payload.correctionReason) {
          return { allowed: false, reason: 'CORRECTION_REASON_REQUIRED: Reactivating a completed checklist requires correction reason' };
        }
      }
    }

    return { allowed: true };
  }
}
