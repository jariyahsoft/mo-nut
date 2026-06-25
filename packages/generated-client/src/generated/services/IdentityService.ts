/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { command_ack_response } from '../models/command_ack_response';
import type { me_response } from '../models/me_response';
import type { patch_me_request } from '../models/patch_me_request';
import type { session_exchange_request } from '../models/session_exchange_request';
import type { session_exchange_response } from '../models/session_exchange_response';
import type { session_list_response } from '../models/session_list_response';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class IdentityService {
    /**
     * Exchange an external identity token for a Mo-nut session.
     * @param requestBody
     * @param xCorrelationId Optional end-to-end correlation identifier.
     * @param xClientPlatform
     * @param xAppVersion
     * @param acceptLanguage
     * @returns session_exchange_response Session created and active profile resolved.
     * @throws ApiError
     */
    public static exchangeSession(
        requestBody: session_exchange_request,
        xCorrelationId?: string,
        xClientPlatform?: 'web' | 'android' | 'ios',
        xAppVersion?: string,
        acceptLanguage?: string,
    ): CancelablePromise<session_exchange_response> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/auth/session/exchange',
            headers: {
                'X-Correlation-Id': xCorrelationId,
                'X-Client-Platform': xClientPlatform,
                'X-App-Version': xAppVersion,
                'Accept-Language': acceptLanguage,
            },
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                403: `The account is suspended and cannot continue.`,
                422: `The payload or domain fields are invalid.`,
            },
        });
    }
    /**
     * Get the active Mo-nut profile context for the authenticated user.
     * @param xCorrelationId Optional end-to-end correlation identifier.
     * @param xClientPlatform
     * @param xAppVersion
     * @param acceptLanguage
     * @returns me_response Active profile context.
     * @throws ApiError
     */
    public static getMe(
        xCorrelationId?: string,
        xClientPlatform?: 'web' | 'android' | 'ios',
        xAppVersion?: string,
        acceptLanguage?: string,
    ): CancelablePromise<me_response> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/me',
            headers: {
                'X-Correlation-Id': xCorrelationId,
                'X-Client-Platform': xClientPlatform,
                'X-App-Version': xAppVersion,
                'Accept-Language': acceptLanguage,
            },
            errors: {
                401: `Authentication is required.`,
                403: `The account is suspended and cannot continue.`,
            },
        });
    }
    /**
     * Update user-level locale and accessibility preferences.
     * @param ifMatch Entity version token used for optimistic concurrency.
     * @param requestBody
     * @param xCorrelationId Optional end-to-end correlation identifier.
     * @param xClientPlatform
     * @param xAppVersion
     * @param acceptLanguage
     * @returns me_response Profile updated.
     * @throws ApiError
     */
    public static patchMe(
        ifMatch: string,
        requestBody: patch_me_request,
        xCorrelationId?: string,
        xClientPlatform?: 'web' | 'android' | 'ios',
        xAppVersion?: string,
        acceptLanguage?: string,
    ): CancelablePromise<me_response> {
        return __request(OpenAPI, {
            method: 'PATCH',
            url: '/me',
            headers: {
                'X-Correlation-Id': xCorrelationId,
                'X-Client-Platform': xClientPlatform,
                'X-App-Version': xAppVersion,
                'Accept-Language': acceptLanguage,
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
     * List the active and recently revoked sessions for the authenticated user.
     * @param xCorrelationId Optional end-to-end correlation identifier.
     * @returns session_list_response Sessions listed.
     * @throws ApiError
     */
    public static listSessions(
        xCorrelationId?: string,
    ): CancelablePromise<session_list_response> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/me/sessions',
            headers: {
                'X-Correlation-Id': xCorrelationId,
            },
            errors: {
                401: `Authentication is required.`,
            },
        });
    }
    /**
     * Revoke one session for the authenticated user.
     * @param idempotencyKey
     * @param sessionId
     * @param xCorrelationId Optional end-to-end correlation identifier.
     * @returns command_ack_response Session revoke command accepted.
     * @throws ApiError
     */
    public static revokeSession(
        idempotencyKey: string,
        sessionId: string,
        xCorrelationId?: string,
    ): CancelablePromise<command_ack_response> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/me/sessions/{session_id}/revoke',
            path: {
                'session_id': sessionId,
            },
            headers: {
                'X-Correlation-Id': xCorrelationId,
                'Idempotency-Key': idempotencyKey,
            },
            errors: {
                401: `Authentication is required.`,
                403: `The authenticated actor lacks the required role, scope, or consent.`,
            },
        });
    }
}
