/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $report_record = {
    properties: {
        report_id: {
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
            isNullable: true,
            format: 'date-time',
        },
        asset_id: {
            type: 'string',
            isRequired: true,
            isNullable: true,
        },
        created_at: {
            type: 'string',
            isRequired: true,
            format: 'date-time',
        },
    },
} as const;
