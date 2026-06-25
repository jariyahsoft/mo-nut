/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $api_meta = {
    properties: {
        correlation_id: {
            type: 'string',
            isRequired: true,
        },
        server_time: {
            type: 'string',
            isRequired: true,
            format: 'date-time',
        },
        next_cursor: {
            type: 'string',
            isRequired: true,
            isNullable: true,
        },
    },
} as const;
