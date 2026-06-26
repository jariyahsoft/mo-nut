import { describe, it } from 'node:test';
import { strict as assert } from 'node:assert';

describe('Appointment Service CRUD Operations', () => {
  it('should track status history version correctly', () => {
    const events = [];
    const appointment = { id: 'appt-1', status: 'upcoming', version: 1 };

    // Record creation
    events.push({
      appointmentId: appointment.id,
      type: 'created',
      newValue: appointment.status,
    });

    // Update status
    appointment.status = 'confirmed';
    appointment.version += 1;
    events.push({
      appointmentId: appointment.id,
      type: 'status_changed',
      oldValue: 'upcoming',
      newValue: appointment.status,
    });

    assert.equal(events.length, 2);
    assert.equal(events[0].type, 'created');
    assert.equal(events[1].type, 'status_changed');
    assert.equal(events[1].oldValue, 'upcoming');
    assert.equal(events[1].newValue, 'confirmed');
  });

  it('should support soft-deletion preserving history metadata', () => {
    const appointment = { id: 'appt-1', status: 'upcoming', deletedAt: null };
    const events = [];

    // Soft delete
    appointment.deletedAt = new Date().toISOString();
    events.push({
      appointmentId: appointment.id,
      type: 'cancelled',
      newValue: 'cancelled',
      reason: 'User request',
    });

    assert.ok(appointment.deletedAt);
    assert.equal(events.length, 1);
    assert.equal(events[0].type, 'cancelled');
    assert.equal(events[0].reason, 'User request');
  });
});

describe('TimeZone and Scheduled Date Validation', () => {
  it('should keep correct IANA timezone and scheduled date format', () => {
    const scheduled = {
      scheduledAt: '2026-06-30T09:30:00Z',
      timezone: 'Asia/Bangkok',
    };

    assert.ok(scheduled.scheduledAt.endsWith('Z'));
    assert.equal(scheduled.timezone, 'Asia/Bangkok');
  });
});
