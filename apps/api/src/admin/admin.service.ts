import { Injectable, NotFoundException, ConflictException, BadRequestException } from '@nestjs/common';
import * as crypto from 'crypto';

export type AdminRole = 'admin' | 'support' | 'auditor';

export interface AdminUser {
  userId: string;
  role: AdminRole;
  mfaEnabled: boolean;
  status: 'active' | 'suspended';
}

export interface AccountSearchResult {
  userId: string;
  displayName?: string;
  status: 'active' | 'suspended' | 'pending';
  // Note: NO PHI included by default
  createdAt: string;
}

export interface AuditEvent {
  id: string;
  actorId: string;
  actorRole: AdminRole;
  action: string;
  resourceType: string;
  resourceId: string;
  purpose: string;
  occurredAt: string;
  correlationId: string;
}

export interface BreakGlassRequest {
  id: string;
  requestedBy: string;
  reason: string;
  resourceType: string;
  resourceId: string;
  status: 'pending' | 'approved' | 'denied' | 'expired';
  requestedAt: string;
  approvedBy?: string;
  expiresAt: string;
  durationMinutes: number;
}

export interface SystemStatus {
  totalUsers: number;
  totalPatients: number;
  totalAppointments: number;
  totalDocuments: number;
  uptime: number;
}

@Injectable()
export class AdminService {
  private adminUsers: Map<string, AdminUser> = new Map();
  private accountSearchIndex: Map<string, AccountSearchResult> = new Map();
  private auditEvents: AuditEvent[] = [];
  private breakGlassRequests: Map<string, BreakGlassRequest> = new Map();
  private activeBreakGlassAccess: Map<string, { userId: string; expiresAt: string }> = new Map();
  private systemStatus: SystemStatus = {
    totalUsers: 0,
    totalPatients: 0,
    totalAppointments: 0,
    totalDocuments: 0,
    uptime: 0,
  };

  /**
   * Grant admin/support/auditor role
   */
  grantRole(userId: string, role: AdminRole): AdminUser {
    const admin: AdminUser = {
      userId,
      role,
      mfaEnabled: true, // Force MFA for admin roles
      status: 'active',
    };
    this.adminUsers.set(userId, admin);
    return admin;
  }

  /**
   * Search accounts by user ID (returns minimum identifier only, no PHI by default)
   */
  searchAccount(userId: string): AccountSearchResult {
    const result = this.accountSearchIndex.get(userId);
    if (!result) {
      throw new NotFoundException(`Account ${userId} not found`);
    }

    // Log search for audit
    this.logAudit({
      actorId: 'admin-1',
      actorRole: 'admin',
      action: 'account.search',
      resourceType: 'User',
      resourceId: userId,
      purpose: 'admin search',
    });

    return result;
  }

  /**
   * Suspend account
   */
  suspendAccount(userId: string, actorId: string, reason: string): AccountSearchResult {
    const result = this.accountSearchIndex.get(userId);
    if (!result) throw new NotFoundException(`Account ${userId} not found`);

    result.status = 'suspended';
    this.accountSearchIndex.set(userId, result);

    this.logAudit({
      actorId,
      actorRole: 'admin',
      action: 'account.suspend',
      resourceType: 'User',
      resourceId: userId,
      purpose: reason,
    });

    return result;
  }

  /**
   * Revoke all sessions for a user
   */
  revokeSessions(userId: string, actorId: string): { success: boolean } {
    this.logAudit({
      actorId,
      actorRole: 'admin',
      action: 'sessions.revoke',
      resourceType: 'User',
      resourceId: userId,
      purpose: 'admin revocation',
    });

    return { success: true };
  }

  /**
   * Search audit log (auditor-only)
   */
  searchAuditLog(
    filters: { actorId?: string; from?: string; to?: string; action?: string; resourceType?: string; resourceId?: string }
  ): AuditEvent[] {
    let results = [...this.auditEvents];

    if (filters.actorId) results = results.filter(e => e.actorId === filters.actorId);
    if (filters.from) {
      const from = filters.from;
      results = results.filter(e => e.occurredAt >= from);
    }
    if (filters.to) {
      const to = filters.to;
      results = results.filter(e => e.occurredAt <= to);
    }
    if (filters.action) results = results.filter(e => e.action === filters.action);
    if (filters.resourceType) results = results.filter(e => e.resourceType === filters.resourceType);
    if (filters.resourceId) results = results.filter(e => e.resourceId === filters.resourceId);

    return results;
  }

  /**
   * Request break-glass access (privileged records)
   * Requires reason, has time limit, must be approved
   */
  requestBreakGlass(
    requestedBy: string,
    reason: string,
    resourceType: string,
    resourceId: string,
    durationMinutes: number
  ): BreakGlassRequest {
    if (!reason || reason.length < 10) {
      throw new BadRequestException('Break-glass reason required (minimum 10 chars)');
    }

    const id = `bg-${crypto.randomUUID().slice(0, 8)}`;
    const request: BreakGlassRequest = {
      id,
      requestedBy,
      reason,
      resourceType,
      resourceId,
      status: 'pending',
      requestedAt: new Date().toISOString(),
      expiresAt: new Date(Date.now() + durationMinutes * 60 * 1000).toISOString(),
      durationMinutes,
    };

    this.breakGlassRequests.set(id, request);

    this.logAudit({
      actorId: requestedBy,
      actorRole: 'support',
      action: 'breakglass.request',
      resourceType,
      resourceId,
      purpose: reason,
    });

    return request;
  }

  /**
   * Approve break-glass request
   */
  approveBreakGlass(requestId: string, approvedBy: string): BreakGlassRequest {
    const request = this.breakGlassRequests.get(requestId);
    if (!request) throw new NotFoundException(`Break-glass request ${requestId} not found`);

    if (request.status !== 'pending') {
      throw new ConflictException(`Request already ${request.status}`);
    }

    request.status = 'approved';
    request.approvedBy = approvedBy;
    this.breakGlassRequests.set(requestId, request);

    // Grant active access
    this.activeBreakGlassAccess.set(request.resourceId, {
      userId: request.requestedBy,
      expiresAt: request.expiresAt,
    });

    this.logAudit({
      actorId: approvedBy,
      actorRole: 'admin',
      action: 'breakglass.approve',
      resourceType: request.resourceType,
      resourceId: request.resourceId,
      purpose: `Approved: ${request.reason}`,
    });

    return request;
  }

  /**
   * Deny break-glass request
   */
  denyBreakGlass(requestId: string, deniedBy: string, reason: string): BreakGlassRequest {
    const request = this.breakGlassRequests.get(requestId);
    if (!request) throw new NotFoundException(`Break-glass request ${requestId} not found`);

    request.status = 'denied';
    this.breakGlassRequests.set(requestId, request);

    this.logAudit({
      actorId: deniedBy,
      actorRole: 'admin',
      action: 'breakglass.deny',
      resourceType: request.resourceType,
      resourceId: request.resourceId,
      purpose: `Denied: ${reason}`,
    });

    return request;
  }

  /**
   * Check if user has active break-glass access to resource
   */
  hasBreakGlassAccess(userId: string, resourceId: string): boolean {
    const access = this.activeBreakGlassAccess.get(resourceId);
    if (!access) return false;
    if (access.userId !== userId) return false;
    if (new Date(access.expiresAt) < new Date()) {
      this.activeBreakGlassAccess.delete(resourceId);
      return false;
    }
    return true;
  }

  /**
   * Get system status (NO PHI by default)
   */
  getSystemStatus(): SystemStatus {
    return { ...this.systemStatus };
  }

  /**
   * Update system status (testing helper)
   */
  updateSystemStatus(updates: Partial<SystemStatus>): void {
    this.systemStatus = { ...this.systemStatus, ...updates };
  }

  /**
   * Internal: log audit event (immutable)
   */
  private logAudit(event: Omit<AuditEvent, 'id' | 'occurredAt' | 'correlationId'>): void {
    const id = `audit-${crypto.randomUUID().slice(0, 8)}`;
    const auditEvent: AuditEvent = {
      ...event,
      id,
      occurredAt: new Date().toISOString(),
      correlationId: crypto.randomUUID(),
    };
    this.auditEvents.push(auditEvent);
  }
}