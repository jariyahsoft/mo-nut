/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { create_sos_request } from '../models/create_sos_request';
import type { emergency_profile_response } from '../models/emergency_profile_response';
import type { sos_response } from '../models/sos_response';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class SosService {
    /**
     * Initiate an SOS event with per-channel delivery status.
     * @param patientId
     * @param idempotencyKey
     * @param requestBody
     * @returns sos_response SOS accepted with immediate delivery attempt results.
     * @throws ApiError
     */
    public static createSosEvent(
        patientId: string,
        idempotencyKey: string,
        requestBody: create_sos_request,
    ): CancelablePromise<sos_response> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/patients/{patient_id}/sos',
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
     * Mark an SOS event closed.
     * @param sosId
     * @returns sos_response SOS event closed.
     * @throws ApiError
     */
    public static closeSosEvent(
        sosId: string,
    ): CancelablePromise<sos_response> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/sos/{sos_id}/close',
            path: {
                'sos_id': sosId,
            },
            errors: {
                401: `Authentication is required.`,
                403: `The authenticated actor lacks the required role, scope, or consent.`,
            },
        });
    }
    /**
     * Get the privacy-controlled emergency profile summary for one patient.
     * @param patientId
     * @returns emergency_profile_response Emergency profile retrieved.
     * @throws ApiError
     */
    public static getEmergencyProfile(
        patientId: string,
    ): CancelablePromise<emergency_profile_response> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/patients/{patient_id}/emergency-profile',
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
