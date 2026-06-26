import { EntityMetadata } from './metadata.js';

/**
 * Audit Events - Append-Only, Immutable Audit Trail
 */

export type AuditAction =
  | 'login'
  | 'logout'
  | 'consent.grant'
  | 'consent.revoke'
  | 'caregiver.invite'
  | 'caregiver.accept'
  | 'caregiver.revoke'
  | 'share_link.create'
  | 'share_link.access'
  | 'share_link.revoke'
  | 'appointment.create'
  | 'appointment.update'
  | 'appointment.cancel'
  | 'medication.create'
  | 'medication.update'
  | 'medication.delete'
  | 'measurement.create'
  | 'measurement.update'
  | 'report.export'
  | 'sos.initiate'
  | 'sos.respond'
  | 'admin.access'
  | 'support.access'
  | 'user.create'
  | 'user.update'
  | 'user.delete';

export interface AuditEvent extends EntityMetadata {
  actorId: string; // User or service account ID
  action: AuditAction;
  resourceType: string; // e.g., 'Patient', 'Medication', 'Appointment'
  resourceId: string;
  purpose?: string; // Why this action was performed
  occurredAt: string; // ISO 8601 UTC
  correlationId?: string; // For tracing related operations
  sourceIp?: string;
  userAgent?: string;
  deviceId?: string;
  beforeSnapshot?: Record<string, unknown>; // State before change
  afterSnapshot?: Record<string, unknown>; // State after change
}

/**
 * Transactional Outbox Pattern - Reliable Side Effects
 */

export type OutboxMessageType =
  | 'notification'
  | 'ocr_job'
  | 'stt_job'
  | 'report_job'
  | 'reminder'
  | 'dose_generation'
  | 'email'
  | 'sms'
  | 'push';

export type OutboxStatus = 'pending' | 'processing' | 'completed' | 'failed' | 'dead_letter';

export interface OutboxMessage extends EntityMetadata {
  messageType: OutboxMessageType;
  payload: Record<string, unknown>; // Message data
  status: OutboxStatus;
  idempotencyKey: string; // Unique key for deduplication
  retryCount: number;
  maxRetries: number;
  nextRetryAt?: string; // ISO 8601 UTC
  processedAt?: string;
  errorMessage?: string;
  deadLetterAt?: string;
}

/**
 * Background Jobs - Worker Processing State
 */

export type BackgroundJobType =
  | 'notification_delivery'
  | 'ocr_processing'
  | 'stt_processing'
  | 'report_generation'
  | 'reminder_dispatch'
  | 'dose_schedule_generation'
  | 'data_export'
  | 'cleanup';

export type BackgroundJobStatus = 'scheduled' | 'running' | 'completed' | 'failed' | 'cancelled';

export interface BackgroundJob extends EntityMetadata {
  jobType: BackgroundJobType;
  payload: Record<string, unknown>;
  status: BackgroundJobStatus;
  idempotencyKey: string; // Worker-level deduplication
  scheduledFor: string; // ISO 8601 UTC
  startedAt?: string;
  completedAt?: string;
  retryCount: number;
  maxRetries: number;
  nextRetryAt?: string;
  errorMessage?: string;
  result?: Record<string, unknown>;
}

export interface AuditEventRepository {
  /**
   * Find audit event by ID
   */
  findById(id: string): Promise<AuditEvent | null>;

  /**
   * List audit events for a resource
   */
  listByResource(
    resourceType: string,
    resourceId: string,
    options?: {
      from?: string;
      to?: string;
      limit?: number;
      cursor?: string;
    }
  ): Promise<{ events: AuditEvent[]; nextCursor?: string }>;

  /**
   * List audit events by actor
   */
  listByActor(
    actorId: string,
    options?: {
      action?: AuditAction;
      from?: string;
      to?: string;
      limit?: number;
      cursor?: string;
    }
  ): Promise<{ events: AuditEvent[]; nextCursor?: string }>;

  /**
   * Create audit event (append-only, immutable)
   */
  create(event: AuditEvent): Promise<AuditEvent>;

  /**
   * Audit events cannot be updated or deleted through normal API
   * Deletion only via retention policy or legal hold expiry
   */
}

export interface OutboxRepository {
  /**
   * Find outbox message by ID
   */
  findById(id: string): Promise<OutboxMessage | null>;

  /**
   * Find by idempotency key (for deduplication)
   */
  findByIdempotencyKey(idempotencyKey: string): Promise<OutboxMessage | null>;

  /**
   * List pending messages for processing
   */
  listPending(
    messageType?: OutboxMessageType,
    limit?: number
  ): Promise<OutboxMessage[]>;

  /**
   * Create outbox message atomically with domain operation
   */
  create(message: OutboxMessage): Promise<OutboxMessage>;

  /**
   * Update message status (worker processing)
   */
  update(message: OutboxMessage): Promise<OutboxMessage>;

  /**
   * Mark as dead letter after max retries
   */
  moveToDeadLetter(id: string, reason: string): Promise<void>;
}

export interface BackgroundJobRepository {
  /**
   * Find job by ID
   */
  findById(id: string): Promise<BackgroundJob | null>;

  /**
   * Find by idempotency key
   */
  findByIdempotencyKey(idempotencyKey: string): Promise<BackgroundJob | null>;

  /**
   * List scheduled jobs ready to run
   */
  listScheduled(
    jobType?: BackgroundJobType,
    limit?: number
  ): Promise<BackgroundJob[]>;

  /**
   * Create background job
   */
  create(job: BackgroundJob): Promise<BackgroundJob>;

  /**
   * Update job status and result
   */
  update(job: BackgroundJob): Promise<BackgroundJob>;

  /**
   * Cancel a scheduled job
   */
  cancel(id: string): Promise<void>;
}
