/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $create_share_link_request = {
    properties: {
        report_id: {
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
        expires_at: {
            type: 'string',
            isRequired: true,
            format: 'date-time',
        },
    },
} as const;
