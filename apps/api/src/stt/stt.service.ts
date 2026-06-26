import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { Transcript, TranscriptSegment, ProcessingJob, ExtractedDraft, initMetadata, updateMetadata } from '@mo-nut/domain';

export interface SttRequest {
  audioRecordId: string;
  patientId: string;
  language: string;
  glossary?: string[];
}

@Injectable()
export class SttService {
  private transcripts: Map<string, Transcript> = new Map();
  private jobs: Map<string, ProcessingJob> = new Map();
  private drafts: Map<string, ExtractedDraft> = new Map();
  private edits: Map<string, { editedAt: string; editedBy: string; originalText: string }> = new Map();

  /**
   * Start STT job for an audio record. Async processing in mock.
   */
  async createSttJob(req: SttRequest): Promise<ProcessingJob> {
    const id = `stt-job-${Date.now()}`;
    const job: ProcessingJob = {
      ...initMetadata(),
      assetId: req.audioRecordId,
      patientId: req.patientId,
      jobType: 'stt',
      provider: 'mock_thai_stt',
      status: 'queued',
      retryCount: 0,
    };

    this.jobs.set(id, job);

    // Async simulation
    process.nextTick(() => this.runSttProcessing(id, req.language));

    return job;
  }

  /**
   * Simulate STT processing with Thai language.
   */
  private async runSttProcessing(jobId: string, language: string) {
    const job = this.jobs.get(jobId);
    if (!job) return;

    job.status = 'processing';
    this.jobs.set(jobId, job);

    await new Promise(r => setTimeout(r, 50));

    // Simulate success
    job.status = 'review_required';
    job.completedAt = new Date().toISOString();
    job.version += 1;
    this.jobs.set(jobId, job);

    // Generate transcript
    const transcriptId = `tr-${jobId}`;
    const transcript: Transcript = {
      ...initMetadata(),
      audioId: job.assetId,
      patientId: job.patientId,
      text: 'ผู้ป่วยรายงานอาการปวดหัวเล็กน้อย ไม่มีไข้ กินอาหารได้ปกติ',
      segments: [
        { startTime: 0, endTime: 5, text: 'ผู้ป่วยรายงานอาการปวดหัวเล็กน้อย', confidence: 0.95 },
        { startTime: 5, endTime: 10, text: 'ไม่มีไข้', confidence: 0.92 },
        { startTime: 10, endTime: 15, text: 'กินอาหารได้ปกติ', confidence: 0.96 },
      ],
      language,
    };
    this.transcripts.set(transcriptId, transcript);
  }

  /**
   * Get job status
   */
  async getJob(id: string): Promise<ProcessingJob | null> {
    return this.jobs.get(id) || null;
  }

  /**
   * Get transcript by job
   */
  async getTranscriptByJobId(jobId: string): Promise<Transcript | null> {
    for (const t of this.transcripts.values()) {
      if (t.audioId && this.jobs.get(jobId)?.assetId === t.audioId) {
        return t;
      }
    }
    return null;
  }

  /**
   * Edit transcript with mandatory original preservation
   */
  async editTranscript(id: string, actorId: string, newText: string): Promise<Transcript> {
    const transcript = this.transcripts.get(id);
    if (!transcript) throw new NotFoundException(`Transcript ${id} not found`);

    // Save original on first edit
    if (!this.edits.has(id)) {
      this.edits.set(id, {
        editedAt: new Date().toISOString(),
        editedBy: actorId,
        originalText: transcript.text,
      });
    }

    transcript.text = newText;
    transcript.version += 1;
    transcript.updatedAt = new Date().toISOString();
    this.transcripts.set(id, transcript);
    return transcript;
  }

  /**
   * Confirm transcript (allows clinical data creation)
   */
  async confirmTranscript(id: string, actorId: string): Promise<Transcript> {
    const transcript = this.transcripts.get(id);
    if (!transcript) throw new NotFoundException(`Transcript ${id} not found`);

    transcript.reviewedAt = new Date().toISOString();
    transcript.reviewedBy = actorId;
    transcript.version += 1;
    transcript.updatedAt = new Date().toISOString();
    this.transcripts.set(id, transcript);
    return transcript;
  }

  /**
   * Generate draft from confirmed transcript
   */
  async createDraftFromTranscript(transcriptId: string, patientId: string): Promise<ExtractedDraft> {
    const transcript = this.transcripts.get(transcriptId);
    if (!transcript) throw new NotFoundException(`Transcript ${transcriptId} not found`);

    if (!transcript.reviewedAt) {
      throw new BadRequestException('Cannot create draft from unconfirmed transcript. Confirm first.');
    }

    const id = `drf-${Date.now()}`;
    const draft: ExtractedDraft = {
      ...initMetadata(),
      jobId: transcriptId,
      patientId,
      targetType: 'visit_notes',
      payload: {
        text: transcript.text,
        segments: transcript.segments,
      },
      confidence: 0.92,
      reviewStatus: 'pending',
    };

    this.drafts.set(id, draft);
    return draft;
  }

  /**
   * Retry STT job (idempotent)
   */
  async retryJob(jobId: string): Promise<ProcessingJob> {
    const job = this.jobs.get(jobId);
    if (!job) throw new NotFoundException(`Job ${jobId} not found`);

    if (job.status === 'applied' || job.status === 'confirmed') {
      return job; // No-op
    }

    job.status = 'retrying';
    job.retryCount += 1;
    job.version += 1;
    job.updatedAt = new Date().toISOString();
    this.jobs.set(jobId, job);

    // Retry
    process.nextTick(() => this.runSttProcessing(jobId, 'th'));

    return job;
  }

  /**
   * Get original transcript (for review audit)
   */
  async getOriginalTranscript(id: string): Promise<string | null> {
    return this.edits.get(id)?.originalText || null;
  }
}