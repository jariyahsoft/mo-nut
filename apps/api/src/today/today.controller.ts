import { Controller, Get, Param, Req, UseGuards } from '@nestjs/common';
import { TodayService } from './today.service';
import { FirebaseAuthGuard } from '../auth/guards/firebase-auth.guard';
import { CaregiverAuthorizationGuard } from '../caregiver/guards/caregiver-authorization.guard';

@Controller('today')
@UseGuards(FirebaseAuthGuard)
export class TodayController {
  constructor(private todayService: TodayService) {}

  /**
   * Get today's dashboard for the current user (or specific patient if caregiver)
   */
  @Get('me')
  async getMyDashboard(@Req() req: any) {
    const data = await this.todayService.aggregate(req.user.uid);
    return {
      data,
      meta: { serverTime: new Date().toISOString() },
      error: null,
    };
  }

  /**
   * Get dashboard for a specific patient (caregiver context)
   */
  @Get('patient/:patientId')
  @UseGuards(CaregiverAuthorizationGuard)
  async getPatientDashboard(@Param('patientId') patientId: string) {
    const data = await this.todayService.aggregate(patientId);
    return {
      data,
      meta: { serverTime: new Date().toISOString() },
      error: null,
    };
  }
}