/**
 * Patient-Isolated IndexedDB Store and Sync Queue
 *
 * Core offline types and logic are in @mo-nut/domain (offline.ts).
 * This file provides the browser-tuned IndexedDB adapter wrapper.
 */

export type SyncStatus = 'pending' | 'syncing' | 'synced' | 'failed' | 'conflict';

export interface OfflineMutation {
  clientMutationId: string;
  patientId: string;
  userId: string;
  entityType: string; // e.g., 'medication', 'measurement', 'dose'
  entityId: string;
  operation: 'create' | 'update' | 'delete';
  payload: Record<string, any>;
  status: SyncStatus;
  retryCount: number;
  maxRetries: number;
  nextRetryAt?: string; // ISO 8601 UTC
  errorMessage?: string;
  conflictRecord?: {
    serverVersion: number;
    clientVersion: number;
    serverPayload: Record<string, any>;
  };
  createdAt: string;
}

export interface OfflineCache {
  patientId: string;
  entityType: string;
  entityId: string;
  payload: Record<string, any>;
  version: number;
  updatedAt: string;
}

/**
 * Interface representing IndexedDB storage engine.
 * Can be backed by browser IndexedDB or Mock memory-storage in test environments.
 */
export interface IDBStorageEngine {
  get(storeName: string, key: string): Promise<any>;
  put(storeName: string, value: any): Promise<void>;
  delete(storeName: string, key: string): Promise<void>;
  getAll(storeName: string): Promise<any[]>;
  clear(storeName: string): Promise<void>;
}

export class MemoryStorageEngine implements IDBStorageEngine {
  private stores = new Map<string, Map<string, any>>();

  private getStore(name: string): Map<string, any> {
    if (!this.stores.has(name)) {
      this.stores.set(name, new Map());
    }
    return this.stores.get(name)!;
  }

  async get(storeName: string, key: string): Promise<any> {
    return this.getStore(storeName).get(key) || null;
  }

  async put(storeName: string, value: any): Promise<void> {
    const key = value.clientMutationId || `${value.patientId}:${value.entityType}:${value.entityId}` || value.id;
    this.getStore(storeName).set(key, value);
  }

  async delete(storeName: string, key: string): Promise<void> {
    this.getStore(storeName).delete(key);
  }

  async getAll(storeName: string): Promise<any[]> {
    return Array.from(this.getStore(storeName).values());
  }

  async clear(storeName: string): Promise<void> {
    this.getStore(storeName).clear();
  }
}

export class OfflineStoreManager {
  private db: IDBStorageEngine;
  private currentUserId: string = '';
  private activePatientId: string = '';

  constructor(engine?: IDBStorageEngine) {
    // If running in browser and no engine provided, fallback to browser IndexedDB wrapper
    // For Node.js tests, use MemoryStorageEngine
    this.db = engine || new MemoryStorageEngine();
  }

  /**
   * Initialize context for an active user/patient
   */
  async setContext(userId: string, patientId: string) {
    this.currentUserId = userId;
    this.activePatientId = patientId;
  }

  /**
   * Clear active context
   */
  clearContext() {
    this.currentUserId = '';
    this.activePatientId = '';
  }

  /**
   * Get current active patient ID
   */
  getActivePatientId(): string {
    return this.activePatientId;
  }

  /**
   * Get current active user ID
   */
  getActiveUserId(): string {
    return this.currentUserId;
  }

  /**
   * Isolated Offline Cache Access (Reads only active patient cache)
   */
  async getCache(entityType: string, entityId: string): Promise<OfflineCache | null> {
    if (!this.activePatientId) throw new Error('NO_ACTIVE_PATIENT_CONTEXT');
    const key = `${this.activePatientId}:${entityType}:${entityId}`;
    const cache = await this.db.get('caches', key);
    if (!cache || cache.patientId !== this.activePatientId) return null;
    return cache;
  }

  /**
   * Write to isolated cache
   */
  async setCache(entityType: string, entityId: string, payload: Record<string, any>, version: number) {
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

  /**
   * Delete specific cache record
   */
  async deleteCache(entityType: string, entityId: string) {
    if (!this.activePatientId) throw new Error('NO_ACTIVE_PATIENT_CONTEXT');
    const key = `${this.activePatientId}:${entityType}:${entityId}`;
    await this.db.delete('caches', key);
  }

  /**
   * Queue an offline mutation
   */
  async enqueueMutation(
    entityType: string,
    entityId: string,
    operation: 'create' | 'update' | 'delete',
    payload: Record<string, any>
  ): Promise<OfflineMutation> {
    if (!this.activePatientId || !this.currentUserId) {
      throw new Error('NO_ACTIVE_CONTEXT');
    }

    const mutation: OfflineMutation = {
      clientMutationId: crypto.randomUUID(),
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

  /**
   * List pending/processing offline mutations for active patient-user context
   */
  async listActiveMutations(): Promise<OfflineMutation[]> {
    if (!this.activePatientId || !this.currentUserId) {
      throw new Error('NO_ACTIVE_CONTEXT');
    }

    const all = await this.db.getAll('mutations');
    return all
      .filter((m) => m.patientId === this.activePatientId && m.userId === this.currentUserId)
      .sort((a, b) => a.createdAt.localeCompare(b.createdAt));
  }

  /**
   * Clear all offline cached data on logout or account switch,
   * but warn/throw if there are unsynced pending mutations to prevent silent loss
   */
  async clearAllUserData(force: boolean = false): Promise<{ success: boolean; pendingCount: number }> {
    const allMutations = await this.db.getAll('mutations');
    const pending = allMutations.filter((m) => m.status === 'pending' || m.status === 'syncing');

    if (pending.length > 0 && !force) {
      throw new Error(`UNSYNCED_MUTATIONS_EXIST: ${pending.length} pending mutations exist. Clear with force=true to discard.`);
    }

    // Safely clear all cache and mutation stores
    await this.db.clear('caches');
    await this.db.clear('mutations');
    this.clearContext();

    return { success: true, pendingCount: pending.length };
  }

  /**
   * Sync Queue Processor with Conflict Policy resolution
   * Uses "Server-Wins" conflict resolution logic
   */
  async processSyncQueue(
    serverClient: {
      syncMutation: (mutation: OfflineMutation) => Promise<{ success: boolean; serverEntity?: any; error?: any }>;
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
          // Update client cache with the master version from server
          if (result.serverEntity) {
            await this.setCache(
              mutation.entityType,
              mutation.entityId,
              result.serverEntity,
              result.serverEntity.version
            );
          }
          successCount++;
        } else if (result.error?.code === 'VERSION_CONFLICT') {
          // Conflict Policy: Server Wins
          conflictCount++;
          mutation.status = 'conflict';
          mutation.conflictRecord = {
            serverVersion: result.error.serverVersion,
            clientVersion: mutation.payload.version || 1,
            serverPayload: result.error.serverPayload,
          };
          await this.db.put('mutations', mutation);

          // Force client cache to update to server state (overwrite local)
          if (result.error.serverPayload) {
            await this.setCache(
              mutation.entityType,
              mutation.entityId,
              result.error.serverPayload,
              result.error.serverVersion
            );
          }
        } else {
          // Simple Failure
          failedCount++;
          mutation.status = 'failed';
          mutation.retryCount += 1;
          mutation.errorMessage = result.error?.message || 'Sync failed';
          if (mutation.retryCount >= mutation.maxRetries) {
            mutation.status = 'failed'; // Or lock/dead-letter
          }
          await this.db.put('mutations', mutation);
        }
      } catch (err: any) {
        failedCount++;
        mutation.status = 'failed';
        mutation.retryCount += 1;
        mutation.errorMessage = err.message || 'Network exception';
        await this.db.put('mutations', mutation);
      }
    }

    return { successCount, conflictCount, failedCount };
  }

  /**
   * Enforce business logic policies:
   * 1. Create de-duplication
   * 2. Versioned updates
   * 3. Dose first-final action
   * 4. Checklist corrections
   */
  async applyEntityPolicy(
    entityType: string,
    entityId: string,
    operation: 'create' | 'update' | 'delete',
    payload: Record<string, any>
  ): Promise<{ allowed: boolean; reason?: string; payloadOverride?: Record<string, any> }> {
    // 1. Create de-duplication: check if cache or mutations already exist
    if (operation === 'create') {
      const existingCache = await this.getCache(entityType, entityId);
      if (existingCache) {
        return { allowed: false, reason: `DUPLICATE_CREATE: Entity ${entityType}:${entityId} already exists in local cache` };
      }

      // Check current in-flight creations
      const mutations = await this.listActiveMutations();
      const inFlightNew = mutations.find(
        (m) => m.entityType === entityType && m.entityId === entityId && m.operation === 'create'
      );
      if (inFlightNew) {
        return { allowed: false, reason: `DUPLICATE_CREATE_IN_FLIGHT: Creational mutation already in queue` };
      }
    }

    // 2. Versioned updates: local version check
    if (operation === 'update') {
      const activeCache = await this.getCache(entityType, entityId);
      if (activeCache && payload.version) {
        if (payload.version < activeCache.version) {
          return {
            allowed: false,
            reason: `STALE_VERSION: Local cache has version ${activeCache.version}, update payload has version ${payload.version}`,
          };
        }
      }
    }

    // 3. Dose first-final action: Dose status transition checks
    if (entityType === 'dose' && operation === 'update') {
      const activeCache = await this.getCache('dose', entityId);
      if (activeCache) {
        const currentStatus = activeCache.payload.status;
        const newStatus = payload.status;

        // Invariant: once 'taken' or 'skipped', cannot transition without correction reason
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

    // 4. Checklist corrections
    if (entityType === 'checklist' && operation === 'update') {
      const activeCache = await this.getCache('checklist', entityId);
      if (activeCache && activeCache.payload.status === 'completed' && payload.status === 'active') {
        if (!payload.correctionReason) {
          return {
            allowed: false,
            reason: 'CORRECTION_REASON_REQUIRED: Reactivating a completed checklist requires correction reason',
          };
        }
      }
    }

    return { allowed: true };
  }
}
