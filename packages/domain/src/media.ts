import { EntityMetadata, SoftDeletable, DataSource } from './metadata.js';

/**
 * Document Assets, Processing Jobs, and AI Extractions
 */

export type AssetCategory =
  | 'prescription'
  | 'lab_result'
  | 'medical_record'
  | 'insurance'
  | 'id_document'
  | 'other';

export type AssetStatus =
  | 'uploaded'
  | 'processing'
  | 'ready'
  | 'failed'
  | 'archived';

export interface DocumentAsset extends EntityMetadata, SoftDeletable {
  patientId: string;
  objectKey: string; // Storage path, never a signed URL
  mimeType: string;
  category: AssetCategory;
  fileSize: number;
  checksum: string; // SHA-256
  status: AssetStatus;
  originalFilename?: string;
  uploadedBy: string; // User ID
}

export type JobType = 'ocr' | 'stt' | 'ai_extract';
export type JobStatus =
  | 'uploaded'
  | 'queued'
  | 'processing'
  | 'review_required'
  | 'confirmed'
  | 'applied'
  | 'failed'
  | 'retrying'
  | 'manual_entry';

export interface ProcessingJob extends EntityMetadata {
  assetId: string;
  patientId: string; // Denormalized for queries
  jobType: JobType;
  provider: string; // e.g., 'gcp_document_ai', 'openai_whisper'
  modelVersion?: string;
  status: JobStatus;
  resultRef?: string; // Reference to result storage
  errorMessage?: string;
  retryCount: number;
  nextRetryAt?: string; // ISO 8601 UTC
  completedAt?: string;
}

export type ReviewStatus = 'pending' | 'approved' | 'rejected' | 'edited';

export interface ExtractedDraft extends EntityMetadata {
  jobId: string;
  patientId: string; // Denormalized
  targetType: string; // e.g., 'medication', 'appointment', 'measurement'
  payload: Record<string, unknown>; // Extracted data structure
  confidence: number; // 0-1
  reviewStatus: ReviewStatus;
  reviewedBy?: string; // User ID
  reviewedAt?: string;
  appliedAt?: string;
}

export interface AudioRecord extends EntityMetadata, SoftDeletable {
  patientId: string;
  visitId?: string; // Optional appointment reference
  assetId: string; // Reference to DocumentAsset
  durationSeconds: number;
  consentConfirmedAt?: string; // ISO 8601 UTC
  consentConfirmedBy?: string; // User ID
}

export interface TranscriptSegment {
  startTime: number; // Seconds
  endTime: number;
  text: string;
  confidence?: number;
}

export interface Transcript extends EntityMetadata {
  audioId: string;
  patientId: string; // Denormalized
  text: string; // Full transcript
  segments: TranscriptSegment[];
  language: string; // ISO 639-1 code
  reviewedAt?: string;
  reviewedBy?: string;
}

export interface DocumentAssetRepository {
  findById(id: string): Promise<DocumentAsset | null>;
  listPatientAssets(
    patientId: string,
    options?: {
      category?: AssetCategory;
      status?: AssetStatus;
      limit?: number;
      cursor?: string;
    }
  ): Promise<{ assets: DocumentAsset[]; nextCursor?: string }>;
  create(asset: DocumentAsset): Promise<DocumentAsset>;
  update(asset: DocumentAsset): Promise<DocumentAsset>;
  softDelete(id: string, deletedBy?: string): Promise<void>;
}

export interface ProcessingJobRepository {
  findById(id: string): Promise<ProcessingJob | null>;
  findByAssetId(assetId: string): Promise<ProcessingJob[]>;
  listPendingJobs(
    jobType?: JobType,
    limit?: number
  ): Promise<ProcessingJob[]>;
  create(job: ProcessingJob): Promise<ProcessingJob>;
  update(job: ProcessingJob): Promise<ProcessingJob>;
  /**
   * Transition job status with validation
   * Returns error if transition is invalid
   */
  transitionStatus(
    jobId: string,
    newStatus: JobStatus,
    errorMessage?: string
  ): Promise<{ job: ProcessingJob; error?: string }>;
}

export interface ExtractedDraftRepository {
  findById(id: string): Promise<ExtractedDraft | null>;
  findByJobId(jobId: string): Promise<ExtractedDraft[]>;
  listPendingReview(
    patientId: string,
    targetType?: string
  ): Promise<ExtractedDraft[]>;
  create(draft: ExtractedDraft): Promise<ExtractedDraft>;
  update(draft: ExtractedDraft): Promise<ExtractedDraft>;
}

export interface AudioRecordRepository {
  findById(id: string): Promise<AudioRecord | null>;
  listPatientRecordings(patientId: string): Promise<AudioRecord[]>;
  create(record: AudioRecord): Promise<AudioRecord>;
  update(record: AudioRecord): Promise<AudioRecord>;
  softDelete(id: string, deletedBy?: string): Promise<void>;
}

export interface TranscriptRepository {
  findById(id: string): Promise<Transcript | null>;
  findByAudioId(audioId: string): Promise<Transcript | null>;
  create(transcript: Transcript): Promise<Transcript>;
  update(transcript: Transcript): Promise<Transcript>;
}
