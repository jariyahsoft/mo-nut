/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type patch_notification_preferences_request = {
    privacy_level: patch_notification_preferences_request.privacy_level;
    quiet_hours_start: string;
    quiet_hours_end: string;
    push_enabled: boolean;
    caregiver_escalation_enabled: boolean;
};
export namespace patch_notification_preferences_request {
    export enum privacy_level {
        MINIMAL = 'minimal',
        HIDDEN = 'hidden',
    }
}

