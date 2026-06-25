import { EntityMetadata, SoftDeletable } from './metadata.js';

/**
 * Consent and Permission evaluation Models
 */

export type ConsentStatus = 'draft' | 'active' | 'suspended' | 'revoked' | 'expired';

export interface ConsentGrant extends EntityMetadata, SoftDeletable {
  patientId: string;
  granteeId: string; // User ID or Clinician ID
  purposes: string[]; // e.g. ['caregiver_coordination', 'clinical_review', 'research']
  scopes: string[]; // e.g. ['appointment.read', 'medication.read', 'health_record.read']
  policyVersion: string; // e.g. '1.0'
  status: ConsentStatus;
  validFrom: string;
  expiresAt: string; // ISO 8601 UTC
  revokedAt?: string;
  revokedBy?: string;
}

export interface PermissionEvaluationRequest {
  actorId: string;
  patientId: string;
  action: string; // e.g. 'appointment.read', 'medication.write'
  purpose?: string;
}

export interface PermissionEvaluationResult {
  allowed: boolean;
  reason: string;
  scopes: string[];
}

export interface ConsentRepository {
  /**
   * Find consent grant by ID
   */
  findById(id: string): Promise<ConsentGrant | null>;

  /**
   * Find active consents for a patient
   */
  findActiveGrants(patientId: string): Promise<ConsentGrant[]>;

  /**
   * Find active consent for a specific patient-grantee pair
   */
  findActiveGrant(patientId: string, granteeId: string): Promise<ConsentGrant | null>;

  /**
   * Create consent grant
   */
  create(grant: ConsentGrant): Promise<ConsentGrant>;

  /**
   * Update consent grant (e.g. revoke/suspend)
   */
  update(grant: ConsentGrant): Promise<ConsentGrant>;

  /**
   * Evaluate if an actor is permitted to perform an action on a patient context
   */
  evaluatePermission(request: PermissionEvaluationRequest): Promise<PermissionEvaluationResult>;
}
