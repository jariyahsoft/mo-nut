import { describe, it, beforeEach } from 'node:test';
import { strict as assert } from 'node:assert';
import * as fs from 'fs';
import { CanonicalEngine } from '../../../tools/canonical-data.mjs';

// Setup Mock Repositories
class MockUserRepository {
  constructor() {
    this.users = [
      { id: 'user-1', version: 1, displayName: 'Alice', createdAt: '2026-06-25T00:00:00Z', updatedAt: '2026-06-25T00:00:00Z' },
      { id: 'user-2', version: 2, displayName: 'Bob', createdAt: '2026-06-25T00:00:00Z', updatedAt: '2026-06-25T01:00:00Z' },
    ];
  }
  async list() {
    return { users: this.users };
  }
}

class MockPatientRepository {
  constructor() {
    this.patients = [
      { id: 'patient-1', version: 1, accountOwnerUserId: 'user-1', createdAt: '2026-06-25T00:00:00Z', updatedAt: '2026-06-25T00:00:00Z' },
      { id: 'patient-2', version: 1, accountOwnerUserId: 'user-2', createdAt: '2026-06-25T00:00:00Z', updatedAt: '2026-06-25T00:00:00Z' },
    ];
  }
  async list() {
    return { patients: this.patients };
  }
}

class MockMedicationRepository {
  constructor() {
    this.medications = [
      { id: 'med-1', version: 1, patientId: 'patient-1', displayName: 'Aspirin', createdAt: '2026-06-25T00:00:00Z', updatedAt: '2026-06-25T00:00:00Z' },
    ];
  }
  async list() {
    return { medications: this.medications };
  }
}

describe('Canonical Data Export and Import Engine', () => {
  let engine;
  const outputPath = './test-export.ndjson';
  const metaPath = outputPath + '.meta.json';

  beforeEach(() => {
    engine = new CanonicalEngine({
      User: new MockUserRepository(),
      Patient: new MockPatientRepository(),
      Medication: new MockMedicationRepository(),
    });
  });

  it('should export all system data to NDJSON format with metadata header', async () => {
    const { header, outputPath: out, metaPath: meta } = await engine.exportToNDJSON(outputPath, {
      exportedBy: 'tester',
      env: 'test',
    });

    assert.equal(header.exportVersion, '1.0.0');
    assert.equal(header.exportedBy, 'tester');
    assert.equal(header.environment, 'test');
    assert.equal(header.entityCounts.User, 2);
    assert.equal(header.entityCounts.Patient, 2);
    assert.equal(header.entityCounts.Medication, 1);

    assert.ok(fs.existsSync(out));
    assert.ok(fs.existsSync(meta));

    // Cleanup
    fs.unlinkSync(out);
    fs.unlinkSync(meta);
  });

  it('should validate relationship integrity correctly', async () => {
    const { outputPath: out, metaPath: meta } = await engine.exportToNDJSON(outputPath, {
      exportedBy: 'tester',
      env: 'test',
    });

    const result = await engine.validateExport(out, meta);
    assert.equal(result.valid, true);
    assert.equal(result.entityCounts.User, 2);

    fs.unlinkSync(out);
    fs.unlinkSync(meta);
  });

  it('should reject invalid relationship exports', async () => {
    // Generate invalid data: Patient references missing owner user
    const badEngine = new CanonicalEngine({
      User: new MockUserRepository(),
      Patient: {
        async list() {
          return { patients: [{ id: 'patient-bad', version: 1, accountOwnerUserId: 'missing-user' }] };
        }
      }
    });

    const { outputPath: out, metaPath: meta } = await badEngine.exportToNDJSON(outputPath);
    const result = await badEngine.validateExport(out, meta);

    assert.equal(result.valid, false);
    assert.equal(result.error, 'RELATIONSHIP_VALIDATION_FAILED');
    assert.ok(result.details[0].includes('references missing owner user'));

    fs.unlinkSync(out);
    fs.unlinkSync(meta);
  });

  it('should reconcile dry-run counts and versions', async () => {
    const sourceData = [
      { id: '1', version: 1, val: 'a' },
      { id: '2', version: 2, val: 'b' },
    ];

    const targetData = [
      { id: '1', version: 1, val: 'a' },
      { id: '2', version: 1, val: 'b' }, // Version mismatch
    ];

    const report = await engine.reconcileDryRun(sourceData, targetData);
    assert.equal(report.status, 'failed');
    assert.equal(report.mismatchedVersions.length, 1);
    assert.equal(report.mismatchedVersions[0].id, '2');
  });
});
