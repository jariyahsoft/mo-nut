import { Injectable } from '@nestjs/common';
import { MedicationSchedule, DoseOccurrence, initMetadata } from '@mo-nut/domain';
import { MedicationService } from './medication.service';

@Injectable()
export class ScheduleEngineService {
  constructor(private medicationService: MedicationService) {}

  /**
   * Generate bounded batches of dose occurrences (e.g. for the next 7 days).
   * Generates deterministic occurrence keys based on dueTimeUtc to prevent duplicates.
   */
  async generateOccurrences(
    schedule: MedicationSchedule,
    patientId: string,
    daysAhead = 7
  ): Promise<DoseOccurrence[]> {
    const generated: DoseOccurrence[] = [];
    const now = new Date();
    const endPeriod = new Date(now.getTime() + daysAhead * 24 * 3600000);

    for (let day = 0; day < daysAhead; day++) {
      const targetDate = new Date(now.getTime() + day * 24 * 3600000);
      const isMatch = this.checkScheduleMatch(schedule, targetDate);
      if (!isMatch) continue;

      // Generate for each local time configured in the schedule
      for (const time of schedule.localTimes) {
        const [hour, min] = time.split(':').map(Number);
        const dueTime = new Date(targetDate);
        dueTime.setUTCHours(hour || 0, min || 0, 0, 0);

        // Filter out past times
        if (dueTime.getTime() < now.getTime()) continue;

        // Generate deterministic key to enforce idempotency
        const dueTimeUtc = dueTime.toISOString();
        const deterministicId = `occ:${schedule.medicationId}:${dueTimeUtc}`;

        // Create the occurrence
        const meta = initMetadata();
        const occurrence: DoseOccurrence = {
          ...meta,
          id: deterministicId, // Overwrite with deterministic key
          scheduleId: schedule.id,
          medicationId: schedule.medicationId,
          patientId,
          dueAt: dueTimeUtc,
          timezone: schedule.timezone,
          status: 'scheduled',
        };

        await this.medicationService.saveOccurrence(occurrence);
        generated.push(occurrence);
      }
    }

    return generated;
  }

  /**
   * Helper verifying schedule rules (daily, specific_days, interval check)
   */
  private checkScheduleMatch(schedule: MedicationSchedule, date: Date): boolean {
    const type = schedule.patternType;

    if (type === 'daily_times') {
      return true;
    }

    if (type === 'specific_days' || type === 'weekly') {
      const dayOfWeek = date.getUTCDay(); // 0-6
      return schedule.daysOfWeek?.includes(dayOfWeek) ?? false;
    }

    if (type === 'every_n_hours') {
      // Simplify: matching everyday, interval handled in times
      return true;
    }

    return false;
  }
}
