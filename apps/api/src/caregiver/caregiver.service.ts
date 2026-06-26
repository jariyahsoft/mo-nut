import { Injectable, ConflictException, NotFoundException, ForbiddenException } from '@nestjs/common';
import * as crypto from 'crypto';

export interface CaregiverInvite {
  id: string;
  patientId: string;
  patientName: string;
  inviteeEmail: string;
  role: 'primary' | 'backup' | 'viewer';
  scopes: string[];
  tokenHash: string;
  expiresAt: string;
  status: 'pending' | 'accepted' | 'declined' | 'expired' | 'revoked';
  invitedByUserId: string;
  createdAt: string;
}

export interface CaregiverRelationship {
  id: string;
  patientId: string;
  caregiverUserId: string;
  caregiverName: string;
  role: 'primary' | 'backup' | 'viewer';
  scopes: string[];
  status: 'active' | 'suspended' | 'revoked';
  expiresAt?: string;
  createdAt: string;
}

@Injectable()
export class CaregiverService {
  private invitations: Map<string, CaregiverInvite> = new Map();
  private relationships: Map<string, CaregiverRelationship> = new Map();
  private auditLog: any[] = [];

  /**
   * Create caregiver invitation.
   */
  async createInvitation(params: {
    patientId: string;
    patientName: string;
    inviteeEmail: string;
    role: 'primary' | 'backup' | 'viewer';
    scopes: string[];
    invitedByUserId: string;
  }): Promise<{ invite: CaregiverInvite; token: string }> {
    // Duplicate prevention: check for pending invite to same email
    const existing = Array.from(this.invitations.values()).find(
      (i) => i.patientId === params.patientId && i.inviteeEmail === params.inviteeEmail && i.status === 'pending'
    );
    if (existing) {
      throw new ConflictException('มีคำเชิญที่รอยืนยันอยู่แล้ว / Pending invitation already exists');
    }

    // Check for existing active relationship
    const activeRel = Array.from(this.relationships.values()).find(
      (r) => r.patientId === params.patientId && r.caregiverUserId === params.inviteeEmail && r.status === 'active'
    );
    if (activeRel) {
      throw new ConflictException('ผู้ดูแลนี้มีความสัมพันธ์ที่ active อยู่แล้ว / Active relationship already exists');
    }

    const id = `inv-${crypto.randomUUID().slice(0, 8)}`;
    const plainToken = crypto.randomBytes(32).toString('hex');
    const tokenHash = crypto.createHash('sha256').update(plainToken).digest('hex');

    const invite: CaregiverInvite = {
      id,
      patientId: params.patientId,
      patientName: params.patientName,
      inviteeEmail: params.inviteeEmail,
      role: params.role,
      scopes: params.scopes,
      tokenHash,
      expiresAt: new Date(Date.now() + 7 * 24 * 3600000).toISOString(), // 7 days
      status: 'pending',
      invitedByUserId: params.invitedByUserId,
      createdAt: new Date().toISOString(),
    };

    this.invitations.set(id, invite);
    this.auditLog.push({ action: 'caregiver.invite', inviteId: id, ...params, timestamp: new Date().toISOString() });

    // Return plain token once — never stored
    return { invite, token: plainToken };
  }

  /**
   * Accept invitation by token (one-time acceptance).
   */
  async acceptInvitation(token: string, caregiverUserId: string, caregiverName: string): Promise<CaregiverRelationship> {
    const tokenHash = crypto.createHash('sha256').update(token).digest('hex');
    const invite = Array.from(this.invitations.values()).find((i) => i.tokenHash === tokenHash);

    if (!invite) {
      throw new NotFoundException('คำเชิญไม่ถูกต้อง / Invalid invitation');
    }

    if (invite.status !== 'pending') {
      throw new ConflictException(`คำเชิญถูกใช้งานแล้ว (${invite.status}) / Invitation already ${invite.status}`);
    }

    if (new Date(invite.expiresAt) < new Date()) {
      invite.status = 'expired';
      this.invitations.set(invite.id, invite);
      throw new ConflictException('คำเชิญหมดอายุแล้ว / Invitation expired');
    }

    // Mark invite as accepted
    invite.status = 'accepted';
    this.invitations.set(invite.id, invite);

    // Create relationship
    const rel: CaregiverRelationship = {
      id: `rel-${crypto.randomUUID().slice(0, 8)}`,
      patientId: invite.patientId,
      caregiverUserId,
      caregiverName,
      role: invite.role,
      scopes: invite.scopes,
      status: 'active',
      expiresAt: invite.expiresAt,
      createdAt: new Date().toISOString(),
    };

    this.relationships.set(rel.id, rel);

    // Enforce single active primary
    if (rel.role === 'primary') {
      const existingPrimary = Array.from(this.relationships.values()).find(
        (r) => r.patientId === invite.patientId && r.role === 'primary' && r.status === 'active' && r.id !== rel.id
      );
      if (existingPrimary) {
        existingPrimary.status = 'suspended';
        this.relationships.set(existingPrimary.id, existingPrimary);
      }
    }

    this.auditLog.push({ action: 'caregiver.accept', inviteId: invite.id, relationshipId: rel.id, timestamp: new Date().toISOString() });

    return rel;
  }

  /**
   * Revoke a caregiver relationship immediately.
   */
  async revokeRelationship(relationshipId: string, revokedByUserId: string): Promise<void> {
    const rel = this.relationships.get(relationshipId);
    if (!rel) {
      throw new NotFoundException('ไม่พบความสัมพันธ์ / Relationship not found');
    }

    rel.status = 'revoked';
    this.relationships.set(relationshipId, rel);

    this.auditLog.push({ action: 'caregiver.revoke', relationshipId, revokedByUserId, timestamp: new Date().toISOString() });
  }

  /**
   * Suspend a caregiver relationship temporarily.
   */
  async suspendRelationship(relationshipId: string): Promise<CaregiverRelationship> {
    const rel = this.relationships.get(relationshipId);
    if (!rel) throw new NotFoundException('ไม่พบความสัมพันธ์ / Relationship not found');

    rel.status = 'suspended';
    this.relationships.set(relationshipId, rel);
    return rel;
  }

  /**
   * Get relationships for a patient.
   */
  async getPatientRelationships(patientId: string): Promise<CaregiverRelationship[]> {
    return Array.from(this.relationships.values()).filter(
      (r) => r.patientId === patientId
    );
  }

  /**
   * Check if a caregiver is authorized for a specific action on a specific patient.
   * This is the central authorization check used by the guard.
   */
  async checkAuthorization(
    caregiverUserId: string,
    patientId: string,
    requiredScope: string,
  ): Promise<{ authorized: boolean; reason?: string }> {
    const rel = Array.from(this.relationships.values()).find(
      (r) => r.caregiverUserId === caregiverUserId && r.patientId === patientId && r.status === 'active'
    );

    if (!rel) {
      return { authorized: false, reason: 'No active caregiver relationship' };
    }

    const hasScope = rel.scopes.includes(requiredScope) || rel.scopes.includes('*');
    if (!hasScope) {
      return { authorized: false, reason: `Scope ${requiredScope} not granted` };
    }

    return { authorized: true };
  }

  /**
   * Validate that a replayed/expired invite token cannot be reused.
   */
  async validateToken(token: string): Promise<{ valid: boolean; invite?: CaregiverInvite }> {
    const tokenHash = crypto.createHash('sha256').update(token).digest('hex');
    const invite = Array.from(this.invitations.values()).find((i) => i.tokenHash === tokenHash);

    if (!invite) return { valid: false };
    if (invite.status !== 'pending') return { valid: false, invite };
    if (new Date(invite.expiresAt) < new Date()) return { valid: false, invite };

    return { valid: true, invite };
  }
}
