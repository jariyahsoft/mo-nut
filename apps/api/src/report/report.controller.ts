import { Controller, Get, Post, Body, Param, Req, UseGuards, NotFoundException } from '@nestjs/common';
import { ReportService } from './report.service';
import { FirebaseAuthGuard } from '../auth/guards/firebase-auth.guard';

@Controller('reports')
@UseGuards(FirebaseAuthGuard)
export class ReportController {
  constructor(private reportService: ReportService) {}

  /**
   * Create async PDF report
   */
  @Post()
  async createReport(@Req() req: any, @Body() body: any) {
    const job = await this.reportService.createReport({
      patientId: body.patientId || req.user.uid,
      requestedBy: req.user.uid,
      periodFrom: body.periodFrom,
      periodTo: body.periodTo,
      scopes: body.scopes || [],
    });
    return { data: job, meta: { serverTime: new Date().toISOString() }, error: null };
  }

  /**
   * Get report status
   */
  @Get(':id')
  async getReport(@Param('id') id: string) {
    const report = await this.reportService.getReport(id);
    if (!report) throw new NotFoundException(`Report ${id} not found`);
    return { data: report, meta: { serverTime: new Date().toISOString() }, error: null };
  }

  /**
   * List patient reports
   */
  @Get('patient/:patientId')
  async listPatientReports(@Param('patientId') patientId: string) {
    const reports = await this.reportService.listPatientReports(patientId);
    return { data: { reports }, meta: { serverTime: new Date().toISOString() }, error: null };
  }

  /**
   * Retry failed report
   */
  @Post(':id/retry')
  async retry(@Param('id') id: string) {
    const report = await this.reportService.retryReport(id);
    return { data: report, meta: { serverTime: new Date().toISOString() }, error: null };
  }

  /**
   * Create secure share link (returns plaintext token once)
   */
  @Post('share-links')
  async createShareLink(
    @Req() req: any,
    @Body() body: { ownerId: string; scopes: string[]; expiryHours: number; maxUses?: number }
  ) {
    const result = await this.reportService.createShareLink(
      body.ownerId || req.user.uid,
      body.scopes || [],
      body.expiryHours || 24,
      body.maxUses
    );
    return {
      data: result.link,
      meta: {
        serverTime: new Date().toISOString(),
        // Plaintext token returned only in this response (audit logged)
        shareToken: result.plaintextToken,
      },
      error: null,
    };
  }

  /**
   * Revoke share link
   */
  @Post('share-links/:id/revoke')
  async revokeShareLink(@Req() req: any, @Param('id') id: string) {
    const link = await this.reportService.revokeShareLink(id, req.user.uid);
    return { data: link, meta: { serverTime: new Date().toISOString() }, error: null };
  }

  /**
   * List owner's share links
   */
  @Get('share-links/owner/:ownerId')
  async listOwnerLinks(@Param('ownerId') ownerId: string) {
    const links = await this.reportService.listOwnerLinks(ownerId);
    return { data: { links }, meta: { serverTime: new Date().toISOString() }, error: null };
  }

  /**
   * Public access endpoint (validates token without auth)
   * Note: in production this would be a separate public route
   */
  @Post('share-links/access')
  async access(@Body() body: { token: string }) {
    const link = await this.reportService.accessShareLink(body.token);
    if (!link) {
      return {
        data: null,
        meta: { serverTime: new Date().toISOString() },
        error: { code: 'INVALID_TOKEN', message: 'Share link is invalid, expired, or revoked' },
      };
    }
    return {
      data: { scopes: link.scopes, useCount: link.useCount },
      meta: { serverTime: new Date().toISOString() },
      error: null,
    };
  }
}