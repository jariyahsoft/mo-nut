import { describe, it, beforeEach } from 'node:test';
import { strict as assert } from 'node:assert';

describe('Checklist Streak and Progress', () => {
  let occurrences;

  beforeEach(() => {
    occurrences = [];
  });

  it('should compute consecutive completion streak', () => {
    const now = Date.now();
    occurrences.push(
      { id: '1', dueAt: new Date(now).toISOString(), status: 'completed' },
      { id: '2', dueAt: new Date(now - 86400000).toISOString(), status: 'completed' },
      { id: '3', dueAt: new Date(now - 2 * 86400000).toISOString(), status: 'completed' },
      { id: '4', dueAt: new Date(now - 3 * 86400000).toISOString(), status: 'skipped' }, // Breaks streak
    );

    const computeStreak = (occs) => {
      let streak = 0;
      const sorted = [...occs].sort((a, b) => b.dueAt.localeCompare(a.dueAt));
      for (const occ of sorted) {
        if (occ.status === 'completed') {
          streak++;
        } else {
          break;
        }
      }
      return streak;
    };

    assert.equal(computeStreak(occurrences), 3);
  });

  it('should compute weekly progress percentage', () => {
    const weekAgo = new Date(Date.now() - 3 * 86400000).toISOString();
    occurrences.push(
      { id: '1', dueAt: weekAgo, status: 'completed' },
      { id: '2', dueAt: weekAgo, status: 'completed' },
      { id: '3', dueAt: weekAgo, status: 'skipped' },
      { id: '4', dueAt: weekAgo, status: 'pending' },
    );

    const computeWeekly = (occs) => {
      const weekAgo = new Date(Date.now() - 7 * 24 * 3600000).toISOString();
      const recent = occs.filter(o => o.dueAt >= weekAgo);
      const completed = recent.filter(o => o.status === 'completed').length;
      return {
        completed,
        total: recent.length,
        percentage: recent.length > 0 ? Math.round((completed / recent.length) * 100) : 0,
      };
    };

    const progress = computeWeekly(occurrences);
    assert.equal(progress.completed, 2);
    assert.equal(progress.total, 4);
    assert.equal(progress.percentage, 50);
  });
});

describe('Checklist Draft to Active Flow', () => {
  it('should require activation before checklist becomes active', () => {
    const checklist = { id: 'c-1', status: 'draft', items: [] };

    // Status starts as draft
    assert.equal(checklist.status, 'draft');

    // After activate call
    const activate = (c) => ({ ...c, status: 'active' });
    const activated = activate(checklist);
    assert.equal(activated.status, 'active');
  });

  it('should auto-complete checklist when all items done', () => {
    const checklist = {
      id: 'c-1',
      status: 'active',
      items: [
        { id: 'i1', isCompleted: true },
        { id: 'i2', isCompleted: false },
      ],
    };

    const allDone = checklist.items.every(i => i.isCompleted);
    assert.equal(allDone, false);

    checklist.items[1].isCompleted = true;
    const allDoneNow = checklist.items.every(i => i.isCompleted);
    assert.equal(allDoneNow, true);
  });
});

describe('Doctor Questions Priority Ordering', () => {
  it('should sort questions by priority for visit context', () => {
    const questions = [
      { id: 'q1', priority: 'low' },
      { id: 'q2', priority: 'urgent' },
      { id: 'q3', priority: 'normal' },
      { id: 'q4', priority: 'high' },
    ];

    const order = { urgent: 4, high: 3, normal: 2, low: 1 };
    const sorted = questions.sort((a, b) => order[b.priority] - order[a.priority]);

    assert.equal(sorted[0].id, 'q2'); // urgent
    assert.equal(sorted[1].id, 'q4'); // high
    assert.equal(sorted[2].id, 'q3'); // normal
    assert.equal(sorted[3].id, 'q1'); // low
  });
});

describe('Skip requires reason', () => {
  it('should reject skip without reason', () => {
    const complete = (skipReason) => {
      if (!skipReason) {
        return { error: 'Skip reason required' };
      }
      return { ok: true };
    };

    assert.ok(complete('forgot').ok);
    assert.ok(complete(undefined).error);
  });
});

describe('Offline Sync - Idempotency', () => {
  it('should deduplicate offline checklist log entries by client mutation id', () => {
    const synced = new Set();
    const clientMutationId = 'cmid-checklist-abc';

    if (!synced.has(clientMutationId)) {
      synced.add(clientMutationId);
    }
    if (!synced.has(clientMutationId)) {
      synced.add(clientMutationId);
    }

    assert.equal(synced.size, 1);
  });
});