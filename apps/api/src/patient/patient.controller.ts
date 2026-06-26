import { Controller, Get, Post, Patch, Body, Req, UseGuards } from '@nestjs/common';
import { PatientService } from './patient.service';
import { FirebaseAuthGuard } from '../auth/guards/firebase-auth.guard';

@Controller('patient')
@UseGuards(FirebaseAuthGuard)
export class PatientController {
  constructor(private patientService: PatientService) {}

  /**
   * Get patient profile.
   */
  @Get('profile')
  async getProfile(@Req() req: any) {
    const profile = await this.patientService.getProfile(req.user.uid);
    if (!profile) {
      return {
        data: null,
        meta: { serverTime: new Date().toISOString() },
        error: null,
      };
    }
    return {
      data: profile,
      meta: { serverTime: new Date().toISOString() },
      error: null,
    };
  }

  /**
   * Create or update patient profile.
   */
  @Post('profile')
  async upsertProfile(@Req() req: any, @Body() body: any) {
    const profile = await this.patientService.upsertProfile({
      userId: req.user.uid,
      patientId: `pat-${req.user.uid}`,
      ...body,
    });
    return {
      data: profile,
      meta: { serverTime: new Date().toISOString() },
      error: null,
    };
  }

  /**
   * Request account data export.
   */
  @Post('data-export')
  async requestExport(@Req() req: any) {
    const request = await this.patientService.requestDataExport(req.user.uid);
    return {
      data: request,
      meta: { serverTime: new Date().toISOString() },
      error: null,
    };
  }

  /**
   * Request account deletion (follows policy, no immediate purge).
   */
  @Post('deletion-request')
  async requestDeletion(@Req() req: any) {
    const request = await this.patientService.requestDeletion(req.user.uid);
    return {
      data: request,
      meta: { serverTime: new Date().toISOString() },
      error: null,
    };
  }
}
