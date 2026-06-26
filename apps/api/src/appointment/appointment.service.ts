import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { Appointment, AppointmentEvent, AppointmentStatus } from '@mo-nut/domain';
import * as crypto from 'crypto';

@Injectable()
export class AppointmentService {
  private appointments: Map<string, Appointment> = new Map();
  private events: AppointmentEvent[] = []; // history source of truth

  /**
   * Create an appointment with history tracking
   */
  async create(appointment: Appointment, actorId: string): Promise<Appointment> {
    const existing = this.appointments.get(appointment.id);
    if (existing) {
      throw new ConflictException(`Appointment with ID ${appointment.id} already exists`);
    }

    this.appointments.set(appointment.id, appointment);

    const event: AppointmentEvent = {
      id: `ev-${crypto.randomUUID().slice(0, 8)}`,
      schemaVersion: 1,
      version: 1,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      appointmentId: appointment.id,
      type: 'created',
      newValue: appointment.status,
      actorId,
      occurredAt: new Date().toISOString(),
    };
    this.events.push(event);

    return appointment;
  }

  /**
   * Find appointment by ID
   */
  async findById(id: string): Promise<Appointment | null> {
    const app = this.appointments.get(id);
    if (!app || app.deletedAt) return null;
    return app;
  }

  /**
   * List appointments for a patient
   */
  async listPatientAppointments(
    patientId: string,
    options?: {
      status?: AppointmentStatus;
      from?: string;
      to?: string;
      limit?: number;
    }
  ): Promise<Appointment[]> {
    let list = Array.from(this.appointments.values()).filter(
      (app) => app.patientId === patientId && !app.deletedAt
    );

    if (options?.status) {
      const status = options.status;
      list = list.filter((app) => app.status === status);
    }

    if (options?.from) {
      const from = options.from;
      list = list.filter((app) => app.scheduledAt >= from);
    }

    if (options?.to) {
      const to = options.to;
      list = list.filter((app) => app.scheduledAt <= to);
    }

    list.sort((a, b) => b.scheduledAt.localeCompare(a.scheduledAt));

    const limit = options?.limit || 50;
    return list.slice(0, limit);
  }

  /**
   * Update an appointment (Optimistic lock version check)
   */
  async update(
    updated: Appointment,
    actorId: string,
    changeType: string,
    reason?: string
  ): Promise<Appointment> {
    const existing = this.appointments.get(updated.id);
    if (!existing || existing.deletedAt) {
      throw new NotFoundException(`Appointment ${updated.id} not found`);
    }

    // Optimistic lock check
    if (existing.version !== updated.version - 1) {
      throw new ConflictException(
        `Version conflict: expected ${updated.version - 1}, actual version is ${existing.version}`
      );
    }

    const previousStatus = existing.status;
    this.appointments.set(updated.id, updated);

    const event: any = {
      id: `ev-${crypto.randomUUID().slice(0, 8)}`,
      schemaVersion: 1,
      version: 1,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      appointmentId: updated.id,
      type: changeType,
      oldValue: previousStatus,
      newValue: updated.status,
      actorId,
      occurredAt: new Date().toISOString(),
    };
    if (reason) {
      event.reason = reason;
    }
    this.events.push(event as AppointmentEvent);

    return updated;
  }

  /**
   * Soft delete appointment
   */
  async softDelete(id: string, actorId: string, reason?: string): Promise<void> {
    const existing = this.appointments.get(id);
    if (!existing || existing.deletedAt) {
      throw new NotFoundException(`Appointment ${id} not found`);
    }

    existing.deletedAt = new Date().toISOString();
    existing.deletedBy = actorId;
    this.appointments.set(id, existing);

    const event: AppointmentEvent = {
      id: `ev-${crypto.randomUUID().slice(0, 8)}`,
      schemaVersion: 1,
      version: 1,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      appointmentId: id,
      type: 'cancelled',
      oldValue: existing.status,
      newValue: 'cancelled',
      actorId,
      occurredAt: new Date().toISOString(),
      reason: reason || 'Soft deleted',
    };
    this.events.push(event);
  }

  /**
   * Get history logs for appointment transitions
   */
  async getHistory(appointmentId: string): Promise<AppointmentEvent[]> {
    return this.events.filter((e) => e.appointmentId === appointmentId);
  }
}
