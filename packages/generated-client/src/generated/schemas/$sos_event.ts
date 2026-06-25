/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $sos_event = {
    properties: {
        sos_id: {
            type: 'string',
            isRequired: true,
        },
        patient_id: {
            type: 'string',
            isRequired: true,
        },
        status: {
            type: 'Enum',
            isRequired: true,
        },
        disclosure_note: {
            type: 'string',
            isRequired: true,
        },
        allowed_channels: {
            type: 'array',
            contains: {
                type: 'Enum',
            },
            isRequired: true,
        },
        channel_statuses: {
            type: 'array',
            contains: {
                type: 'sos_channel_status',
            },
            isRequired: true,
        },
        initiated_at: {
            type: 'string',
            isRequired: true,
            format: 'date-time',
        },
        closed_at: {
            type: 'string',
            isRequired: true,
            isNullable: true,
            format: 'date-time',
        },
    },
} as const;
