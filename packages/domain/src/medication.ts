import { EntityMetadata, SoftDeletable, DataSource } from './metadata.js';

/**
 * Medication, Schedule, and Dose Event Entities
 */

export type MedicationStatus = 'active' | 'paused' | 'completed' | 'cancelled';
export type MedicationSource = 'manual' | 'ocr_confirmed' | 'import';

export interface MedicationImage {
  id: string; // Asset ID
  url: string; // Internal reference
  uploadedAt: string;
}

export interface MedicationInventory {
  quantity: number;
  quantityUnit: string; // e.g. 'tablets', 'ml'
  estimatedAt: string; // ISO 8601 UTC
}

export interface Medication extends EntityMetadata, SoftDeletable {
  patientId: string;
  displayName: string; // e.g. "Metformin 500mg"
  genericName: string;
  form: string; // e.g. "tablet", "capsule", "syrup"
  strength: string; // e.g. "500mg"
  instructions: string;
  status: MedicationStatus;
  source: MedicationSource;
  caregiverNote?: string;
  images: MedicationImage[];
  activeScheduleIds: string[]; // References to active MedicationSchedule
  inventory?: MedicationInventory;
  warningText?: string;
}

export type SchedulePatternType =
  | 'daily_times'
  | 'specific_days'
  | 'every_n_hours'
  | 'weekly'
  | 'monthly'
  | 'as_needed';

export interface MedicationSchedule extends EntityMetadata {
  medicationId: string;
  patternType: SchedulePatternType;
  timezone: string; // IANA timezone
  localTimes: string[]; // e.g. ["08:00", "20:00"] for daily_times
  intervalHours?: number; // for every_n_hours
  daysOfWeek?: number[]; // 0-6 for weekly
  dayOfMonth?: number; // 1-31 for monthly
  asNeededInstructions?: string;
  effectiveFrom: string; // ISO 8601 UTC
  effectiveTo?: string; // ISO 8601 UTC - null means ongoing
  supersededByScheduleId?: string; // When a new schedule replaces this one
  active: boolean; // False when superseded or ended
}

export type DoseStatus =
  | 'scheduled'
  | 'due'
  | 'snoozed'
  | 'taken'
  | 'skipped'
  | 'issue_reported'
  | 'missed';

export interface DoseOccurrence extends EntityMetadata {
  scheduleId: string;
  medicationId: string;
  patientId: string;
  dueAt: string; // ISO 8601 UTC - when dose should be taken
  timezone: string; // IANA timezone for local display
  status: DoseStatus;
  respondedAt?: string; // When user marked taken/skipped/etc
  actorId?: string; // User who recorded the action
  snoozedUntil?: string; // For snoozed status
  note?: string;
}

export interface DoseEvent extends EntityMetadata {
  occurrenceId: string;
  medicationId: string;
  patientId: string;
  eventType: 'created' | 'action' | 'correction'; // action is first final, correction is after
  action: DoseStatus; // e.g. 'taken', 'skipped'
  actorId: string;
  occurredAt: string; // ISO 8601 UTC
  note?: string;
  correctionReason?: string; // Required for correction events
}

export interface MedicationRepository {
  /**
   * Find medication by ID
   */
  findById(id: string): Promise<Medication | null>;

  /**
   * List medications for a patient
   */
  listPatientMedications(
    patientId: string,
    options?: {
      status?: MedicationStatus;
      limit?: number;
      cursor?: string;
    }
  ): Promise<{ medications: Medication[]; nextCursor?: string }>;

  /**
   * Create medication
   */
  create(medication: Medication): Promise<Medication>;

  /**
   * Update medication (with version check)
   */
  update(medication: Medication): Promise<Medication>;

  /**
   * Soft delete medication
   */
  softDelete(id: string, deletedBy?: string): Promise<void>;
}

export interface MedicationScheduleRepository {
  /**
   * Find schedule by ID
   */
  findById(id: string): Promise<MedicationSchedule | null>;

  /**
   * List schedules for a medication (including history)
   */
  listMedicationSchedules(medicationId: string): Promise<MedicationSchedule[]>;

  /**
   * Get active schedule for a medication
   */
  findActiveSchedule(medicationId: string): Promise<MedicationSchedule | null>;

  /**
   * Create a new schedule (may supersede existing active schedule)
   */
  create(schedule: MedicationSchedule): Promise<MedicationSchedule>;

  /**
   * Update schedule (e.g. mark as superseded)
   */
  update(schedule: MedicationSchedule): Promise<MedicationSchedule>;
}

export interface DoseRepository {
  /**
   * Find dose occurrence by ID
   */
  findById(id: string): Promise<DoseOccurrence | null>;

  /**
   * Find dose occurrence by schedule and due time (for idempotency)
   */
  findByScheduleAndDueAt(scheduleId: string, dueAt: string): Promise<DoseOccurrence | null>;

  /**
   * List dose occurrences for a patient
   */
  listPatientDoses(
    patientId: string,
    options?: {
      status?: DoseStatus;
      from?: string;
      to?: string;
      limit?: number;
      cursor?: string;
    }
  ): Promise<{ doses: DoseOccurrence[]; nextCursor?: string }>;

  /**
   * Create dose occurrence
   */
  create(dose: DoseOccurrence): Promise<DoseOccurrence>;

  /**
   * Record dose action (idempotent for first final action, then correction events)
   * Returns the updated dose and the event record
   */
  recordAction(
    occurrenceId: string,
    action: DoseStatus,
    actorId: string,
    note?: string,
    correctionReason?: string
  ): Promise<{ dose: DoseOccurrence; event: DoseEvent }>;

  /**
   * List dose events (history) for an occurrence
   */
  listEvents(occurrenceId: string): Promise<DoseEvent[]>;

  /**
   * List all dose events for a medication (for schedule change history)
   */
  listMedicationEvents(medicationId: string): Promise<DoseEvent[]>;
}
