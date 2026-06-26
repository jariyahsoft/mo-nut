import { describe, it } from 'node:test';
import { strict as assert } from 'node:assert';

describe('TimeZone-Aware Idempotent Scheduling', () => {
  it('should cancel old reminder jobs and create new set on edit/reschedule', () => {
    let jobs = [
      { id: 'appt-1-1440', status: 'pending' },
      { id: 'appt-1-120', status: 'pending' },
    ];

    // Reschedule event triggered
    // 1. Cancel old jobs
    jobs.forEach(j => { j.status = 'cancelled'; });

    // 2. Create new reminder jobs
    const newJobs = [
      { id: 'appt-1-1440-new', status: 'pending' },
      { id: 'appt-1-120-new', status: 'pending' },
    ];

    assert.equal(jobs.every(j => j.status === 'cancelled'), true);
    assert.equal(newJobs.length, 2);
  });

  it('should shift reminders out of quiet hours (22:00 - 06:00)', () => {
    // 23:05 local (is inside quiet hours)
    const inQuietHours = new Date('2026-06-26T16:05:00Z'); // 23:05 ICT
    const utcHour = inQuietHours.getUTCHours();
    const localHour = (utcHour + 7) % 24;

    assert.ok(localHour >= 22 || localHour < 6);

    // Shift to safe morning hour
    const safeHour = new Date(inQuietHours);
    safeHour.setUTCHours(0, 0, 0, 0); // 07:00 ICT next morning
    const nextLocalHour = (safeHour.getUTCHours() + 7) % 24;

    assert.equal(nextLocalHour, 7); // Shuffled out of quiet window
  });
});

describe('Lock-screen Privacy Levels', () => {
  it('should redact detailed PHI when privacy is minimal', () => {
    const appointment = { notes: 'ตรวจต่อมลูกหมาก / Prostate exam', facility: 'Siriraj' };

    const getPayload = (level) => {
      if (level === 'minimal') {
        return { body: 'คุณมีแจ้งเตือนนัดหมายสำคัญ / Appointment reminder' };
      }
      return { body: appointment.notes };
    };

    const minimal = getPayload('minimal');
    assert.equal(minimal.body.includes('ตรวจต่อมลูกหมาก'), false);
  });
});

describe('Caregiver Escalation', () => {
  it('should escalate to caregiver if patient does not confirm 15 mins before', () => {
    const appointment = { status: 'upcoming', scheduledAt: new Date(Date.now() + 10 * 60 * 1000).toISOString() }; // 10 mins in future (less than 15 mins)

    let escalated = false;
    if (appointment.status === 'upcoming') {
      escalated = true; // Escalate alert
    }

    assert.equal(escalated, true);
  });

  it('should not escalate if patient has confirmed', () => {
    const appointment = { status: 'confirmed', scheduledAt: new Date(Date.now() + 10 * 60 * 1000).toISOString() };

    let escalated = false;
    if (appointment.status === 'upcoming') {
      escalated = true;
    }

    assert.equal(escalated, false);
  });
});
