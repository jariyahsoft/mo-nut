/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { field_error } from './field_error';
export type api_error = {
    code: api_error.code;
    message: string;
    fields: Array<field_error>;
};
export namespace api_error {
    export enum code {
        AUTH_REQUIRED = 'AUTH_REQUIRED',
        FORBIDDEN_SCOPE = 'FORBIDDEN_SCOPE',
        RESOURCE_NOT_FOUND = 'RESOURCE_NOT_FOUND',
        VALIDATION_FAILED = 'VALIDATION_FAILED',
        VALIDATION_ERROR = 'VALIDATION_ERROR',
        VERSION_CONFLICT = 'VERSION_CONFLICT',
        IDEMPOTENCY_CONFLICT = 'IDEMPOTENCY_CONFLICT',
        RATE_LIMITED = 'RATE_LIMITED',
        DEPENDENCY_UNAVAILABLE = 'DEPENDENCY_UNAVAILABLE',
        PROCESSING_PENDING = 'PROCESSING_PENDING',
        ACCOUNT_SUSPENDED = 'ACCOUNT_SUSPENDED',
        INVITATION_EXPIRED = 'INVITATION_EXPIRED',
        INVITATION_ALREADY_USED = 'INVITATION_ALREADY_USED',
        DUPLICATE_RELATIONSHIP = 'DUPLICATE_RELATIONSHIP',
        INVALID_STATE_TRANSITION = 'INVALID_STATE_TRANSITION',
        PROVIDER_FAILURE = 'PROVIDER_FAILURE',
        SHARE_EXPIRED = 'SHARE_EXPIRED',
        SHARE_REVOKED = 'SHARE_REVOKED',
    }
}

