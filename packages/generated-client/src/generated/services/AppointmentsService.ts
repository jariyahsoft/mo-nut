/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { appointment_list_response } from '../models/appointment_list_response';
import type { appointment_response } from '../models/appointment_response';
import type { appointment_transition_request } from '../models/appointment_transition_request';
import type { create_appointment_request } from '../models/create_appointment_request';
import type { patch_appointment_request } from '../models/patch_appointment_request';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class AppointmentsService {
    /**
     * List appointments for a patient.
     * @param patientId
     * @param limit
     * @param cursor
     * @returns appointment_list_response Appointments retrieved.
     * @throws ApiError
     */
    public static listAppointments(
        patientId: string,
        limit: number = 20,
        cursor?: string,
    ): CancelablePromise<appointment_list_response> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/patients/{patient_id}/appointments',
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
     * Create a new appointment for a patient.
     * @param patientId
     * @param idempotencyKey
     * @param requestBody
     * @returns appointment_response Appointment created.
     * @throws ApiError
     */
    public static createAppointment(
        patientId: string,
        idempotencyKey: string,
        requestBody: create_appointment_request,
    ): CancelablePromise<appointment_response> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/patients/{patient_id}/appointments',
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
     * Get one appointment.
     * @param appointmentId
     * @returns appointment_response Appointment retrieved.
     * @throws ApiError
     */
    public static getAppointment(
        appointmentId: string,
    ): CancelablePromise<appointment_response> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/appointments/{appointment_id}',
            path: {
                'appointment_id': appointmentId,
            },
            errors: {
                401: `Authentication is required.`,
                403: `The authenticated actor lacks the required role, scope, or consent.`,
            },
        });
    }
    /**
     * Update an appointment, including soft-delete metadata.
     * @param appointmentId
     * @param ifMatch Entity version token used for optimistic concurrency.
     * @param requestBody
     * @returns appointment_response Appointment updated.
     * @throws ApiError
     */
    public static patchAppointment(
        appointmentId: string,
        ifMatch: string,
        requestBody: patch_appointment_request,
    ): CancelablePromise<appointment_response> {
        return __request(OpenAPI, {
            method: 'PATCH',
            url: '/appointments/{appointment_id}',
            path: {
                'appointment_id': appointmentId,
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
     * Perform an explicit appointment status transition.
     * @param appointmentId
     * @param idempotencyKey
     * @param requestBody
     * @returns appointment_response Appointment transitioned.
     * @throws ApiError
     */
    public static transitionAppointment(
        appointmentId: string,
        idempotencyKey: string,
        requestBody: appointment_transition_request,
    ): CancelablePromise<appointment_response> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/appointments/{appointment_id}/transition',
            path: {
                'appointment_id': appointmentId,
            },
            headers: {
                'Idempotency-Key': idempotencyKey,
            },
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                401: `Authentication is required.`,
                403: `The authenticated actor lacks the required role, scope, or consent.`,
                409: `The requested appointment transition is not permitted from the current state.`,
                422: `The payload or domain fields are invalid.`,
            },
        });
    }
}
