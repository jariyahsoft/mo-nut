/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { create_medication_request } from '../models/create_medication_request';
import type { create_medication_schedule_request } from '../models/create_medication_schedule_request';
import type { dose_action_request } from '../models/dose_action_request';
import type { dose_correction_request } from '../models/dose_correction_request';
import type { dose_list_response } from '../models/dose_list_response';
import type { dose_response } from '../models/dose_response';
import type { medication_list_response } from '../models/medication_list_response';
import type { medication_response } from '../models/medication_response';
import type { medication_schedule_list_response } from '../models/medication_schedule_list_response';
import type { medication_schedule_response } from '../models/medication_schedule_response';
import type { patch_medication_request } from '../models/patch_medication_request';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class MedicationsService {
    /**
     * List medications for a patient.
     * @param patientId
     * @returns medication_list_response Medications retrieved.
     * @throws ApiError
     */
    public static listMedications(
        patientId: string,
    ): CancelablePromise<medication_list_response> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/patients/{patient_id}/medications',
            path: {
                'patient_id': patientId,
            },
            errors: {
                401: `Authentication is required.`,
                403: `The authenticated actor lacks the required role, scope, or consent.`,
            },
        });
    }
    /**
     * Create a medication record.
     * @param patientId
     * @param idempotencyKey
     * @param requestBody
     * @returns medication_response Medication created.
     * @throws ApiError
     */
    public static createMedication(
        patientId: string,
        idempotencyKey: string,
        requestBody: create_medication_request,
    ): CancelablePromise<medication_response> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/patients/{patient_id}/medications',
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
     * Get a medication record.
     * @param medicationId
     * @returns medication_response Medication retrieved.
     * @throws ApiError
     */
    public static getMedication(
        medicationId: string,
    ): CancelablePromise<medication_response> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/medications/{medication_id}',
            path: {
                'medication_id': medicationId,
            },
            errors: {
                401: `Authentication is required.`,
                403: `The authenticated actor lacks the required role, scope, or consent.`,
            },
        });
    }
    /**
     * Update mutable medication fields with optimistic concurrency.
     * @param medicationId
     * @param ifMatch Entity version token used for optimistic concurrency.
     * @param requestBody
     * @returns medication_response Medication updated.
     * @throws ApiError
     */
    public static patchMedication(
        medicationId: string,
        ifMatch: string,
        requestBody: patch_medication_request,
    ): CancelablePromise<medication_response> {
        return __request(OpenAPI, {
            method: 'PATCH',
            url: '/medications/{medication_id}',
            path: {
                'medication_id': medicationId,
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
                422: `The payload or domain fields are invalid.`,
            },
        });
    }
    /**
     * List schedules for a medication, including immutable history.
     * @param medicationId
     * @returns medication_schedule_list_response Schedules retrieved.
     * @throws ApiError
     */
    public static listMedicationSchedules(
        medicationId: string,
    ): CancelablePromise<medication_schedule_list_response> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/medications/{medication_id}/schedules',
            path: {
                'medication_id': medicationId,
            },
            errors: {
                401: `Authentication is required.`,
                403: `The authenticated actor lacks the required role, scope, or consent.`,
            },
        });
    }
    /**
     * Create a new medication schedule revision.
     * @param medicationId
     * @param idempotencyKey
     * @param requestBody
     * @returns medication_schedule_response Schedule created.
     * @throws ApiError
     */
    public static createMedicationSchedule(
        medicationId: string,
        idempotencyKey: string,
        requestBody: create_medication_schedule_request,
    ): CancelablePromise<medication_schedule_response> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/medications/{medication_id}/schedules',
            path: {
                'medication_id': medicationId,
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
     * List dose occurrences for a patient.
     * @param patientId
     * @param limit
     * @param cursor
     * @returns dose_list_response Doses retrieved.
     * @throws ApiError
     */
    public static listDoses(
        patientId: string,
        limit: number = 20,
        cursor?: string,
    ): CancelablePromise<dose_list_response> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/patients/{patient_id}/doses',
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
     * Submit an idempotent dose action for one occurrence.
     * Repeating the same Idempotency-Key with the same payload returns the original result.
     * @param doseId
     * @param idempotencyKey
     * @param requestBody
     * @returns dose_response Dose action applied or returned from idempotency storage.
     * @throws ApiError
     */
    public static submitDoseAction(
        doseId: string,
        idempotencyKey: string,
        requestBody: dose_action_request,
    ): CancelablePromise<dose_response> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/doses/{dose_id}/actions',
            path: {
                'dose_id': doseId,
            },
            headers: {
                'Idempotency-Key': idempotencyKey,
            },
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                401: `Authentication is required.`,
                403: `The authenticated actor lacks the required role, scope, or consent.`,
                409: `The same Idempotency-Key was reused with a different payload.`,
                422: `The payload or domain fields are invalid.`,
            },
        });
    }
    /**
     * Apply an audited correction to a past dose status.
     * @param doseId
     * @param idempotencyKey
     * @param requestBody
     * @returns dose_response Dose corrected with audit-safe fields.
     * @throws ApiError
     */
    public static correctDose(
        doseId: string,
        idempotencyKey: string,
        requestBody: dose_correction_request,
    ): CancelablePromise<dose_response> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/doses/{dose_id}/corrections',
            path: {
                'dose_id': doseId,
            },
            headers: {
                'Idempotency-Key': idempotencyKey,
            },
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                401: `Authentication is required.`,
                403: `The authenticated actor lacks the required role, scope, or consent.`,
                409: `The same Idempotency-Key was reused with a different payload.`,
                422: `The payload or domain fields are invalid.`,
            },
        });
    }
}
