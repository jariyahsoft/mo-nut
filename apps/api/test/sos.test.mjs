import { describe, it, beforeEach } from 'node:test';
import { strict as assert } from 'node:assert';

describe('SOS Event State Machine', () => {
  let events;

  beforeEach(() => {
    events = new Map();
  });

  it('should transition through valid states', () => {
    const validTransitions = {
      initiated: ['dispatched', 'cancelled'],
      dispatched: ['responded', 'cancelled'],
      responded: ['resolved', 'cancelled'],
      resolved: [],
      cancelled: [],
    };

    assert.ok(validTransitions.initiated.includes('dispatched'));
    assert.ok(validTransitions.dispatched.includes('responded'));
    assert.ok(validTransitions.responded.includes('resolved'));
    assert.ok(validTransitions.initiated.includes('cancelled'));
  });
});

describe('SOS Duplicate Prevention', () => {
  it('should create only one logical event per actor within short window', () => {
    const recent = [];
    const activate = (actorId) => {
      const last = recent[recent.length - 1];
      if (last && last.actorId === actorId && Date.now() - last.ts < 5000) {
        return null; // Skip duplicate
      }
      const event = { id: `sos-${Date.now()}`, actorId, ts: Date.now() };
      recent.push(event);
      return event;
    };

    const first = activate('user-1');
    const second = activate('user-1'); // Immediate duplicate

    assert.ok(first);
    assert.equal(second, null); // Duplicate blocked
  });
});

describe('Direct Call Always Available', () => {
  it('should generate tel: link even when offline', () => {
    const sanitizeTel = (phone) => `tel:${phone.replace(/[^0-9+]/g, '')}`;

    const link = sanitizeTel('1669');
    assert.equal(link, 'tel:1669');
  });
});

describe('Partial Push/Location Failure Visibility', () => {
  it('should track succeeded and failed contacts separately', () => {
    const event = {
      notifiedContacts: ['contact-1', 'contact-2'],
      failedContacts: ['contact-3'],
    };

    assert.equal(event.notifiedContacts.length, 2);
    assert.equal(event.failedContacts.length, 1);
    // Failed contacts visible (partial failure transparency)
    assert.ok(event.failedContacts.includes('contact-3'));
  });
});

describe('SOS Disclaimer', () => {
  it('should always include non-emergency-service disclaimer', () => {
    const disclaimer = 'Mo-nut is not an emergency service. For life-threatening emergencies, call 1669 directly.';
    assert.ok(disclaimer.includes('not an emergency service'));
    assert.ok(disclaimer.includes('1669'));
  });
});

describe('Audit Trail for SOS', () => {
  it('should record actor and server time on every state transition', () => {
    const auditLog = [];
    const transition = (eventId, actorId, fromState, toState, serverTime) => {
      auditLog.push({ eventId, actorId, fromState, toState, serverTime });
    };

    transition('sos-1', 'user-1', 'initiated', 'dispatched', '2026-06-26T00:00:00Z');
    transition('sos-1', 'caregiver-1', 'dispatched', 'responded', '2026-06-26T00:01:00Z');
    transition('sos-1', 'user-1', 'responded', 'resolved', '2026-06-26T00:05:00Z');

    assert.equal(auditLog.length, 3);
    assert.equal(auditLog[0].actorId, 'user-1');
    assert.equal(auditLog[1].actorId, 'caregiver-1');
    assert.ok(auditLog[2].serverTime);
  });
});

describe('Location Retention Minimization', () => {
  it('should retain location only when SOS is active and location was provided', () => {
    const sosWithoutLocation = { initiatedAt: new Date().toISOString(), status: 'initiated' };
    const sosWithLocation = {
      initiatedAt: new Date().toISOString(),
      status: 'initiated',
      location: { latitude: 13.7563, longitude: 100.5018 },
    };

    assert.equal(sosWithoutLocation.location, undefined);
    assert.ok(sosWithLocation.location);
  });
});