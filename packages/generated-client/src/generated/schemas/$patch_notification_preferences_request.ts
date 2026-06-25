/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $patch_notification_preferences_request = {
    properties: {
        privacy_level: {
            type: 'Enum',
            isRequired: true,
        },
        quiet_hours_start: {
            type: 'string',
            isRequired: true,
            pattern: '^[0-2][0-9]:[0-5][0-9]$',
        },
        quiet_hours_end: {
            type: 'string',
            isRequired: true,
            pattern: '^[0-2][0-9]:[0-5][0-9]$',
        },
        push_enabled: {
            type: 'boolean',
            isRequired: true,
        },
        caregiver_escalation_enabled: {
            type: 'boolean',
            isRequired: true,
        },
    },
} as const;
