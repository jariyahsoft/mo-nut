import { Controller, Post, Body, Req, UseGuards } from '@nestjs/common';
import { MedicationNotificationService } from './medication-notification.service';
import { FirebaseAuthGuard } from '../auth/guards/firebase-auth.guard';

@Controller('medication-notifications')
@UseGuards(FirebaseAuthGuard)
export class MedicationNotificationController {
  constructor(private medNotificationService: MedicationNotificationService) {}

  /**
   * Schedule a notification (idempotent per occurrenceId).
   */
  @Post('schedule')
  async schedule(
    @Req() req: any,
    @Body() body: {
      occurrenceId: string;
      medicationId: string;
      patientId: string;
      scheduledTime: string;
      pushSupported?: boolean;
      privacyLevel?: 'minimal' | 'summary' | 'full';
    }
  ) {
    const job = await this.medNotificationService.scheduleMedNotification(
      body.occurrenceId,
      body.medicationId,
      body.patientId,
      body.scheduledTime,
      body.pushSupported ?? false,
      body.privacyLevel ?? 'summary'
    );

    return {
      data: job,
      meta: { serverTime: new Date().toISOString() },
      error: null,
    };
  }

  /**
   * Cancel future notifications for a medication (paused/stopped).
   */
  @Post('cancel-future')
  async cancelFuture(@Body() body: { medicationId: string }) {
    const cancelled = await this.medNotificationService.cancelFutureForMedication(body.medicationId);
    return {
      data: { cancelled },
      meta: { serverTime: new Date().toISOString() },
      error: null,
    };
  }

  /**
   * Run escalation check (would normally be a scheduled job).
   */
  @Post('escalate')
  async escalate(@Body() body: {
    occurrenceId: string;
    medicationId: string;
    patientId: string;
    caregiverUserIds: string[];
    caregiverScopes: Record<string, string[]>;
  }) {
    const scopesMap = new Map(Object.entries(body.caregiverScopes));
    const triggered = await this.medNotificationService.runEscalationCheck(
      body.occurrenceId,
      body.medicationId,
      body.patientId,
      body.caregiverUserIds,
      scopesMap
    );

    return {
      data: { triggered },
      meta: { serverTime: new Date().toISOString() },
      error: null,
    };
  }
}