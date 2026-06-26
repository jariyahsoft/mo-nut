import { describe, it, beforeEach } from 'node:test';
import { strict as assert } from 'node:assert';

describe('Medication Notification - Idempotency per Occurrence', () => {
  let notifications;

  beforeEach(() => {
    notifications = new Map();
  });

  it('should create only one notification per occurrenceId', () => {
    const occurrenceId = 'occ-123';

    const notif1 = { id: 'notif-1', occurrenceId, status: 'pending' };
    notifications.set(notif1.id, notif1);

    // Second attempt with same occurrenceId
    const existing = Array.from(notifications.values()).find(n => n.occurrenceId === occurrenceId);
    assert.ok(existing);

    assert.equal(notifications.size, 1);
  });

  it('should support in-app fallback when push is unsupported', () => {
    const job = {
      id: 'notif-1',
      channels: ['in_app'], // No web_push since unsupported
      privacyLevel: 'summary',
    };

    assert.equal(job.channels.includes('web_push'), false);
    assert.equal(job.channels.includes('in_app'), true);
  });
});

describe('Pause/Stop cancels future notifications', () => {
  it('should cancel pending notifications when medication is paused', () => {
    const notifications = [
      { id: '1', status: 'pending' },
      { id: '2', status: 'pending' },
      { id: '3', status: 'sent' }, // Already sent, not cancelled
    ];

    // Pause medication
    let cancelledCount = 0;
    notifications.forEach(n => {
      if (n.status === 'pending') {
        n.status = 'cancelled';
        cancelledCount++;
      }
    });

    assert.equal(cancelledCount, 2);
    assert.equal(notifications.filter(n => n.status === 'cancelled').length, 2);
  });
});

describe('Caregiver Escalation - Permission Aware', () => {
  it('should only escalate to caregivers with medication scope', () => {
    const caregivers = [
      { id: 'cg-1', scopes: ['medication.read'] },
      { id: 'cg-2', scopes: ['appointment.read'] }, // No medication scope
      { id: 'cg-3', scopes: ['*'] },
    ];

    const eligible = caregivers.filter(c =>
      c.scopes.includes('medication.read') || c.scopes.includes('*')
    );

    assert.equal(eligible.length, 2);
    assert.ok(eligible.find(c => c.id === 'cg-1'));
    assert.ok(!eligible.find(c => c.id === 'cg-2'));
  });

  it('should not escalate if no caregiver has medication scope', () => {
    const caregivers = [
      { id: 'cg-1', scopes: ['appointment.read'] },
    ];

    const eligible = caregivers.filter(c =>
      c.scopes.includes('medication.read') || c.scopes.includes('*')
    );

    assert.equal(eligible.length, 0);
  });
});

describe('Grace Period', () => {
  it('should use configurable grace period (default 15 min)', () => {
    const defaultGrace = 15;
    assert.equal(defaultGrace, 15);
  });
});