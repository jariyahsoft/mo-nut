/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { consent_document_response } from '../models/consent_document_response';
import type { consent_list_response } from '../models/consent_list_response';
import type { consent_response } from '../models/consent_response';
import type { create_consent_request } from '../models/create_consent_request';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class ConsentsService {
    /**
     * Get the active consent document template for a given key.
     * @param documentKey
     * @returns consent_document_response Consent document retrieved.
     * @throws ApiError
     */
    public static getConsentDocument(
        documentKey: string,
    ): CancelablePromise<consent_document_response> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/consent-documents/{document_key}',
            path: {
                'document_key': documentKey,
            },
            errors: {
                401: `Authentication is required.`,
            },
        });
    }
    /**
     * List consent records scoped to a patient.
     * @param patientId
     * @returns consent_list_response Consent records retrieved.
     * @throws ApiError
     */
    public static listPatientConsents(
        patientId: string,
    ): CancelablePromise<consent_list_response> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/patients/{patient_id}/consents',
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
     * Create a consent record for a patient.
     * @param patientId
     * @param idempotencyKey
     * @param requestBody
     * @param xCorrelationId Optional end-to-end correlation identifier.
     * @returns consent_response Consent record created.
     * @throws ApiError
     */
    public static createPatientConsent(
        patientId: string,
        idempotencyKey: string,
        requestBody: create_consent_request,
        xCorrelationId?: string,
    ): CancelablePromise<consent_response> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/patients/{patient_id}/consents',
            path: {
                'patient_id': patientId,
            },
            headers: {
                'X-Correlation-Id': xCorrelationId,
                'Idempotency-Key': idempotencyKey,
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
