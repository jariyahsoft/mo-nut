/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type security_event = {
    event_type: security_event.event_type;
    occurred_at: string;
    source: security_event.source;
};
export namespace security_event {
    export enum event_type {
        FAILED_LOGIN = 'failed_login',
        NEW_DEVICE = 'new_device',
        SESSION_REVOKED = 'session_revoked',
        RECOVERY_STARTED = 'recovery_started',
    }
    export enum source {
        WEB = 'web',
        ANDROID = 'android',
        IOS = 'ios',
        BACKEND = 'backend',
    }
}

