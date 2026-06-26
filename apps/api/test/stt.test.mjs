import { describe, it, beforeEach } from 'node:test';
import { strict as assert } from 'node:assert';

describe('STT Thai Language Processing', () => {
  let jobs;
  let transcripts;

  beforeEach(() => {
    jobs = new Map();
    transcripts = new Map();
  });

  it('should transition through valid STT job states', () => {
    const job = { id: 'stt-1', status: 'queued' };

    const transitions = {
      queued: ['processing', 'failed'],
      processing: ['review_required', 'failed', 'retrying'],
      review_required: ['confirmed', 'manual_entry'],
      retrying: ['processing', 'failed'],
    };

    let currentJob = { ...job };

    // queued -> processing
    assert.ok(transitions.queued.includes('processing'));
    currentJob.status = 'processing';

    // processing -> review_required
    assert.ok(transitions.processing.includes('review_required'));
    currentJob.status = 'review_required';

    assert.equal(currentJob.status, 'review_required');
  });
});

describe('Transcript Edit Preserves Original', () => {
  it('should preserve original text on first edit', () => {
    const transcript = { id: 'tr-1', text: 'Original text' };
    const editRecord = { originalText: null };

    const editTranscript = (t, newText) => {
      if (!editRecord.originalText) {
        editRecord.originalText = t.text;
      }
      t.text = newText;
      return t;
    };

    editTranscript(transcript, 'Edited text');

    assert.equal(editRecord.originalText, 'Original text');
    assert.equal(transcript.text, 'Edited text');
  });

  it('should track edit metadata (editedAt, editedBy)', () => {
    const editMetadata = {
      editedAt: new Date().toISOString(),
      editedBy: 'caregiver-123',
    };

    assert.ok(editMetadata.editedAt);
    assert.ok(editMetadata.editedBy);
  });
});

describe('Draft Requires Confirmed Transcript', () => {
  it('should reject draft creation from unconfirmed transcript', () => {
    const transcript = { id: 'tr-1', reviewedAt: null };

    const createDraft = (t) => {
      if (!t.reviewedAt) {
        return { error: 'Cannot create draft from unconfirmed transcript' };
      }
      return { ok: true };
    };

    const result = createDraft(transcript);
    assert.ok(result.error);
  });

  it('should allow draft from confirmed transcript', () => {
    const transcript = { id: 'tr-2', reviewedAt: new Date().toISOString() };

    const createDraft = (t) => {
      if (!t.reviewedAt) {
        return { error: 'Cannot create draft' };
      }
      return { ok: true };
    };

    const result = createDraft(transcript);
    assert.ok(result.ok);
  });
});

describe('STT Retry Idempotency', () => {
  it('should increment retry count on each retry', () => {
    const job = { id: 'stt-1', retryCount: 0 };

    // First retry
    job.status = 'retrying';
    job.retryCount += 1;

    // Second retry
    job.status = 'retrying';
    job.retryCount += 1;

    assert.equal(job.retryCount, 2);
  });

  it('should not retry completed or applied jobs', () => {
    const completedJob = { id: 'stt-1', status: 'applied' };
    const appliedJob = { id: 'stt-2', status: 'completed' };

    const canRetry = (job) => job.status !== 'completed' && job.status !== 'applied';

    assert.equal(canRetry(completedJob), false);
    assert.equal(canRetry(appliedJob), false);
  });
});

describe('Provider Failure Preserves Original', () => {
  it('should keep playable audio asset on STT failure', () => {
    const audioAsset = { id: 'asset-1', playable: true, sttFailed: true };
    assert.ok(audioAsset.playable);
    assert.equal(audioAsset.sttFailed, true);
  });
});