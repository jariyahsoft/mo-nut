import { EntityMetadata, SoftDeletable } from './metadata.js';

/**
 * Checklist, Report, and SOS Entities
 */

export type ChecklistSourceType = 'appointment' | 'medication' | 'manual' | 'template';
export type ChecklistStatus = 'active' | 'completed' | 'cancelled';

export interface ChecklistItem {
  id: string;
  description: string;
  isCompleted: boolean;
  completedAt?: string;
  completedBy?: string;
}

export interface Checklist extends EntityMetadata, SoftDeletable {
  patientId: string;
  sourceType: ChecklistSourceType;
  sourceId?: string; // e.g., appointmentId, medicationId
  title: string;
  items: ChecklistItem[];
  status: ChecklistStatus;
  targetRule?: string; // Recurrence rule if applicable
}

export type ChecklistOccurrenceStatus = 'upcoming' | 'due' | 'completed' | 'missed' | 'cancelled';

export interface ChecklistOccurrence extends EntityMetadata {
  checklistId: string;
  patientId: string; // Denormalized
  dueAt: string; // ISO 8601 UTC
  timezone: string; // IANA timezone
  status: ChecklistOccurrenceStatus;
  completedAt?: string;
  actorId?: string; // User who completed
  note?: string;
}

export type QuestionPriority = 'low' | 'normal' | 'high' | 'urgent';
export type QuestionStatus = 'draft' | 'submitted' | 'answered' | 'dismissed';

export interface DoctorQuestion extends EntityMetadata {
  patientId: string;
  appointmentId?: string; // Optional link to appointment
  question: string;
  priority: QuestionPriority;
  status: QuestionStatus;
  submittedAt?: string;
  answer?: string;
  answeredBy?: string; // Provider ID
  answeredAt?: string;
}

export type ReportStatus = 'pending' | 'processing' | 'ready' | 'failed';

export interface ReportJob extends EntityMetadata {
  patientId: string;
  requestedBy: string; // User ID
  periodFrom: string; // ISO 8601 UTC
  periodTo: string;
  scopes: string[]; // e.g., ['medications', 'measurements', 'appointments']
  status: ReportStatus;
  assetId?: string; // DocumentAsset ID when ready
  errorMessage?: string;
  expiresAt?: string; // Auto-cleanup time
}

export type ShareLinkStatus = 'active' | 'expired' | 'revoked';

export interface ShareLink extends EntityMetadata {
  ownerId: string; // Patient or user ID
  reportId?: string; // Optional link to report
  tokenHash: string; // SHA-256 of plaintext token, never store plaintext
  scopes: string[]; // What data can be accessed
  expiresAt: string; // ISO 8601 UTC
  maxUses?: number; // Optional use limit
  useCount: number;
  status: ShareLinkStatus;
  revokedAt?: string;
  revokedBy?: string;
}

export interface ShareLinkAccess extends EntityMetadata {
  shareLinkId: string;
  accessedAt: string;
  accessorIp?: string; // Optional IP tracking
  userAgent?: string;
}

export type SOSStatus = 'initiated' | 'dispatched' | 'responded' | 'resolved' | 'cancelled';

export interface LocationSnapshot {
  latitude: number;
  longitude: number;
  accuracy?: number; // meters
  capturedAt: string; // ISO 8601 UTC
}

export interface EmergencyEvent extends EntityMetadata {
  patientId: string;
  initiatedBy: string; // User ID
  initiatedAt: string; // ISO 8601 UTC
  status: SOSStatus;
  location?: LocationSnapshot;
  notifiedContacts: string[]; // Contact IDs that were notified
  failedContacts: string[]; // Contact IDs where notification failed
  respondedBy?: string; // Contact ID who responded
  respondedAt?: string;
  resolvedAt?: string;
  closedAt?: string;
  closedBy?: string;
  notes?: string;
}

export interface PatientEmergencyContact extends EntityMetadata {
  patientId: string;
  name: string;
  relationship: string;
  phoneNumber: string;
  email?: string;
  priority: number; // 1 = primary, 2 = secondary, etc.
  isActive: boolean;
}

export interface ChecklistRepository {
  findById(id: string): Promise<Checklist | null>;
  listPatientChecklists(
    patientId: string,
    status?: ChecklistStatus
  ): Promise<Checklist[]>;
  create(checklist: Checklist): Promise<Checklist>;
  update(checklist: Checklist): Promise<Checklist>;
  softDelete(id: string, deletedBy?: string): Promise<void>;
}

export interface ChecklistOccurrenceRepository {
  findById(id: string): Promise<ChecklistOccurrence | null>;
  listPatientOccurrences(
    patientId: string,
    options?: {
      status?: ChecklistOccurrenceStatus;
      from?: string;
      to?: string;
      limit?: number;
    }
  ): Promise<ChecklistOccurrence[]>;
  create(occurrence: ChecklistOccurrence): Promise<ChecklistOccurrence>;
  update(occurrence: ChecklistOccurrence): Promise<ChecklistOccurrence>;
}

export interface DoctorQuestionRepository {
  findById(id: string): Promise<DoctorQuestion | null>;
  listPatientQuestions(
    patientId: string,
    status?: QuestionStatus
  ): Promise<DoctorQuestion[]>;
  create(question: DoctorQuestion): Promise<DoctorQuestion>;
  update(question: DoctorQuestion): Promise<DoctorQuestion>;
}

export interface ReportJobRepository {
  findById(id: string): Promise<ReportJob | null>;
  listPatientReports(patientId: string): Promise<ReportJob[]>;
  create(job: ReportJob): Promise<ReportJob>;
  update(job: ReportJob): Promise<ReportJob>;
}

export interface ShareLinkRepository {
  findById(id: string): Promise<ShareLink | null>;
  findByTokenHash(tokenHash: string): Promise<ShareLink | null>;
  listOwnerLinks(ownerId: string): Promise<ShareLink[]>;
  create(link: ShareLink): Promise<ShareLink>;
  update(link: ShareLink): Promise<ShareLink>;
  recordAccess(access: ShareLinkAccess): Promise<void>;
  /**
   * Validate share link and return access result
   * Returns null if expired, revoked, or max uses exceeded
   */
  validateAndIncrementUse(tokenHash: string): Promise<ShareLink | null>;
}

export interface EmergencyEventRepository {
  findById(id: string): Promise<EmergencyEvent | null>;
  listPatientEvents(patientId: string): Promise<EmergencyEvent[]>;
  create(event: EmergencyEvent): Promise<EmergencyEvent>;
  update(event: EmergencyEvent): Promise<EmergencyEvent>;
}

export interface PatientEmergencyContactRepository {
  findById(id: string): Promise<PatientEmergencyContact | null>;
  listPatientContacts(patientId: string): Promise<PatientEmergencyContact[]>;
  create(contact: PatientEmergencyContact): Promise<PatientEmergencyContact>;
  update(contact: PatientEmergencyContact): Promise<PatientEmergencyContact>;
  delete(id: string): Promise<void>;
}
