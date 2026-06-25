/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $share_link_record = {
    properties: {
        share_link_id: {
            type: 'string',
            isRequired: true,
        },
        patient_id: {
            type: 'string',
            isRequired: true,
        },
        scopes: {
            type: 'array',
            contains: {
                type: 'string',
            },
            isRequired: true,
        },
        status: {
            type: 'Enum',
            isRequired: true,
        },
        expires_at: {
            type: 'string',
            isRequired: true,
            format: 'date-time',
        },
        share_url: {
            type: 'string',
            isRequired: true,
            format: 'uri',
        },
    },
} as const;
