import { Injectable, NotFoundException, ConflictException, BadRequestException } from '@nestjs/common';
import { EmergencyEvent, LocationSnapshot, initMetadata, updateMetadata } from '@mo-nut/domain';
import * as crypto from 'crypto';

export interface SosActivationRequest {
  patientId: string;
  initiatedBy: string;
  location?: LocationSnapshot;
}

export interface DeliveryResult {
  contactId: string;
  status: 'success' | 'failed';
  error?: string;
}

@Injectable()
export class SosService {
  private events: Map<string, EmergencyEvent> = new Map();

  /**
   * Activate SOS emergency event.
   * Returns the created event with location if provided.
   */
  async activate(req: SosActivationRequest): Promise<EmergencyEvent> {
    const id = `sos-${crypto.randomUUID().slice(0, 8)}`;
    const event: EmergencyEvent = {
      ...initMetadata(req.initiatedBy),
      patientId: req.patientId,
      initiatedBy: req.initiatedBy,
      initiatedAt: new Date().toISOString(),
      status: 'initiated',
      notifiedContacts: [],
      failedContacts: [],
    };

    if (req.location) event.location = req.location;

    this.events.set(id, event);
    return event;
  }

  /**
   * Record notification delivery result to a contact.
   * Separate success/failure tracking preserves partial-failure visibility.
   */
  async recordDelivery(eventId: string, result: DeliveryResult): Promise<void> {
    const event = this.events.get(eventId);
    if (!event) throw new NotFoundException(`SOS event ${eventId} not found`);

    if (result.status === 'success') {
      event.notifiedContacts.push(result.contactId);
    } else {
      event.failedContacts.push(result.contactId);
    }

    event.version += 1;
    event.updatedAt = new Date().toISOString();
    this.events.set(eventId, event);
  }

  /**
   * Transition SOS event status (dispatched -> responded -> resolved -> cancelled)
   */
  async updateStatus(
    eventId: string,
    newStatus: 'initiated' | 'dispatched' | 'responded' | 'resolved' | 'cancelled',
    actorId?: string,
    respondedBy?: string
  ): Promise<EmergencyEvent> {
    const event = this.events.get(eventId);
    if (!event) throw new NotFoundException(`SOS event ${eventId} not found`);

    event.status = newStatus;

    if (newStatus === 'responded' && respondedBy) {
      event.respondedBy = respondedBy;
      event.respondedAt = new Date().toISOString();
    }

    if (newStatus === 'resolved' || newStatus === 'cancelled') {
      event.closedAt = new Date().toISOString();
      if (actorId) event.closedBy = actorId;
    }

    event.version += 1;
    event.updatedAt = new Date().toISOString();
    this.events.set(eventId, event);
    return event;
  }

  /**
   * Cancel SOS (initiated -> cancelled).
   * Prevents accidental duplicate SOS.
   */
  async cancel(eventId: string, actorId: string): Promise<EmergencyEvent> {
    return this.updateStatus(eventId, 'cancelled', actorId);
  }

  /**
   * Resolve SOS.
   */
  async resolve(eventId: string, actorId: string): Promise<EmergencyEvent> {
    return this.updateStatus(eventId, 'resolved', actorId);
  }

  /**
   * Get event by ID
   */
  async findById(id: string): Promise<EmergencyEvent | null> {
    return this.events.get(id) || null;
  }

  /**
   * List patient events (most recent first)
   */
  async listPatientEvents(patientId: string): Promise<EmergencyEvent[]> {
    return Array.from(this.events.values())
      .filter(e => e.patientId === patientId)
      .sort((a, b) => b.initiatedAt.localeCompare(a.initiatedAt));
  }

  /**
   * Generate direct tel: link for emergency call
   * (always available, even offline)
   */
  generateDirectCall(phoneNumber: string): string {
    return `tel:${phoneNumber.replace(/[^0-9+]/g, '')}`;
  }

  /**
   * Generate disclaimer text
   */
  getDisclaimer(): string {
    return 'Mo-nut is not an emergency service. For life-threatening emergencies, call 1669 directly.';
  }
}