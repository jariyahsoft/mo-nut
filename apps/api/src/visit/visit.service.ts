import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { AudioRecord, ChecklistOccurrence, DoctorQuestion, initMetadata, updateMetadata } from '@mo-nut/domain';
import { AppointmentService } from '../appointment/appointment.service';
import { MedicationService } from '../medication/medication.service';
import { ChecklistService } from '../checklist/checklist.service';
import { MeasurementService } from '../measurement/measurement.service';

export interface VisitContextData {
  appointment: any | null;
  medications: any[];
  priorityQuestions: DoctorQuestion[];
  healthSummary: any | null;
  checklistProgress: any | null;
  notes: string;
}

export interface RecordingRequest {
  consentConfirmed: boolean;
  appointmentId?: string;
  assetId: string;
  durationSeconds: number;
  consentConfirmedBy?: string;
}

@Injectable()
export class VisitService {
  private audioRecords: Map<string, AudioRecord> = new Map();
  private visitSessions: Map<string, VisitContextData & { patientId: string; startedAt: string; notes: string }> = new Map();

  constructor(
    private appointmentService: AppointmentService,
    private medicationService: MedicationService,
    private checklistService: ChecklistService,
    private measurementService: MeasurementService
  ) {}

  /**
   * Start Visit Mode - aggregate context data for a doctor's appointment.
   * Combines: appointment, active medications, priority questions, recent measurements, checklist progress.
   */
  async startVisit(patientId: string, appointmentId: string): Promise<VisitContextData> {
    const appointment = await this.appointmentService.findById(appointmentId);
    if (!appointment || appointment.patientId !== patientId) {
      throw new NotFoundException(`Appointment ${appointmentId} not found for this patient`);
    }

    // Aggregate medications
    const medications = await this.medicationService.listPatientMedications(patientId);

    // Priority questions (urgent first)
    const questions = await this.checklistService.listQuestionsByPriority(patientId);
    const priorityQuestions = questions.filter(q => q.status !== 'answered').slice(0, 5);

    // Recent measurement (single latest)
    const measurements = await this.measurementService.listPatientMeasurements(patientId, { limit: 1 });
    const healthSummary = measurements[0] || null;

    // Checklist progress
    const occurrences = await this.checklistService.listPatientOccurrences(patientId);
    const progress = this.checklistService.computeWeeklyProgress(occurrences);
    const streak = this.checklistService.computeStreak(occurrences);

    const context: VisitContextData & { patientId: string; startedAt: string } = {
      patientId,
      startedAt: new Date().toISOString(),
      appointment: appointment ? {
        id: appointment.id,
        facility: appointment.facilityId,
        scheduledAt: appointment.scheduledAt,
        status: appointment.status,
      } : null,
      medications: medications.map(m => ({
        id: m.id,
        displayName: m.displayName,
        strength: m.strength,
        status: m.status,
      })),
      priorityQuestions,
      healthSummary,
      checklistProgress: { ...progress, streak },
      notes: '',
    };

    this.visitSessions.set(appointmentId, context);
    return context;
  }

  /**
   * Update notes during visit (preserved offline-safe)
   */
  async updateNotes(appointmentId: string, notes: string): Promise<VisitContextData> {
    const session = this.visitSessions.get(appointmentId);
    if (!session) {
      throw new NotFoundException(`Visit session ${appointmentId} not found`);
    }
    session.notes = notes;
    return session;
  }

  /**
   * Start audio recording — requires explicit consent confirmation.
   */
  async startRecording(req: RecordingRequest): Promise<AudioRecord> {
    if (!req.consentConfirmed) {
      throw new BadRequestException('Recording consent must be confirmed before recording starts');
    }

    const record: AudioRecord = {
      ...initMetadata(),
      patientId: '',
      assetId: req.assetId,
      durationSeconds: req.durationSeconds,
      consentConfirmedAt: new Date().toISOString(),
      ...(req.consentConfirmedBy ? { consentConfirmedBy: req.consentConfirmedBy } : {}),
    };

    this.audioRecords.set(record.id, record);
    return record;
  }

  /**
   * Update recording duration (paused/resumed/stopped)
   */
  async updateRecordingDuration(id: string, durationSeconds: number): Promise<AudioRecord> {
    const record = this.audioRecords.get(id);
    if (!record) throw new NotFoundException(`Audio record ${id} not found`);

    record.durationSeconds = durationSeconds;
    record.version += 1;
    record.updatedAt = new Date().toISOString();
    this.audioRecords.set(id, record);
    return record;
  }

  /**
   * List audio records for a patient
   */
  async listPatientRecordings(patientId: string): Promise<AudioRecord[]> {
    return Array.from(this.audioRecords.values()).filter(r => r.patientId === patientId);
  }
}