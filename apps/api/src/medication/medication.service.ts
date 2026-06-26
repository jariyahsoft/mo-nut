import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { Medication, MedicationSchedule, DoseOccurrence, MedicationStatus, initMetadata, updateMetadata } from '@mo-nut/domain';

@Injectable()
export class MedicationService {
  private medications: Map<string, Medication> = new Map();
  private schedules: Map<string, MedicationSchedule> = new Map();
  private occurrences: Map<string, DoseOccurrence> = new Map();

  /**
   * Create medication
   */
  async create(medication: Medication): Promise<Medication> {
    if (this.medications.has(medication.id)) {
      throw new ConflictException(`Medication ${medication.id} already exists`);
    }
    this.medications.set(medication.id, medication);
    return medication;
  }

  /**
   * Find medication by ID
   */
  async findById(id: string): Promise<Medication | null> {
    const med = this.medications.get(id);
    if (!med || med.deletedAt) return null;
    return med;
  }

  /**
   * List medications for a patient
   */
  async listPatientMedications(patientId: string, status?: MedicationStatus): Promise<Medication[]> {
    let list = Array.from(this.medications.values()).filter(
      (m) => m.patientId === patientId && !m.deletedAt
    );
    if (status) {
      list = list.filter((m) => m.status === status);
    }
    return list;
  }

  /**
   * Update medication preserving history structure
   */
  async update(updated: Medication): Promise<Medication> {
    const existing = this.medications.get(updated.id);
    if (!existing || existing.deletedAt) {
      throw new NotFoundException(`Medication ${updated.id} not found`);
    }

    if (existing.version !== updated.version - 1) {
      throw new ConflictException(`Version conflict: expected ${updated.version - 1}, actual version is ${existing.version}`);
    }

    this.medications.set(updated.id, updated);
    return updated;
  }

  /**
   * Create schedule rule (linked to medication)
   */
  async createSchedule(schedule: MedicationSchedule): Promise<MedicationSchedule> {
    this.schedules.set(schedule.id, schedule);
    return schedule;
  }

  /**
   * Find active schedule for a medication
   */
  async findActiveSchedule(medicationId: string): Promise<MedicationSchedule | null> {
    const active = Array.from(this.schedules.values()).find(
      (s) => s.medicationId === medicationId && s.active
    );
    return active || null;
  }

  /**
   * Update a schedule (forces supersession for existing schedules to preserve history)
   */
  async supersedeSchedule(oldId: string, newSchedule: MedicationSchedule): Promise<MedicationSchedule> {
    const old = this.schedules.get(oldId);
    if (old) {
      old.active = false;
      old.supersededByScheduleId = newSchedule.id;
      old.effectiveTo = newSchedule.effectiveFrom;
      old.version += 1;
      this.schedules.set(oldId, old);
    }

    this.schedules.set(newSchedule.id, newSchedule);
    return newSchedule;
  }

  /**
   * Get active occurrences for a patient
   */
  async listPatientOccurrences(patientId: string): Promise<DoseOccurrence[]> {
    return Array.from(this.occurrences.values()).filter(
      (occ) => occ.patientId === patientId
    );
  }

  /**
   * Save generated dose occurrence
   */
  async saveOccurrence(occ: DoseOccurrence): Promise<void> {
    this.occurrences.set(occ.id, occ);
  }
}
