/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $push_subscription_response = {
    properties: {
        data: {
            properties: {
                subscription_id: {
                    type: 'string',
                    isRequired: true,
                },
                endpoint_hash: {
                    type: 'string',
                    isRequired: true,
                },
                push_enabled: {
                    type: 'boolean',
                    isRequired: true,
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
