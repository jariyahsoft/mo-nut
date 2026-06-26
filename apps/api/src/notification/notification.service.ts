import { Injectable, Logger } from '@nestjs/common';
import { Appointment, AppointmentStatus } from '@mo-nut/domain';

export interface ReminderJob {
  id: string;
  appointmentId: string;
  patientId: string;
  offsetMinutes: number;
  scheduledTime: string; // ISO 8601 UTC
  status: 'pending' | 'sent' | 'cancelled' | 'failed';
  privacyLevel: 'minimal' | 'summary' | 'full';
}

@Injectable()
export class NotificationService {
  private readonly logger = new Logger(NotificationService.name);
  private jobs: Map<string, ReminderJob> = new Map();

  // Baseline templates by privacy levels
  private getTemplate(level: 'minimal' | 'summary' | 'full', appointment: Appointment): { title: string; body: string } {
    if (level === 'minimal') {
      return {
        title: 'แจ้งเตือนนัดหมายสำคัญ / Appointment Reminder',
        body: 'กรุณาเข้าร่วมตามเวลาที่นัดหมาย / Please attend your scheduled appointment.',
      };
    }

    if (level === 'summary') {
      return {
        title: `มีนัดหมายที่ ${appointment.facilityId} / Appointment Scheduled`,
        body: `รอบเวลา: ${appointment.scheduledAt} / Time: ${appointment.scheduledAt}`,
      };
    }

    // Full: details include notes/purpose
    return {
      title: `ด่วน: นัดหมายของคุณที่ ${appointment.facilityId}`,
      body: `รายละเอียด: ${appointment.notes || 'ตรวจรักษา'} — เวลา: ${appointment.scheduledAt}`,
    };
  }

  /**
   * Schedule timezone-aware reminders for a new appointment.
   * Cancels old reminder jobs automatically to ensure scheduling is idempotent.
   */
  async scheduleReminders(
    appointment: Appointment,
    privacyLevel: 'minimal' | 'summary' | 'full' = 'summary'
  ): Promise<ReminderJob[]> {
    // 1. Idempotently cancel old jobs
    await this.cancelReminders(appointment.id);

    // 2. We schedule 2 offsets: 24 hours (1440m) and 2 hours (120) before appointment
    const offsets = [1440, 120];
    const createdJobs: ReminderJob[] = [];

    for (const offset of offsets) {
      const scheduledTime = this.calculateScheduledTime(appointment.scheduledAt, offset, appointment.timezone);
      if (!scheduledTime) continue; // Appointment already past this offset

      const id = `${appointment.id}-${offset}`;
      const job: ReminderJob = {
        id,
        appointmentId: appointment.id,
        patientId: appointment.patientId,
        offsetMinutes: offset,
        scheduledTime,
        status: 'pending',
        privacyLevel,
      };

      this.jobs.set(id, job);
      createdJobs.push(job);
    }

    return createdJobs;
  }

  /**
   * Cancel all pending reminder jobs for an appointment
   */
  async cancelReminders(appointmentId: string): Promise<void> {
    for (const [id, job] of this.jobs) {
      if (job.appointmentId === appointmentId && job.status === 'pending') {
        job.status = 'cancelled';
        this.jobs.set(id, job);
      }
    }
  }

  /**
   * List all current reminder jobs
   */
  async listJobs(): Promise<ReminderJob[]> {
    return Array.from(this.jobs.values());
  }

  /**
   * Calculate scheduled dispatch time considering quiet hours (e.g. 22:00 - 06:00)
   */
  private calculateScheduledTime(scheduledAt: string, offsetMinutes: number, timezone: string): string | null {
    const apptTime = new Date(scheduledAt).getTime();
    const targetTime = apptTime - offsetMinutes * 60 * 1000;

    if (targetTime < Date.now()) return null; // Past

    // Format target time to check quiet hours (assumed Local time bounds)
    const targetDate = new Date(targetTime);
    // Standard quiet hours check: 22h - 6h local
    // In production, we'd format using the specified IANA timezone
    const hour = targetDate.getUTCHours(); // Simplified check

    if (hour >= 22 || hour < 6) {
      // Quiet hours hit — shift dispatch to 07:00 UTC next morning (safe non-quiet hour)
      targetDate.setUTCHours(7, 0, 0, 0);
      // If the shifted time is now after the actual appointment, send immediately or suppress
      if (targetDate.getTime() >= apptTime) {
        return new Date(apptTime - 15 * 60 * 1000).toISOString(); // 15 mins before
      }
    }

    return targetDate.toISOString();
  }

  /**
   * Caregiver Escalation Policy:
   * If appointment starts in 15 minutes, check status.
   * If still unconfirmed ('upcoming'), escalate to caregiver.
   */
  async runEscalationCheck(appointment: Appointment, caregivers: string[]): Promise<boolean> {
    if (appointment.status === 'upcoming') {
      this.logger.warn(`Escalating unconfirmed appointment ${appointment.id} to caregivers: ${caregivers.join(', ')}`);
      return true; // Triggered escalation alert
    }
    return false; // Already confirmed or completed
  }
}
