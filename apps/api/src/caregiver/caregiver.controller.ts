import { Controller, Get, Post, Body, Param, Req, UseGuards } from '@nestjs/common';
import { CaregiverService } from './caregiver.service';
import { FirebaseAuthGuard } from '../auth/guards/firebase-auth.guard';

@Controller('caregivers')
@UseGuards(FirebaseAuthGuard)
export class CaregiverController {
  constructor(private caregiverService: CaregiverService) {}

  /**
   * Create caregiver invitation.
   */
  @Post('invite')
  async createInvitation(
    @Req() req: any,
    @Body() body: {
      patientId: string;
      patientName: string;
      inviteeEmail: string;
      role: 'primary' | 'backup' | 'viewer';
      scopes: string[];
    },
  ) {
    const { invite, token } = await this.caregiverService.createInvitation({
      ...body,
      invitedByUserId: req.user.uid,
    });

    return {
      data: { invite, token },
      meta: { serverTime: new Date().toISOString() },
      error: null,
    };
  }

  /**
   * Accept invitation by token.
   */
  @Post('accept')
  async acceptInvitation(
    @Req() req: any,
    @Body() body: { token: string; caregiverName: string },
  ) {
    const relationship = await this.caregiverService.acceptInvitation(
      body.token,
      req.user.uid,
      body.caregiverName,
    );

    return {
      data: relationship,
      meta: { serverTime: new Date().toISOString() },
      error: null,
    };
  }

  /**
   * Get relationships for a patient.
   */
  @Get('patient/:patientId')
  async getPatientRelationships(@Param('patientId') patientId: string) {
    const relationships = await this.caregiverService.getPatientRelationships(patientId);
    return {
      data: { relationships },
      meta: { serverTime: new Date().toISOString() },
      error: null,
    };
  }

  /**
   * Revoke caregiver relationship.
   */
  @Post(':relationshipId/revoke')
  async revokeRelationship(@Param('relationshipId') relationshipId: string, @Req() req: any) {
    await this.caregiverService.revokeRelationship(relationshipId, req.user.uid);
    return {
      data: { success: true },
      meta: { serverTime: new Date().toISOString() },
      error: null,
    };
  }

  /**
   * Suspend caregiver relationship.
   */
  @Post(':relationshipId/suspend')
  async suspendRelationship(@Param('relationshipId') relationshipId: string) {
    const rel = await this.caregiverService.suspendRelationship(relationshipId);
    return {
      data: rel,
      meta: { serverTime: new Date().toISOString() },
      error: null,
    };
  }

  /**
   * Validate an invitation token (for verify step before accept).
   */
  @Get('validate-token/:token')
  async validateToken(@Param('token') token: string) {
    const result = await this.caregiverService.validateToken(token);
    return {
      data: result,
      meta: { serverTime: new Date().toISOString() },
      error: null,
    };
  }
}
