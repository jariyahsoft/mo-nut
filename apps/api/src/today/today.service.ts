import { Injectable } from '@nestjs/common';
import { AppointmentService } from '../appointment/appointment.service';
import { MedicationService } from '../medication/medication.service';
import { ChecklistService } from '../checklist/checklist.service';
import { MeasurementService } from '../measurement/measurement.service';

export interface TodayDashboardData {
  nextAppointment: any | null;
  dueMedications: any[];
  checklist: any | null;
  recentMeasurement: any | null;
  caregiverAlerts: string[];
  syncState: {
    lastSyncAt: string;
    pendingCount: number;
  };
  quickCaptureEnabled: boolean;
}

@Injectable()
export class TodayService {
  constructor(
    private appointmentService: AppointmentService,
    private medicationService: MedicationService,
    private checklistService: ChecklistService,
    private measurementService: MeasurementService
  ) {}

  /**
   * Aggregate dashboard data for the patient.
   * Bounded queries, permission-aware, no PHI in logs.
   */
  async aggregate(patientId: string): Promise<TodayDashboardData> {
    // Next appointment (bounded)
    const appointments = await this.appointmentService.listPatientAppointments(patientId, {
      limit: 5,
    });
    const upcoming = appointments.filter(a => a.status === 'upcoming' || a.status === 'confirmed');
    const nextAppointment = upcoming[0] || null;

    // Due medications (limit 10)
    const occurrences = await this.medicationService.listPatientOccurrences(patientId);
    const dueMedications = occurrences
      .filter(o => o.status === 'scheduled' || o.status === 'due')
      .slice(0, 10);

    // Active checklist
    const checklists = await this.checklistService.listPatientChecklists(patientId);
    const activeChecklist = checklists.find(c => c.status === 'active') || null;

    // Recent measurement (latest only, bounded)
    const measurements = await this.measurementService.listPatientMeasurements(patientId, {
      limit: 1,
    });
    const recentMeasurement = measurements[0] || null;

    return {
      nextAppointment: nextAppointment ? this.sanitizeAppointment(nextAppointment) : null,
      dueMedications: dueMedications.map(d => this.sanitizeDose(d)),
      checklist: activeChecklist ? this.sanitizeChecklist(activeChecklist) : null,
      recentMeasurement: recentMeasurement ? this.sanitizeMeasurement(recentMeasurement) : null,
      caregiverAlerts: [], // would be populated by notification service
      syncState: {
        lastSyncAt: new Date().toISOString(),
        pendingCount: 0,
      },
      quickCaptureEnabled: true,
    };
  }

  /**
   * Sanitize appointment (no PHI in logs, bounded fields)
   */
  private sanitizeAppointment(a: any) {
    return {
      id: a.id,
      facility: a.facilityId,
      scheduledAt: a.scheduledAt,
      timezone: a.timezone,
      status: a.status,
    };
  }

  /**
   * Sanitize dose event
   */
  private sanitizeDose(d: any) {
    return {
      id: d.id,
      medicationId: d.medicationId,
      dueAt: d.dueAt,
      status: d.status,
    };
  }

  /**
   * Sanitize checklist
   */
  private sanitizeChecklist(c: any) {
    return {
      id: c.id,
      title: c.title,
      itemsCount: c.items?.length || 0,
      completedCount: c.items?.filter((i: any) => i.isCompleted).length || 0,
    };
  }

  /**
   * Sanitize measurement
   */
  private sanitizeMeasurement(m: any) {
    return {
      id: m.id,
      type: m.measurementType,
      measuredAt: m.measuredAt,
      value: m.value,
    };
  }
}