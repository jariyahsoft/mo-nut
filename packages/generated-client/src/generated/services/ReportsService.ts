/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { command_ack_response } from '../models/command_ack_response';
import type { create_report_request } from '../models/create_report_request';
import type { create_share_link_request } from '../models/create_share_link_request';
import type { public_share_response } from '../models/public_share_response';
import type { report_response } from '../models/report_response';
import type { share_link_response } from '../models/share_link_response';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class ReportsService {
    /**
     * Request asynchronous report generation for selected scopes.
     * @param patientId
     * @param idempotencyKey
     * @param requestBody
     * @returns report_response Report job accepted.
     * @throws ApiError
     */
    public static createReport(
        patientId: string,
        idempotencyKey: string,
        requestBody: create_report_request,
    ): CancelablePromise<report_response> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/patients/{patient_id}/reports',
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
            },
        });
    }
    /**
     * Get the current report job status.
     * @param reportId
     * @returns report_response Report status retrieved.
     * @throws ApiError
     */
    public static getReport(
        reportId: string,
    ): CancelablePromise<report_response> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/reports/{report_id}',
            path: {
                'report_id': reportId,
            },
            errors: {
                401: `Authentication is required.`,
                403: `The authenticated actor lacks the required role, scope, or consent.`,
            },
        });
    }
    /**
     * Create an expiring share link for approved report scopes.
     * @param patientId
     * @param idempotencyKey
     * @param requestBody
     * @returns share_link_response Share link created.
     * @throws ApiError
     */
    public static createShareLink(
        patientId: string,
        idempotencyKey: string,
        requestBody: create_share_link_request,
    ): CancelablePromise<share_link_response> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/patients/{patient_id}/share-links',
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
            },
        });
    }
    /**
     * Revoke a share link immediately.
     * @param shareLinkId
     * @returns command_ack_response Share link revocation accepted.
     * @throws ApiError
     */
    public static revokeShareLink(
        shareLinkId: string,
    ): CancelablePromise<command_ack_response> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/share-links/{share_link_id}',
            path: {
                'share_link_id': shareLinkId,
            },
            errors: {
                401: `Authentication is required.`,
                403: `The authenticated actor lacks the required role, scope, or consent.`,
            },
        });
    }
    /**
     * Resolve a public share link token without exposing patient identity when inactive.
     * @param shareToken
     * @returns public_share_response Shared report access granted.
     * @throws ApiError
     */
    public static getPublicShare(
        shareToken: string,
    ): CancelablePromise<public_share_response> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/share-links/public/{share_token}',
            path: {
                'share_token': shareToken,
            },
            errors: {
                410: `The share link expired and exposes no patient data.`,
                423: `The share link was revoked and exposes no patient data.`,
            },
        });
    }
}
