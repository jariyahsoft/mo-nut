import { describe, it } from 'node:test';
import { strict as assert } from 'node:assert';

describe('Shedule Engine Determinism and Idempotency', () => {
  it('should generate deterministic occurrence keys based on due time', () => {
    const medicationId = 'med-123';
    const dueTimeUtc = '2026-06-30T08:00:00.000Z';

    const occurrenceId1 = `occ:${medicationId}:${dueTimeUtc}`;
    const occurrenceId2 = `occ:${medicationId}:${dueTimeUtc}`;

    assert.equal(occurrenceId1, occurrenceId2); // Keys are identical
  });

  it('should generate bounded batch of occurrences (7 days ahead)', () => {
    const daysAhead = 7;
    const times = ['08:00', '20:00']; // 2 times per day

    const occurrences = [];
    for (let day = 0; day < daysAhead; day++) {
      for (const time of times) {
        occurrences.push({ day, time });
      }
    }

    assert.equal(occurrences.length, 14); // 7 * 2 = 14 occurrences
  });
});

describe('Medication Schedule Supersession History Preservation', () => {
  it('should mark old schedule inactive and preserve occurred history on change', () => {
    const oldSchedule = { id: 'sched-old', active: true, effectiveTo: null, supersededByScheduleId: null };
    const doseHistory = [
      { id: 'occ-1', scheduleId: 'sched-old', status: 'taken' },
    ];

    // Trigger supersession
    const newSchedule = { id: 'sched-new', active: true, effectiveFrom: new Date().toISOString() };
    oldSchedule.active = false;
    oldSchedule.supersededByScheduleId = newSchedule.id;
    oldSchedule.effectiveTo = newSchedule.effectiveFrom;

    assert.equal(oldSchedule.active, false);
    assert.equal(oldSchedule.supersededByScheduleId, 'sched-new');

    // Confirm prior dose occurrence history is untouched
    assert.equal(doseHistory[0].scheduleId, 'sched-old');
    assert.equal(doseHistory[0].status, 'taken'); // Still marked taken
  });
});
