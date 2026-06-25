/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { sync_batch_request } from '../models/sync_batch_request';
import type { sync_batch_response } from '../models/sync_batch_response';
import type { sync_changes_response } from '../models/sync_changes_response';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class SyncService {
    /**
     * Submit a batch of offline-safe mutations with independent outcomes.
     * @param requestBody
     * @returns sync_batch_response Batch processed with partial success, retryability, or conflict outcomes.
     * @throws ApiError
     */
    public static syncBatch(
        requestBody: sync_batch_request,
    ): CancelablePromise<sync_batch_response> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/sync/batch',
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
     * Get incremental changes after a sync cursor.
     * @param cursor
     * @returns sync_changes_response Incremental changes retrieved.
     * @throws ApiError
     */
    public static getSyncChanges(
        cursor?: string,
    ): CancelablePromise<sync_changes_response> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/sync/changes',
            query: {
                'cursor': cursor,
            },
            errors: {
                401: `Authentication is required.`,
            },
        });
    }
}
