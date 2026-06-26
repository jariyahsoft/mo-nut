import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { DoseOccurrence, DoseEvent, initMetadata } from '@mo-nut/domain';

export interface DoseActionRequest {
  occurrenceId: string;
  action: 'taken' | 'snoozed' | 'skipped' | 'issue_reported';
  actorId: string;
  note?: string;
  correctionReason?: string;
}

@Injectable()
export class DoseService {
  private doses: Map<string, DoseOccurrence> = new Map();
  private events: DoseEvent[] = [];

  /**
   * Record a dose action. First final action wins — subsequent different actions
   * require a correction reason and create a correction event.
   */
  async recordAction(req: DoseActionRequest): Promise<{ dose: DoseOccurrence; event: DoseEvent }> {
    const dose = this.doses.get(req.occurrenceId);
    if (!dose) {
      throw new NotFoundException(`Dose occurrence ${req.occurrenceId} not found`);
    }

    const existingEvents = this.events.filter(e => e.occurrenceId === req.occurrenceId);
    const hasFinalAction = existingEvents.some(e => e.eventType === 'action' || e.eventType === 'correction');

    // Idempotency: if dose already has this status, return the existing matching event
    if (dose.status === req.action) {
      const match = [...existingEvents].reverse().find(e => e.action === req.action);
      if (match) return { dose, event: match };
    }

    let eventType: 'action' | 'correction' = 'action';

    if (hasFinalAction) {
      // Correction required
      if (!req.correctionReason) {
        throw new ConflictException('Correction reason required when changing an already-finalized dose action');
      }
      eventType = 'correction';
    }

    // Update dose
    dose.status = req.action;
    dose.respondedAt = new Date().toISOString();
    dose.actorId = req.actorId;
    if (req.note) dose.note = req.note;
    if (req.action === 'snoozed') {
      dose.snoozedUntil = new Date(Date.now() + 15 * 60 * 1000).toISOString();
    }
    this.doses.set(req.occurrenceId, dose);

    // Create event
    const event: any = initMetadata(req.actorId);
    event.occurrenceId = req.occurrenceId;
    event.medicationId = dose.medicationId;
    event.patientId = dose.patientId;
    event.eventType = eventType;
    event.action = req.action;
    event.actorId = req.actorId;
    event.occurredAt = new Date().toISOString();
    if (req.note) event.note = req.note;
    if (req.correctionReason) event.correctionReason = req.correctionReason;

    this.events.push(event as DoseEvent);

    return { dose, event: event as DoseEvent };
  }

  async getOccurrencesForPatient(patientId: string): Promise<DoseOccurrence[]> {
    return Array.from(this.doses.values()).filter(d => d.patientId === patientId);
  }

  async loadOccurrence(occ: DoseOccurrence): Promise<void> {
    this.doses.set(occ.id, occ);
  }
}
