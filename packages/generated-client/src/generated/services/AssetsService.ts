/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { asset_upload_response } from '../models/asset_upload_response';
import type { command_ack_response } from '../models/command_ack_response';
import type { confirm_processing_draft_request } from '../models/confirm_processing_draft_request';
import type { create_asset_upload_request } from '../models/create_asset_upload_request';
import type { processing_job_response } from '../models/processing_job_response';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class AssetsService {
    /**
     * Create asset metadata and request a signed upload target.
     * @param patientId
     * @param idempotencyKey
     * @param requestBody
     * @returns asset_upload_response Asset metadata created and upload target issued.
     * @throws ApiError
     */
    public static createAssetUpload(
        patientId: string,
        idempotencyKey: string,
        requestBody: create_asset_upload_request,
    ): CancelablePromise<asset_upload_response> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/patients/{patient_id}/assets',
            path: {
                'patient_id': patientId,
            },
            headers: {
                'Idempotency-Key': idempotencyKey,
            },
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                401: `Authentication is required.`,
                403: `The authenticated actor lacks the required role, scope, or consent.`,
                422: `The payload or domain fields are invalid.`,
            },
        });
    }
    /**
     * Start an OCR processing job for an uploaded asset.
     * @param assetId
     * @param idempotencyKey
     * @returns processing_job_response OCR job accepted.
     * @throws ApiError
     */
    public static createOcrJob(
        assetId: string,
        idempotencyKey: string,
    ): CancelablePromise<processing_job_response> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/assets/{asset_id}/ocr-jobs',
            path: {
                'asset_id': assetId,
            },
            headers: {
                'Idempotency-Key': idempotencyKey,
            },
            errors: {
                401: `Authentication is required.`,
                403: `The authenticated actor lacks the required role, scope, or consent.`,
                503: `The upstream provider or processing adapter is unavailable or failed.`,
            },
        });
    }
    /**
     * Start a transcription job for an uploaded audio asset.
     * @param assetId
     * @param idempotencyKey
     * @returns processing_job_response Transcription job accepted.
     * @throws ApiError
     */
    public static createTranscriptionJob(
        assetId: string,
        idempotencyKey: string,
    ): CancelablePromise<processing_job_response> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/assets/{asset_id}/transcription-jobs',
            path: {
                'asset_id': assetId,
            },
            headers: {
                'Idempotency-Key': idempotencyKey,
            },
            errors: {
                401: `Authentication is required.`,
                403: `The authenticated actor lacks the required role, scope, or consent.`,
                503: `The upstream provider or processing adapter is unavailable or failed.`,
            },
        });
    }
    /**
     * Get the status of one OCR or transcription job.
     * @param jobId
     * @returns processing_job_response Job status retrieved.
     * @throws ApiError
     */
    public static getProcessingJob(
        jobId: string,
    ): CancelablePromise<processing_job_response> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/processing-jobs/{job_id}',
            path: {
                'job_id': jobId,
            },
            errors: {
                401: `Authentication is required.`,
                403: `The authenticated actor lacks the required role, scope, or consent.`,
            },
        });
    }
    /**
     * Confirm a reviewed OCR or transcription draft before applying it.
     * @param draftId
     * @param idempotencyKey
     * @param requestBody
     * @returns command_ack_response Draft confirmed.
     * @throws ApiError
     */
    public static confirmProcessingDraft(
        draftId: string,
        idempotencyKey: string,
        requestBody: confirm_processing_draft_request,
    ): CancelablePromise<command_ack_response> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/processing-drafts/{draft_id}/confirm',
            path: {
                'draft_id': draftId,
            },
            headers: {
                'Idempotency-Key': idempotencyKey,
            },
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                401: `Authentication is required.`,
                403: `The authenticated actor lacks the required role, scope, or consent.`,
            },
        });
    }
}
