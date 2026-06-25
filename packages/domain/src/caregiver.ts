import { EntityMetadata, SoftDeletable } from './metadata.js';

/**
 * Caregiver, Relationships, and Invitations
 */

export type CaregiverRole = 'primary' | 'backup' | 'viewer';
export type InvitationStatus = 'pending' | 'accepted' | 'declined' | 'expired' | 'revoked';
export type RelationshipStatus = 'active' | 'suspended' | 'revoked';

export interface CaregiverInvitation extends EntityMetadata {
  patientId: string;
  inviteeEmail: string;
  role: CaregiverRole;
  scopes: string[]; // e.g. ['appointment.read', 'medication.read']
  tokenHash: string; // Plain token is never stored
  expiresAt: string; // ISO 8601 UTC
  status: InvitationStatus;
  invitedByUserId: string;
  acceptedAt?: string;
  acceptedByUserId?: string;
}

export interface CareRelationship extends EntityMetadata, SoftDeletable {
  patientId: string;
  caregiverUserId: string;
  role: CaregiverRole;
  scopes: string[];
  status: RelationshipStatus;
  statusNotes?: string;
  validFrom: string;
  expiresAt?: string; // Optional expiry for temporary access
}

export interface CaregiverRepository {
  /**
   * Find invitation by ID
   */
  findInvitationById(id: string): Promise<CaregiverInvitation | null>;

  /**
   * Find invitation by token hash
   */
  findInvitationByTokenHash(tokenHash: string): Promise<CaregiverInvitation | null>;

  /**
   * Create caregiver invitation
   */
  createInvitation(invitation: CaregiverInvitation): Promise<CaregiverInvitation>;

  /**
   * Update invitation status
   */
  updateInvitation(invitation: CaregiverInvitation): Promise<CaregiverInvitation>;

  /**
   * Find active care relationship between patient and caregiver
   */
  findRelationship(patientId: string, caregiverUserId: string): Promise<CareRelationship | null>;

  /**
   * List active caregiver relations for a patient
   */
  listPatientRelationships(patientId: string): Promise<CareRelationship[]>;

  /**
   * List caregiver relations for a caregiver user
   */
  listCaregiverRelationships(caregiverUserId: string): Promise<CareRelationship[]>;

  /**
   * Create or activate relationship (e.g. upon invite acceptance)
   */
  createRelationship(relationship: CareRelationship): Promise<CareRelationship>;

  /**
   * Update relationship status/details
   */
  updateRelationship(relationship: CareRelationship): Promise<CareRelationship>;

  /**
   * Soft delete a relationship
   */
  softDeleteRelationship(id: string, deletedBy?: string): Promise<void>;
}
