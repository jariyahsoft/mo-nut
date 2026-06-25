/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $public_share_response = {
    properties: {
        data: {
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
                download_url: {
                    type: 'string',
                    isRequired: true,
                    format: 'uri',
                },
            },
            isRequired: true,
        },
        meta: {
            type: 'api_meta',
            isRequired: true,
        },
        error: {
            type: 'null',
            isRequired: true,
        },
    },
} as const;
