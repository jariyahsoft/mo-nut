/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type notification_preferences = {
    privacy_level: notification_preferences.privacy_level;
    quiet_hours_start: string;
    quiet_hours_end: string;
    push_enabled: boolean;
    caregiver_escalation_enabled: boolean;
};
export namespace notification_preferences {
    export enum privacy_level {
        MINIMAL = 'minimal',
        HIDDEN = 'hidden',
    }
}

