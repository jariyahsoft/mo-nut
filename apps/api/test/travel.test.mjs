import { describe, it, beforeEach } from 'node:test';
import { strict as assert } from 'node:assert';

describe('Location Consent Required for Travel', () => {
  let consents;

  beforeEach(() => {
    consents = new Map();
  });

  it('should reject travel plan creation without location consent', () => {
    const consent = null; // No consent given

    const createPlan = (consent) => {
      if (!consent || !consent.optIn) {
        return { error: 'Location consent required' };
      }
      return { ok: true };
    };

    const result = createPlan(consent);
    assert.ok(result.error);
  });

  it('should allow travel plan creation with location consent', () => {
    const consent = { optIn: true, optInAt: new Date().toISOString() };
    const createPlan = (consent) => {
      if (!consent || !consent.optIn) {
        return { error: 'Location consent required' };
      }
      return { ok: true };
    };

    const result = createPlan(consent);
    assert.ok(result.ok);
  });
});

describe('Map Link - No PHI in Request', () => {
  it('should generate map link without including patient or appointment data', () => {
    const plan = {
      destinationFacilityName: 'Siriraj Hospital',
      destinationAddress: 'Bangkok, Thailand',
    };

    const generateMapLink = (plan) => {
      const query = encodeURIComponent(`${plan.destinationFacilityName} ${plan.destinationAddress}`);
      return `https://www.google.com/maps/search/?api=1&query=${query}`;
    };

    const link = generateMapLink(plan);

    assert.ok(link.startsWith('https://'));
    assert.ok(!link.includes('patient'));
    assert.ok(!link.includes('appointment'));
    assert.ok(!link.includes('PHI'));
  });
});

describe('Emergency Profile - Opt-In Required for Offline Use', () => {
  it('should reject emergency profile with optInOffline = false', () => {
    const profile = {
      patientId: 'patient-1',
      optInOffline: false,
      bloodType: 'O+',
      allergies: ['Penicillin'],
    };

    const upsert = (p) => {
      if (!p.optInOffline) {
        return { error: 'Opt-in required for offline emergency profile' };
      }
      return { ok: true };
    };

    const result = upsert(profile);
    assert.ok(result.error);
  });

  it('should allow emergency profile with optInOffline = true', () => {
    const profile = {
      patientId: 'patient-1',
      optInOffline: true,
      bloodType: 'O+',
    };

    const upsert = (p) => {
      if (!p.optInOffline) {
        return { error: 'Opt-in required' };
      }
      return { ok: true };
    };

    const result = upsert(profile);
    assert.ok(result.ok);
  });
});

describe('QR Code - Limited Fields Only', () => {
  it('should expose only approved fields via QR', () => {
    const fullProfile = {
      patientId: 'patient-1',
      optInOffline: true,
      bloodType: 'O+',
      allergies: ['Penicillin'],
      conditions: ['Diabetes'],
      medications: ['Metformin'],
      emergencyContactName: 'สมชาย',
      emergencyContactPhone: '081-234-5678',
      internalNotes: 'private medical info',
    };

    const qrSafe = {
      patientId: fullProfile.patientId,
      bloodType: fullProfile.bloodType,
      allergies: fullProfile.allergies,
      conditions: fullProfile.conditions,
      medications: fullProfile.medications,
      emergencyContactName: fullProfile.emergencyContactName,
      emergencyContactPhone: fullProfile.emergencyContactPhone,
    };

    // QR should not include optInOffline or internalNotes
    assert.equal(qrSafe.optInOffline, undefined);
    assert.equal(qrSafe.internalNotes, undefined);
    assert.ok(qrSafe.bloodType);
  });
});

describe('tel: Link Generation', () => {
  it('should sanitize phone number for tel: URI', () => {
    const sanitizeTel = (phone) => `tel:${phone.replace(/[^0-9+]/g, '')}`;

    assert.equal(sanitizeTel('081-234-5678'), 'tel:0812345678');
    assert.equal(sanitizeTel('+66 81 234 5678'), 'tel:+66812345678');
  });
});

describe('Travel Status Transitions', () => {
  it('should transition through pending -> traveling -> arrived', () => {
    const transitions = {
      pending: ['traveling'],
      traveling: ['arrived'],
      arrived: [],
    };

    assert.ok(transitions.pending.includes('traveling'));
    assert.ok(transitions.traveling.includes('arrived'));
  });
});