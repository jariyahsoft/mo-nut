/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { create_patient_request } from '../models/create_patient_request';
import type { patch_patient_request } from '../models/patch_patient_request';
import type { patient_list_response } from '../models/patient_list_response';
import type { patient_response } from '../models/patient_response';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class PatientsService {
    /**
     * List the patients available in the active user context.
     * @param xCorrelationId Optional end-to-end correlation identifier.
     * @param limit
     * @param cursor
     * @returns patient_list_response Patient list retrieved.
     * @throws ApiError
     */
    public static listPatients(
        xCorrelationId?: string,
        limit: number = 20,
        cursor?: string,
    ): CancelablePromise<patient_list_response> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/patients',
            headers: {
                'X-Correlation-Id': xCorrelationId,
            },
            query: {
                'limit': limit,
                'cursor': cursor,
            },
            errors: {
                401: `Authentication is required.`,
            },
        });
    }
    /**
     * Create a patient profile for the authenticated account owner.
     * @param idempotencyKey
     * @param requestBody
     * @param xCorrelationId Optional end-to-end correlation identifier.
     * @returns patient_response Patient profile created.
     * @throws ApiError
     */
    public static createPatient(
        idempotencyKey: string,
        requestBody: create_patient_request,
        xCorrelationId?: string,
    ): CancelablePromise<patient_response> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/patients',
            headers: {
                'X-Correlation-Id': xCorrelationId,
                'Idempotency-Key': idempotencyKey,
            },
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                401: `Authentication is required.`,
                409: `The submitted entity version is stale.`,
                422: `The payload or domain fields are invalid.`,
            },
        });
    }
    /**
     * Get a patient profile and emergency details.
     * @param patientId
     * @param xCorrelationId Optional end-to-end correlation identifier.
     * @returns patient_response Patient profile retrieved.
     * @throws ApiError
     */
    public static getPatient(
        patientId: string,
        xCorrelationId?: string,
    ): CancelablePromise<patient_response> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/patients/{patient_id}',
            path: {
                'patient_id': patientId,
            },
            headers: {
                'X-Correlation-Id': xCorrelationId,
            },
            errors: {
                401: `Authentication is required.`,
                403: `The authenticated actor lacks the required role, scope, or consent.`,
            },
        });
    }
    /**
     * Update mutable patient profile fields using optimistic concurrency.
     * @param patientId
     * @param ifMatch Entity version token used for optimistic concurrency.
     * @param requestBody
     * @param xCorrelationId Optional end-to-end correlation identifier.
     * @returns patient_response Patient profile updated.
     * @throws ApiError
     */
    public static patchPatient(
        patientId: string,
        ifMatch: string,
        requestBody: patch_patient_request,
        xCorrelationId?: string,
    ): CancelablePromise<patient_response> {
        return __request(OpenAPI, {
            method: 'PATCH',
            url: '/patients/{patient_id}',
            path: {
                'patient_id': patientId,
            },
            headers: {
                'X-Correlation-Id': xCorrelationId,
                'If-Match': ifMatch,
            },
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                401: `Authentication is required.`,
                403: `The authenticated actor lacks the required role, scope, or consent.`,
                409: `The submitted entity version is stale.`,
                422: `The payload or domain fields are invalid.`,
            },
        });
    }
}
