import { Injectable, Logger } from '@nestjs/common';

export interface MedNotificationJob {
  id: string;
  occurrenceId: string;
  medicationId: string;
  patientId: string;
  scheduledTime: string;
  status: 'pending' | 'sent' | 'cancelled' | 'failed';
  channels: ('in_app' | 'web_push')[];
  privacyLevel: 'minimal' | 'summary' | 'full';
  retryCount: number;
}

export interface CaregiverEscalation {
  id: string;
  occurrenceId: string;
  medicationId: string;
  patientId: string;
  caregiverUserId: string;
  triggeredAt: string;
  reason: string;
}

@Injectable()
export class MedicationNotificationService {
  private readonly logger = new Logger(MedicationNotificationService.name);
  private notifications: Map<string, MedNotificationJob> = new Map();
  private escalations: CaregiverEscalation[] = [];
  private gracePeriodMinutes = 15;

  /**
   * Schedule an idempotent medication notification.
   * Same occurrenceId creates only one logical notification.
   */
  async scheduleMedNotification(
    occurrenceId: string,
    medicationId: string,
    patientId: string,
    scheduledTime: string,
    pushSupported: boolean,
    privacyLevel: 'minimal' | 'summary' | 'full'
  ): Promise<MedNotificationJob> {
    // Idempotency: same occurrenceId = one notification
    const existing = Array.from(this.notifications.values()).find(
      n => n.occurrenceId === occurrenceId
    );
    if (existing) {
      return existing;
    }

    const id = `notif-${occurrenceId}`;
    const job: MedNotificationJob = {
      id,
      occurrenceId,
      medicationId,
      patientId,
      scheduledTime,
      status: 'pending',
      channels: pushSupported ? ['in_app', 'web_push'] : ['in_app'],
      privacyLevel,
      retryCount: 0,
    };

    this.notifications.set(id, job);
    return job;
  }

  /**
   * Cancel future jobs for a medication (when paused/stopped).
   */
  async cancelFutureForMedication(medicationId: string): Promise<number> {
    let cancelled = 0;
    for (const [id, job] of this.notifications) {
      if (job.medicationId === medicationId && job.status === 'pending') {
        job.status = 'cancelled';
        this.notifications.set(id, job);
        cancelled++;
      }
    }
    return cancelled;
  }

  /**
   * Transition unanswered event after grace period, triggering escalation.
   * Escalation only fires if caregiver has the required scope.
   */
  async runEscalationCheck(
    occurrenceId: string,
    medicationId: string,
    patientId: string,
    caregiverUserIds: string[],
    caregiverScopes: Map<string, string[]>
  ): Promise<CaregiverEscalation[]> {
    const triggered: CaregiverEscalation[] = [];

    for (const caregiverId of caregiverUserIds) {
      const scopes = caregiverScopes.get(caregiverId) || [];
      const allowed = scopes.includes('medication.read') || scopes.includes('*');

      if (!allowed) {
        this.logger.warn(`Caregiver ${caregiverId} lacks permission for medication escalation`);
        continue;
      }

      const esc: CaregiverEscalation = {
        id: `esc-${occurrenceId}-${caregiverId}`,
        occurrenceId,
        medicationId,
        patientId,
        caregiverUserId: caregiverId,
        triggeredAt: new Date().toISOString(),
        reason: `Missed medication grace period of ${this.gracePeriodMinutes}min elapsed`,
      };
      this.escalations.push(esc);
      triggered.push(esc);
    }

    return triggered;
  }

  getGracePeriodMinutes(): number {
    return this.gracePeriodMinutes;
  }

  setGracePeriodMinutes(minutes: number) {
    this.gracePeriodMinutes = minutes;
  }

  listNotifications(): MedNotificationJob[] {
    return Array.from(this.notifications.values());
  }

  listEscalations(): CaregiverEscalation[] {
    return this.escalations;
  }
}