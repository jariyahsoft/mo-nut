/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $create_report_request = {
    properties: {
        scopes: {
            type: 'array',
            contains: {
                type: 'string',
            },
            isRequired: true,
        },
        period_start: {
            type: 'string',
            isRequired: true,
            format: 'date',
        },
        period_end: {
            type: 'string',
            isRequired: true,
            format: 'date',
        },
    },
} as const;
