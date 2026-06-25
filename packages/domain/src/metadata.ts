/**
 * Common Metadata and ID Utilities
 *
 * These utilities provide portable, Firebase-independent domain model support
 * for IDs, timestamps, versioning, and soft-delete patterns.
 */

/**
 * Standard entity metadata fields
 */
export interface EntityMetadata {
  id: string; // UUID/ULID - database-independent
  schemaVersion: number; // For data migration
  version: number; // Optimistic concurrency control
  createdAt: string; // ISO 8601 UTC timestamp
  updatedAt: string; // ISO 8601 UTC timestamp
  createdBy?: string; // Actor ID (user or service account)
  updatedBy?: string; // Actor ID (user or service account)
}

/**
 * Soft-delete support
 */
export interface SoftDeletable {
  deletedAt?: string; // ISO 8601 UTC timestamp, null if active
  deletedBy?: string; // Actor ID who performed soft delete
}

/**
 * Source tracking for imported/OCR/STT/manual data
 */
export type DataSource =
  | { type: 'manual'; actorId: string }
  | { type: 'import'; importId: string; source: string }
  | { type: 'ocr'; jobId: string; confidence: number }
  | { type: 'stt'; jobId: string; confidence: number }
  | { type: 'device'; deviceId: string }
  | { type: 'system' };

/**
 * Time zone aware scheduling
 */
export interface ScheduledTime {
  utcTimestamp: string; // ISO 8601 UTC
  timezone: string; // IANA time zone (e.g., 'Asia/Bangkok')
  localTime?: string; // ISO 8601 local time for display
}

/**
 * Generate a new entity ID (UUID v4)
 */
export function generateId(): string {
  // In real implementation, use a proper UUID library
  // For now, use crypto.randomUUID() which is available in Node.js 14.17+
  return crypto.randomUUID();
}

/**
 * Get current ISO 8601 UTC timestamp
 */
export function now(): string {
  return new Date().toISOString();
}

/**
 * Initialize standard entity metadata for a new entity
 */
export function initMetadata(createdBy?: string): EntityMetadata {
  const timestamp = now();
  return {
    id: generateId(),
    schemaVersion: 1,
    version: 1,
    createdAt: timestamp,
    updatedAt: timestamp,
    ...(createdBy ? { createdBy, updatedBy: createdBy } : {}),
  };
}

/**
 * Update metadata for an entity being modified
 */
export function updateMetadata(
  current: EntityMetadata,
  updatedBy?: string
): EntityMetadata {
  return {
    ...current,
    version: current.version + 1,
    updatedAt: now(),
    ...(updatedBy ? { updatedBy } : {}),
  };
}

/**
 * Check if an entity is soft-deleted
 */
export function isDeleted(entity: SoftDeletable): boolean {
  return entity.deletedAt !== undefined && entity.deletedAt !== null;
}

/**
 * Mark an entity as soft-deleted
 */
export function markDeleted(
  entity: SoftDeletable,
  deletedBy?: string
): SoftDeletable {
  return {
    ...entity,
    deletedAt: now(),
    ...(deletedBy ? { deletedBy } : {}),
  };
}

/**
 * Standard repository errors
 */
export class RepositoryError extends Error {
  constructor(
    public code: string,
    message: string,
    public details?: Record<string, unknown>
  ) {
    super(message);
    this.name = 'RepositoryError';
  }
}

export class NotFoundError extends RepositoryError {
  constructor(resourceType: string, id: string) {
    super('NOT_FOUND', `${resourceType} with id ${id} not found`);
  }
}

export class VersionConflictError extends RepositoryError {
  constructor(resourceType: string, expectedVersion: number, actualVersion: number) {
    super(
      'VERSION_CONFLICT',
      `${resourceType} version mismatch: expected ${expectedVersion}, actual ${actualVersion}`,
      { expectedVersion, actualVersion }
    );
  }
}

export class DuplicateError extends RepositoryError {
  constructor(resourceType: string, field: string, value: string) {
    super(
      'DUPLICATE',
      `${resourceType} with ${field}=${value} already exists`,
      { field, value }
    );
  }
}
