import { Controller, Get, Post, Body, Param, Query, Req, UseGuards, NotFoundException } from '@nestjs/common';
import { AdminService, AdminRole } from './admin.service';
import { FirebaseAuthGuard } from '../auth/guards/firebase-auth.guard';

@Controller('admin')
@UseGuards(FirebaseAuthGuard)
export class AdminController {
  constructor(private adminService: AdminService) {}

  /**
   * Search account by user ID (returns minimum identifier, no PHI)
   */
  @Get('accounts/:userId')
  async searchAccount(@Param('userId') userId: string) {
    const result = this.adminService.searchAccount(userId);
    return { data: result, meta: { serverTime: new Date().toISOString() }, error: null };
  }

  /**
   * Suspend account
   */
  @Post('accounts/:userId/suspend')
  async suspendAccount(
    @Req() req: any,
    @Param('userId') userId: string,
    @Body() body: { reason: string }
  ) {
    const result = this.adminService.suspendAccount(userId, req.user.uid, body.reason);
    return { data: result, meta: { serverTime: new Date().toISOString() }, error: null };
  }

  /**
   * Revoke all user sessions
   */
  @Post('accounts/:userId/revoke-sessions')
  async revokeSessions(@Req() req: any, @Param('userId') userId: string) {
    const result = this.adminService.revokeSessions(userId, req.user.uid);
    return { data: result, meta: { serverTime: new Date().toISOString() }, error: null };
  }

  /**
   * System status (no PHI)
   */
  @Get('status')
  async systemStatus() {
    const status = this.adminService.getSystemStatus();
    return { data: status, meta: { serverTime: new Date().toISOString() }, error: null };
  }

  /**
   * Auditor-only: search audit log
   */
  @Get('audit-log')
  async searchAuditLog(
    @Query('actorId') actorId?: string,
    @Query('from') from?: string,
    @Query('to') to?: string,
    @Query('action') action?: string,
    @Query('resourceType') resourceType?: string,
    @Query('resourceId') resourceId?: string
  ) {
    const filters: any = {};
    if (actorId) filters.actorId = actorId;
    if (from) filters.from = from;
    if (to) filters.to = to;
    if (action) filters.action = action;
    if (resourceType) filters.resourceType = resourceType;
    if (resourceId) filters.resourceId = resourceId;

    const events = this.adminService.searchAuditLog(filters);
    return { data: { events }, meta: { serverTime: new Date().toISOString() }, error: null };
  }
}

@Controller('support')
@UseGuards(FirebaseAuthGuard)
export class SupportController {
  constructor(private adminService: AdminService) {}

  /**
   * Request break-glass access (reason required, time-limited)
   */
  @Post('break-glass/request')
  async requestBreakGlass(
    @Req() req: any,
    @Body() body: { reason: string; resourceType: string; resourceId: string; durationMinutes: number }
  ) {
    const request = this.adminService.requestBreakGlass(
      req.user.uid,
      body.reason,
      body.resourceType,
      body.resourceId,
      body.durationMinutes
    );
    return { data: request, meta: { serverTime: new Date().toISOString() }, error: null };
  }

  /**
   * Approve break-glass
   */
  @Post('break-glass/:requestId/approve')
  async approveBreakGlass(@Req() req: any, @Param('requestId') requestId: string) {
    const request = this.adminService.approveBreakGlass(requestId, req.user.uid);
    return { data: request, meta: { serverTime: new Date().toISOString() }, error: null };
  }

  /**
   * Deny break-glass
   */
  @Post('break-glass/:requestId/deny')
  async denyBreakGlass(
    @Req() req: any,
    @Param('requestId') requestId: string,
    @Body() body: { reason: string }
  ) {
    const request = this.adminService.denyBreakGlass(requestId, req.user.uid, body.reason);
    return { data: request, meta: { serverTime: new Date().toISOString() }, error: null };
  }

  /**
   * Check active break-glass access
   */
  @Get('break-glass/access/:resourceId')
  async checkAccess(@Req() req: any, @Param('resourceId') resourceId: string) {
    const hasAccess = this.adminService.hasBreakGlassAccess(req.user.uid, resourceId);
    return { data: { hasAccess }, meta: { serverTime: new Date().toISOString() }, error: null };
  }
}