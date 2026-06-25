import { EntityMetadata, SoftDeletable } from './metadata.js';

/**
 * Health Measurement Entities
 */

export type MeasurementType = 'weight' | 'height' | 'pulse' | 'glucose' | 'blood_pressure';

export type MeasurementSource =
  | { type: 'manual' }
  | { type: 'device'; deviceId: string; deviceName: string }
  | { type: 'ocr'; jobId: string; confidence: number }
  | { type: 'import'; source: string };

export interface WeightMeasurementValue {
  weight_kg: number;
}

export interface HeightMeasurementValue {
  height_cm: number;
}

export interface PulseMeasurementValue {
  bpm: number;
  context?: 'resting' | 'active' | 'post_exercise';
}

export interface GlucoseMeasurementValue {
  glucose_mg_dl: number;
  context: 'fasting' | 'before_meal' | 'after_meal' | 'bedtime' | 'random';
}

export interface BloodPressureMeasurementValue {
  systolic_mmhg: number;
  diastolic_mmhg: number;
  pulse_bpm?: number;
  context?: 'resting' | 'standing' | 'sitting';
}

export type MeasurementValue =
  | WeightMeasurementValue
  | HeightMeasurementValue
  | PulseMeasurementValue
  | GlucoseMeasurementValue
  | BloodPressureMeasurementValue;

export interface HealthMeasurement extends EntityMetadata, SoftDeletable {
  patientId: string;
  measurementType: MeasurementType;
  measuredAt: string; // ISO 8601 UTC
  timezone: string; // IANA timezone
  source: MeasurementSource;
  recordedByUserId: string;
  note?: string;
  value: MeasurementValue;
}

export interface MeasurementThreshold {
  id: string;
  patientId: string;
  measurementType: MeasurementType;
  minValue?: number;
  maxValue?: number;
  alertOnViolation: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface MeasurementRepository {
  /**
   * Find measurement by ID
   */
  findById(id: string): Promise<HealthMeasurement | null>;

  /**
   * List measurements for a patient
   */
  listPatientMeasurements(
    patientId: string,
    options?: {
      measurementType?: MeasurementType;
      from?: string;
      to?: string;
      limit?: number;
      cursor?: string;
    }
  ): Promise<{ measurements: HealthMeasurement[]; nextCursor?: string }>;

  /**
   * Create measurement with validation
   */
  create(measurement: HealthMeasurement): Promise<HealthMeasurement>;

  /**
   * Update measurement (with version check)
   */
  update(measurement: HealthMeasurement): Promise<HealthMeasurement>;

  /**
   * Soft delete measurement
   */
  softDelete(id: string, deletedBy?: string): Promise<void>;

  /**
   * Validate measurement value against type-specific rules
   */
  validateMeasurement(
    measurementType: MeasurementType,
    value: MeasurementValue
  ): { valid: boolean; errors: string[] };
}

export interface ThresholdRepository {
  /**
   * Find threshold for a patient and measurement type
   */
  findByPatientAndType(
    patientId: string,
    measurementType: MeasurementType
  ): Promise<MeasurementThreshold | null>;

  /**
   * Create or update threshold
   */
  upsert(threshold: MeasurementThreshold): Promise<MeasurementThreshold>;

  /**
   * List all thresholds for a patient
   */
  listPatientThresholds(patientId: string): Promise<MeasurementThreshold[]>;
}
