/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { command_ack_response } from '../models/command_ack_response';
import type { create_measurement_request } from '../models/create_measurement_request';
import type { measurement_list_response } from '../models/measurement_list_response';
import type { measurement_response } from '../models/measurement_response';
import type { measurement_summary_response } from '../models/measurement_summary_response';
import type { patch_measurement_request } from '../models/patch_measurement_request';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class HealthService {
    /**
     * List typed measurements for a patient.
     * @param patientId
     * @param limit
     * @param cursor
     * @returns measurement_list_response Measurements retrieved.
     * @throws ApiError
     */
    public static listMeasurements(
        patientId: string,
        limit: number = 20,
        cursor?: string,
    ): CancelablePromise<measurement_list_response> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/patients/{patient_id}/measurements',
            path: {
                'patient_id': patientId,
            },
            query: {
                'limit': limit,
                'cursor': cursor,
            },
            errors: {
                401: `Authentication is required.`,
                403: `The authenticated actor lacks the required role, scope, or consent.`,
            },
        });
    }
    /**
     * Create a typed health measurement entry.
     * @param patientId
     * @param idempotencyKey
     * @param requestBody
     * @returns measurement_response Measurement created.
     * @throws ApiError
     */
    public static createMeasurement(
        patientId: string,
        idempotencyKey: string,
        requestBody: create_measurement_request,
    ): CancelablePromise<measurement_response> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/patients/{patient_id}/measurements',
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
                422: `The measurement unit or value is outside the accepted validation range.`,
            },
        });
    }
    /**
     * Get one measurement entry.
     * @param measurementId
     * @returns measurement_response Measurement retrieved.
     * @throws ApiError
     */
    public static getMeasurement(
        measurementId: string,
    ): CancelablePromise<measurement_response> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/measurements/{measurement_id}',
            path: {
                'measurement_id': measurementId,
            },
            errors: {
                401: `Authentication is required.`,
                403: `The authenticated actor lacks the required role, scope, or consent.`,
            },
        });
    }
    /**
     * Update a measurement entry.
     * @param measurementId
     * @param ifMatch Entity version token used for optimistic concurrency.
     * @param requestBody
     * @returns measurement_response Measurement updated.
     * @throws ApiError
     */
    public static patchMeasurement(
        measurementId: string,
        ifMatch: string,
        requestBody: patch_measurement_request,
    ): CancelablePromise<measurement_response> {
        return __request(OpenAPI, {
            method: 'PATCH',
            url: '/measurements/{measurement_id}',
            path: {
                'measurement_id': measurementId,
            },
            headers: {
                'If-Match': ifMatch,
            },
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                401: `Authentication is required.`,
                403: `The authenticated actor lacks the required role, scope, or consent.`,
                409: `The submitted entity version is stale.`,
                422: `The measurement unit or value is outside the accepted validation range.`,
            },
        });
    }
    /**
     * Delete a measurement entry.
     * @param measurementId
     * @returns command_ack_response Deletion accepted.
     * @throws ApiError
     */
    public static deleteMeasurement(
        measurementId: string,
    ): CancelablePromise<command_ack_response> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/measurements/{measurement_id}',
            path: {
                'measurement_id': measurementId,
            },
            errors: {
                401: `Authentication is required.`,
                403: `The authenticated actor lacks the required role, scope, or consent.`,
            },
        });
    }
    /**
     * Get measurement summary and recent trend metadata.
     * @param patientId
     * @returns measurement_summary_response Measurement summary retrieved.
     * @throws ApiError
     */
    public static getMeasurementSummary(
        patientId: string,
    ): CancelablePromise<measurement_summary_response> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/patients/{patient_id}/measurements/summary',
            path: {
                'patient_id': patientId,
            },
            errors: {
                401: `Authentication is required.`,
                403: `The authenticated actor lacks the required role, scope, or consent.`,
            },
        });
    }
}
