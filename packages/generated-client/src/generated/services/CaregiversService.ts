/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { accept_caregiver_invitation_request } from '../models/accept_caregiver_invitation_request';
import type { caregiver_invitation_response } from '../models/caregiver_invitation_response';
import type { caregiver_patient_list_response } from '../models/caregiver_patient_list_response';
import type { caregiver_relationship_list_response } from '../models/caregiver_relationship_list_response';
import type { caregiver_relationship_response } from '../models/caregiver_relationship_response';
import type { command_ack_response } from '../models/command_ack_response';
import type { create_caregiver_invitation_request } from '../models/create_caregiver_invitation_request';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class CaregiversService {
    /**
     * List caregiver relationships for a patient.
     * @param patientId
     * @returns caregiver_relationship_list_response Caregiver relationships retrieved.
     * @throws ApiError
     */
    public static listPatientCaregivers(
        patientId: string,
    ): CancelablePromise<caregiver_relationship_list_response> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/patients/{patient_id}/caregivers',
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
     * Invite a caregiver to one patient with scoped permissions.
     * @param patientId
     * @param idempotencyKey
     * @param requestBody
     * @param xCorrelationId Optional end-to-end correlation identifier.
     * @returns caregiver_invitation_response Invitation created.
     * @throws ApiError
     */
    public static createCaregiverInvitation(
        patientId: string,
        idempotencyKey: string,
        requestBody: create_caregiver_invitation_request,
        xCorrelationId?: string,
    ): CancelablePromise<caregiver_invitation_response> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/patients/{patient_id}/caregiver-invitations',
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
                422: `The payload or domain fields are invalid.`,
            },
        });
    }
    /**
     * Accept a caregiver invitation once.
     * @param invitationId
     * @param idempotencyKey
     * @param requestBody
     * @returns caregiver_relationship_response Invitation accepted and relationship activated.
     * @throws ApiError
     */
    public static acceptCaregiverInvitation(
        invitationId: string,
        idempotencyKey: string,
        requestBody: accept_caregiver_invitation_request,
    ): CancelablePromise<caregiver_relationship_response> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/caregiver-invitations/{invitation_id}/accept',
            path: {
                'invitation_id': invitationId,
            },
            headers: {
                'Idempotency-Key': idempotencyKey,
            },
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                409: `The caregiver invitation has already been accepted.`,
                410: `The caregiver invitation is expired and can no longer be accepted.`,
                422: `The payload or domain fields are invalid.`,
            },
        });
    }
    /**
     * Revoke a pending caregiver invitation.
     * @param invitationId
     * @param idempotencyKey
     * @returns command_ack_response Invitation revoke command accepted.
     * @throws ApiError
     */
    public static revokeCaregiverInvitation(
        invitationId: string,
        idempotencyKey: string,
    ): CancelablePromise<command_ack_response> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/caregiver-invitations/{invitation_id}/revoke',
            path: {
                'invitation_id': invitationId,
            },
            headers: {
                'Idempotency-Key': idempotencyKey,
            },
            errors: {
                401: `Authentication is required.`,
                403: `The authenticated actor lacks the required role, scope, or consent.`,
            },
        });
    }
    /**
     * List active patient contexts available to the caregiver.
     * @returns caregiver_patient_list_response Caregiver patient contexts retrieved.
     * @throws ApiError
     */
    public static listCaregiverPatients(): CancelablePromise<caregiver_patient_list_response> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/me/caregiver-patients',
            errors: {
                401: `Authentication is required.`,
            },
        });
    }
}
