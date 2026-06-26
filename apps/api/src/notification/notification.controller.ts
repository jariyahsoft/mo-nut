import { Controller, Get, Post, Param, Body, Req, UseGuards, NotFoundException } from '@nestjs/common';
import { NotificationService } from './notification.service';
import { AppointmentService } from '../appointment/appointment.service';
import { CaregiverService } from '../caregiver/caregiver.service';
import { FirebaseAuthGuard } from '../auth/guards/firebase-auth.guard';

@Controller('notifications')
@UseGuards(FirebaseAuthGuard)
export class NotificationController {
  constructor(
    private notificationService: NotificationService,
    private appointmentService: AppointmentService,
    private caregiverService: CaregiverService
  ) {}

  /**
   * List scheduled reminder jobs
   */
  @Get('jobs')
  async listJobs() {
    const jobs = await this.notificationService.listJobs();
    return {
      data: { jobs },
      meta: { serverTime: new Date().toISOString() },
      error: null,
    };
  }

  /**
   * Trigger caregiver escalation for an unconfirmed appointment
   */
  @Post('appointments/:appointmentId/escalate')
  async triggerEscalation(@Param('appointmentId') apptId: string) {
    const appointment = await this.appointmentService.findById(apptId);
    if (!appointment) {
      throw new NotFoundException(`Appointment ${apptId} not found`);
    }

    const caregivers = await this.caregiverService.getPatientRelationships(appointment.patientId);
    const emails = caregivers
      .filter((c) => c.status === 'active')
      .map((c) => c.caregiverUserId);

    const triggered = await this.notificationService.runEscalationCheck(appointment, emails);

    return {
      data: { triggered, escalatedTo: emails },
      meta: { serverTime: new Date().toISOString() },
      error: null,
    };
  }
}
