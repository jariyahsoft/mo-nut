/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $device_session = {
    properties: {
        session_id: {
            type: 'string',
            isRequired: true,
        },
        user_id: {
            type: 'string',
            isRequired: true,
        },
        status: {
            type: 'Enum',
            isRequired: true,
        },
        issued_at: {
            type: 'string',
            isRequired: true,
            format: 'date-time',
        },
        expires_at: {
            type: 'string',
            isRequired: true,
            format: 'date-time',
        },
        last_seen_at: {
            type: 'string',
            isRequired: true,
            format: 'date-time',
        },
        device_name: {
            type: 'string',
            isRequired: true,
        },
        platform: {
            type: 'platform',
            isRequired: true,
        },
        current: {
            type: 'boolean',
            isRequired: true,
        },
    },
} as const;
