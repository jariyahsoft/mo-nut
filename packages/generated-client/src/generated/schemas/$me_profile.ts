/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $me_profile = {
    properties: {
        user_id: {
            type: 'string',
            isRequired: true,
        },
        display_name: {
            type: 'string',
            isRequired: true,
        },
        account_status: {
            type: 'account_status',
            isRequired: true,
        },
        roles: {
            type: 'array',
            contains: {
                type: 'role',
            },
            isRequired: true,
        },
        active_patient_id: {
            type: 'string',
            isRequired: true,
            isNullable: true,
        },
        locale: {
            type: 'string',
            isRequired: true,
        },
        preferences: {
            type: 'me_preferences',
            isRequired: true,
        },
        patient_ids: {
            type: 'array',
            contains: {
                type: 'string',
            },
            isRequired: true,
        },
        security_events: {
            type: 'array',
            contains: {
                type: 'security_event',
            },
            isRequired: true,
        },
        version: {
            type: 'number',
            isRequired: true,
            minimum: 1,
        },
    },
} as const;
