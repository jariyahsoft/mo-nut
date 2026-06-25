import { EntityMetadata, SoftDeletable } from './metadata.js';

/**
 * Appointment and AppointmentEvent Entities
 */

export type AppointmentStatus =
  | 'upcoming'
  | 'confirmed'
  | 'traveling'
  | 'arrived'
  | 'waiting'
  | 'completed'
  | 'rescheduled'
  | 'cancelled'
  | 'missed';

export interface PreparationItem {
  id: string;
  description: string;
  isCompleted: boolean;
  completedAt?: string;
}

export interface LinkedDocument {
  id: string; // DocumentAsset ID
  name: string;
  mimeType: string;
  uploadedAt: string;
}

export interface Appointment extends EntityMetadata, SoftDeletable {
  patientId: string;
  facilityId: string;
  providerId?: string; // Optional clinician/doctor profile ID
  scheduledAt: string; // ISO 8601 UTC
  timezone: string; // IANA timezone for local alarm triggers
  status: AppointmentStatus;
  notes?: string;

  // Checklist of tasks before appointment
  preparations: PreparationItem[];

  // Linked PDF/images from processing
  documents: LinkedDocument[];

  // Version revision tracking (optimistic locking)
  revision: number;
}

export interface AppointmentEvent extends EntityMetadata {
  appointmentId: string;
  type: string; // e.g. 'created', 'status_changed', 'rescheduled'
  oldValue?: string;
  newValue: string;
  actorId: string;
  occurredAt: string;
  reason?: string;
}

export interface AppointmentRepository {
  /**
   * Find appointment by ID
   */
  findById(id: string): Promise<Appointment | null>;

  /**
   * List appointments for a patient (paginated, sorted by date)
   */
  listPatientAppointments(
    patientId: string,
    options?: {
      status?: AppointmentStatus;
      from?: string;
      to?: string;
      limit?: number;
      cursor?: string;
    }
  ): Promise<{ appointments: Appointment[]; nextCursor?: string }>;

  /**
   * Create an appointment
   */
  create(appointment: Appointment, event: AppointmentEvent): Promise<Appointment>;

  /**
   * Update an appointment (e.g. status transition) and record history
   * Should perform version conflict check
   */
  update(
    appointment: Appointment,
    event: AppointmentEvent
  ): Promise<Appointment>;

  /**
   * Soft delete an appointment
   */
  softDelete(id: string, event: AppointmentEvent, deletedBy?: string): Promise<void>;

  /**
   * Find status events for an appointment
   */
  listHistory(appointmentId: string): Promise<AppointmentEvent[]>;
}
