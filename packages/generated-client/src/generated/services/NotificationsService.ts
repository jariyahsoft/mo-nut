/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { create_push_subscription_request } from '../models/create_push_subscription_request';
import type { notification_preferences_response } from '../models/notification_preferences_response';
import type { patch_notification_preferences_request } from '../models/patch_notification_preferences_request';
import type { push_subscription_response } from '../models/push_subscription_response';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class NotificationsService {
    /**
     * Get privacy-safe notification preferences.
     * @returns notification_preferences_response Notification preferences retrieved.
     * @throws ApiError
     */
    public static getNotificationPreferences(): CancelablePromise<notification_preferences_response> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/notification-preferences',
            errors: {
                401: `Authentication is required.`,
            },
        });
    }
    /**
     * Update privacy-safe notification preferences.
     * @param requestBody
     * @returns notification_preferences_response Notification preferences updated.
     * @throws ApiError
     */
    public static patchNotificationPreferences(
        requestBody: patch_notification_preferences_request,
    ): CancelablePromise<notification_preferences_response> {
        return __request(OpenAPI, {
            method: 'PATCH',
            url: '/notification-preferences',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                401: `Authentication is required.`,
                422: `The payload or domain fields are invalid.`,
            },
        });
    }
    /**
     * Register a push subscription without storing detailed PHI in payload definitions.
     * @param requestBody
     * @returns push_subscription_response Push subscription created.
     * @throws ApiError
     */
    public static createPushSubscription(
        requestBody: create_push_subscription_request,
    ): CancelablePromise<push_subscription_response> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/push-subscriptions',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                401: `Authentication is required.`,
                422: `The payload or domain fields are invalid.`,
            },
        });
    }
}
