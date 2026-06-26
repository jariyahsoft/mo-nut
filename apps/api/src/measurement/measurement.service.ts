import { Injectable, NotFoundException, ConflictException, BadRequestException } from '@nestjs/common';
import {
  HealthMeasurement,
  initMetadata,
  updateMetadata,
  MeasurementType,
  WeightMeasurementValue,
  HeightMeasurementValue,
  PulseMeasurementValue,
  GlucoseMeasurementValue,
  BloodPressureMeasurementValue,
} from '@mo-nut/domain';

@Injectable()
export class MeasurementService {
  private measurements: Map<string, HealthMeasurement> = new Map();

  /**
   * Validate measurement value based on type.
   */
  private validateValue(
    type: MeasurementType,
    value: unknown
  ): { valid: boolean; errors: string[] } {
    const errors: string[] = [];

    switch (type) {
      case 'weight': {
        const v = value as WeightMeasurementValue;
        if (!v.weight_kg || v.weight_kg <= 0 || v.weight_kg > 500) {
          errors.push('Weight must be between 0 and 500 kg');
        }
        break;
      }
      case 'height': {
        const v = value as HeightMeasurementValue;
        if (!v.height_cm || v.height_cm <= 0 || v.height_cm > 300) {
          errors.push('Height must be between 0 and 300 cm');
        }
        break;
      }
      case 'pulse': {
        const v = value as PulseMeasurementValue;
        if (!v.bpm || v.bpm <= 0 || v.bpm > 300) {
          errors.push('Pulse must be between 0 and 300 bpm');
        }
        break;
      }
      case 'glucose': {
        const v = value as GlucoseMeasurementValue;
        if (!v.glucose_mg_dl || v.glucose_mg_dl <= 0 || v.glucose_mg_dl > 1000) {
          errors.push('Glucose must be between 0 and 1000 mg/dL');
        }
        if (!v.context) {
          errors.push('Glucose context required (fasting/before_meal/after_meal/bedtime/random)');
        }
        break;
      }
      case 'blood_pressure': {
        const v = value as BloodPressureMeasurementValue;
        if (!v.systolic_mmhg || v.systolic_mmhg <= 0 || v.systolic_mmhg > 300) {
          errors.push('Systolic BP must be between 0 and 300 mmHg');
        }
        if (!v.diastolic_mmhg || v.diastolic_mmhg <= 0 || v.diastolic_mmhg > 200) {
          errors.push('Diastolic BP must be between 0 and 200 mmHg');
        }
        break;
      }
      default:
        errors.push(`Unknown measurement type: ${type}`);
    }

    return { valid: errors.length === 0, errors };
  }

  /**
   * Compute BMI when weight and height are available.
   */
  private computeBmi(value: unknown): number | undefined {
    const v = value as { weight_kg?: number; height_cm?: number };
    if (v.weight_kg && v.height_cm) {
      const heightM = v.height_cm / 100;
      return Math.round((v.weight_kg / (heightM * heightM)) * 10) / 10;
    }
    return undefined;
  }

  /**
   * Create measurement with validation.
   */
  async create(measurement: HealthMeasurement, actorId: string): Promise<HealthMeasurement> {
    const validation = this.validateValue(measurement.measurementType, measurement.value);
    if (!validation.valid) {
      throw new BadRequestException(validation.errors.join('; '));
    }

    const meta = initMetadata(actorId);
    const record: HealthMeasurement = {
      ...meta,
      patientId: measurement.patientId,
      measurementType: measurement.measurementType,
      measuredAt: measurement.measuredAt,
      timezone: measurement.timezone || 'Asia/Bangkok',
      source: measurement.source,
      recordedByUserId: measurement.recordedByUserId,
      ...(measurement.note ? { note: measurement.note } : {}),
      value: measurement.value,
    };

    this.measurements.set(record.id, record);
    return record;
  }

  /**
   * Find measurement by ID
   */
  async findById(id: string): Promise<HealthMeasurement | null> {
    const m = this.measurements.get(id);
    if (!m || m.deletedAt) return null;
    return m;
  }

  /**
   * List measurements for a patient
   */
  async listPatientMeasurements(
    patientId: string,
    options?: { type?: MeasurementType; from?: string; to?: string; limit?: number }
  ): Promise<HealthMeasurement[]> {
    let list = Array.from(this.measurements.values())
      .filter(m => m.patientId === patientId && !m.deletedAt);

    if (options?.type) {
      const t = options.type;
      list = list.filter(m => m.measurementType === t);
    }
    if (options?.from) {
      const from = options.from;
      list = list.filter(m => m.measuredAt >= from);
    }
    if (options?.to) {
      const to = options.to;
      list = list.filter(m => m.measuredAt <= to);
    }

    list.sort((a, b) => b.measuredAt.localeCompare(a.measuredAt));

    const limit = options?.limit || 50;
    return list.slice(0, limit);
  }

  /**
   * Update measurement (soft-delete-aware, version-controlled)
   */
  async update(updated: HealthMeasurement): Promise<HealthMeasurement> {
    const existing = this.measurements.get(updated.id);
    if (!existing || existing.deletedAt) {
      throw new NotFoundException(`Measurement ${updated.id} not found`);
    }

    if (existing.version !== updated.version - 1) {
      throw new ConflictException(`Version conflict: expected ${updated.version - 1}, actual version is ${existing.version}`);
    }

    const validation = this.validateValue(updated.measurementType, updated.value);
    if (!validation.valid) {
      throw new BadRequestException(validation.errors.join('; '));
    }

    const result = {
      ...updated,
      ...updateMetadata(existing, updated.recordedByUserId || 'system'),
    };

    this.measurements.set(updated.id, result);
    return result;
  }

  /**
   * Soft delete measurement
   */
  async softDelete(id: string, actorId: string): Promise<void> {
    const m = this.measurements.get(id);
    if (!m || m.deletedAt) {
      throw new NotFoundException(`Measurement ${id} not found`);
    }

    m.deletedAt = new Date().toISOString();
    m.deletedBy = actorId;
    m.version += 1;
    m.updatedAt = new Date().toISOString();
    this.measurements.set(id, m);
  }

  computeBmiPublic(value: unknown): number | undefined {
    return this.computeBmi(value);
  }
}