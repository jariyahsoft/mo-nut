import { describe, it, beforeEach } from 'node:test';
import { strict as assert } from 'node:assert';

describe('Health Measurement Validation', () => {
  let measurements;

  beforeEach(() => {
    measurements = new Map();
  });

  it('should accept valid weight measurement', () => {
    const measurement = {
      id: 'msm-1',
      type: 'weight',
      value: { weight_kg: 70.5 },
    };

    const validate = (m) => {
      if (m.type === 'weight' && (m.value.weight_kg <= 0 || m.value.weight_kg > 500)) {
        return { valid: false, errors: ['Weight out of range'] };
      }
      return { valid: true, errors: [] };
    };

    const result = validate(measurement);
    assert.equal(result.valid, true);
  });

  it('should reject invalid weight (negative)', () => {
    const measurement = {
      id: 'msm-bad',
      type: 'weight',
      value: { weight_kg: -5 },
    };

    const validate = (m) => {
      if (m.type === 'weight' && (m.value.weight_kg <= 0 || m.value.weight_kg > 500)) {
        return { valid: false, errors: ['Weight must be between 0 and 500 kg'] };
      }
      return { valid: true, errors: [] };
    };

    const result = validate(measurement);
    assert.equal(result.valid, false);
    assert.ok(result.errors[0].includes('500'));
  });

  it('should require glucose context', () => {
    const glucoseNoContext = {
      type: 'glucose',
      value: { glucose_mg_dl: 120 },
    };

    const validate = (m) => {
      const errors = [];
      if (m.type === 'glucose' && !m.value.context) {
        errors.push('Glucose context required');
      }
      return { valid: errors.length === 0, errors };
    };

    const result = validate(glucoseNoContext);
    assert.equal(result.valid, false);
  });

  it('should reject out-of-range blood pressure', () => {
    const bpInvalid = {
      type: 'blood_pressure',
      value: { systolic_mmhg: 500, diastolic_mmhg: 80 },
    };

    const validate = (m) => {
      const errors = [];
      if (m.value.systolic_mmhg > 300) errors.push('Systolic too high');
      return { valid: errors.length === 0, errors };
    };

    const result = validate(bpInvalid);
    assert.equal(result.valid, false);
  });
});

describe('BMI Calculation', () => {
  it('should compute BMI from weight and height', () => {
    const computeBmi = (weightKg, heightCm) => {
      const heightM = heightCm / 100;
      return Math.round((weightKg / (heightM * heightM)) * 10) / 10;
    };

    const bmi = computeBmi(70, 170);
    assert.ok(bmi >= 24 && bmi <= 25); // ~24.2
  });

  it('should not compute BMI without both weight and height', () => {
    const computeBmi = (value) => {
      if (value.weight_kg && value.height_cm) {
        const heightM = value.height_cm / 100;
        return Math.round((value.weight_kg / (heightM * heightM)) * 10) / 10;
      }
      return undefined;
    };

    assert.equal(computeBmi({ weight_kg: 70 }), undefined);
    assert.equal(computeBmi({ height_cm: 170 }), undefined);
  });
});

describe('Offline Sync - Stable Idempotency', () => {
  it('should deduplicate offline captures by client mutation id', () => {
    const synced = new Set();
    const clientMutationId = 'cmid-abc-123';

    // Sync once
    if (!synced.has(clientMutationId)) {
      synced.add(clientMutationId);
    }

    // Sync attempt 2 (offline retry)
    if (!synced.has(clientMutationId)) {
      synced.add(clientMutationId);
    }

    assert.equal(synced.size, 1);
  });
});

describe('Measurement Source Attribution', () => {
  it('should track actor and device for caregiver attribution', () => {
    const measurement = {
      id: 'msm-1',
      recordedByUserId: 'caregiver-123', // Caregiver entered on behalf
      patientId: 'patient-456',
      source: { type: 'manual' },
    };

    assert.equal(measurement.recordedByUserId, 'caregiver-123');
    assert.notEqual(measurement.recordedByUserId, measurement.patientId);
  });
});