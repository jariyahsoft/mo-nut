import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { ReportJob, ShareLink, ShareLinkAccess, initMetadata, updateMetadata } from '@mo-nut/domain';
import * as crypto from 'crypto';

export interface ReportRequest {
  patientId: string;
  requestedBy: string;
  periodFrom: string;
  periodTo: string;
  scopes: string[];
}

@Injectable()
export class ReportService {
  private reports: Map<string, ReportJob> = new Map();
  private shareLinks: Map<string, ShareLink> = new Map();
  private shareLinkAccesses: ShareLinkAccess[] = [];

  /**
   * Create asynchronous PDF report generation job.
   * Includes date range and section selection (scopes).
   */
  async createReport(req: ReportRequest): Promise<ReportJob> {
    const id = `rpt-${crypto.randomUUID().slice(0, 8)}`;
    const job: ReportJob = {
      ...initMetadata(req.requestedBy),
      patientId: req.patientId,
      requestedBy: req.requestedBy,
      periodFrom: req.periodFrom,
      periodTo: req.periodTo,
      scopes: req.scopes,
      status: 'pending',
      expiresAt: new Date(Date.now() + 7 * 24 * 3600000).toISOString(), // 7-day retention
    };

    this.reports.set(id, job);

    // Simulate async generation
    process.nextTick(() => this.runReportGeneration(id));

    return job;
  }

  /**
   * Simulate report generation
   */
  private async runReportGeneration(reportId: string) {
    const job = this.reports.get(reportId);
    if (!job) return;

    job.status = 'processing';
    this.reports.set(reportId, job);

    await new Promise(r => setTimeout(r, 100));

    job.status = 'ready';
    job.assetId = `asset-report-${reportId}`;
    job.version += 1;
    job.updatedAt = new Date().toISOString();
    this.reports.set(reportId, job);
  }

  /**
   * Get report job
   */
  async getReport(id: string): Promise<ReportJob | null> {
    return this.reports.get(id) || null;
  }

  /**
   * List patient reports
   */
  async listPatientReports(patientId: string): Promise<ReportJob[]> {
    return Array.from(this.reports.values()).filter(r => r.patientId === patientId);
  }

  /**
   * Retry report generation
   */
  async retryReport(id: string): Promise<ReportJob> {
    const job = this.reports.get(id);
    if (!job) throw new NotFoundException(`Report ${id} not found`);

    if (job.status === 'ready') return job;

    job.status = 'processing';
    job.version += 1;
    job.updatedAt = new Date().toISOString();
    this.reports.set(id, job);

    // Re-run
    process.nextTick(() => this.runReportGeneration(id));

    return job;
  }

  /**
   * Create secure share link with high-entropy token.
   * Only the SHA-256 hash is persisted, plaintext token returned once.
   */
  async createShareLink(
    ownerId: string,
    scopes: string[],
    expiryHours: number,
    maxUses?: number
  ): Promise<{ link: ShareLink; plaintextToken: string }> {
    const id = `share-${crypto.randomUUID().slice(0, 8)}`;
    const plaintextToken = crypto.randomBytes(32).toString('base64url');
    const tokenHash = crypto.createHash('sha256').update(plaintextToken).digest('hex');

    const link: ShareLink = {
      ...initMetadata(),
      ownerId,
      tokenHash,
      scopes,
      expiresAt: new Date(Date.now() + expiryHours * 3600000).toISOString(),
      useCount: 0,
      status: 'active',
    };

    if (maxUses) {
      link.maxUses = maxUses;
    }

    this.shareLinks.set(id, link);
    return { link, plaintextToken };
  }

  /**
   * Access share link with token (validates and increments use count)
   * Returns null if expired, revoked, or max uses exceeded (no PHI leak)
   */
  async accessShareLink(plaintextToken: string, ipAddress?: string, userAgent?: string): Promise<ShareLink | null> {
    const tokenHash = crypto.createHash('sha256').update(plaintextToken).digest('hex');
    const link = Array.from(this.shareLinks.values()).find(l => l.tokenHash === tokenHash);

    if (!link) return null;
    if (link.status === 'revoked' || link.status === 'expired') return null;
    if (new Date(link.expiresAt) < new Date()) {
      link.status = 'expired';
      this.shareLinks.set(link.id, link);
      return null;
    }
    if (link.maxUses && link.useCount >= link.maxUses) return null;

    link.useCount += 1;
    link.version += 1;
    link.updatedAt = new Date().toISOString();
    this.shareLinks.set(link.id, link);

    // Audit access (no PHI)
    const access: ShareLinkAccess = {
      ...initMetadata(),
      shareLinkId: link.id,
      accessedAt: new Date().toISOString(),
      ...(ipAddress ? { accessorIp: ipAddress } : {}),
      ...(userAgent ? { userAgent } : {}),
    };
    this.shareLinkAccesses.push(access);

    return link;
  }

  /**
   * Revoke share link
   */
  async revokeShareLink(id: string, actorId: string): Promise<ShareLink> {
    const link = this.shareLinks.get(id);
    if (!link) throw new NotFoundException(`Share link ${id} not found`);

    link.status = 'revoked';
    link.revokedAt = new Date().toISOString();
    link.revokedBy = actorId;
    link.version += 1;
    link.updatedAt = new Date().toISOString();
    this.shareLinks.set(id, link);
    return link;
  }

  /**
   * List share links for an owner
   */
  async listOwnerLinks(ownerId: string): Promise<ShareLink[]> {
    return Array.from(this.shareLinks.values()).filter(l => l.ownerId === ownerId);
  }
}