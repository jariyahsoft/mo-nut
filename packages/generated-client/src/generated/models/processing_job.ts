/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type processing_job = {
    job_id: string;
    asset_id: string;
    job_type: processing_job.job_type;
    status: processing_job.status;
    provider_name: string;
    provider_model_version: string;
    retryable: boolean;
    draft_id: string | null;
    created_at: string;
    updated_at: string;
};
export namespace processing_job {
    export enum job_type {
        OCR = 'ocr',
        TRANSCRIPTION = 'transcription',
    }
    export enum status {
        QUEUED = 'queued',
        PROCESSING = 'processing',
        REVIEW_REQUIRED = 'review_required',
        COMPLETED = 'completed',
        FAILED = 'failed',
    }
}

