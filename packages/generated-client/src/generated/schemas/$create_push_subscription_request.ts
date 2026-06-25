/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $create_push_subscription_request = {
    properties: {
        endpoint: {
            type: 'string',
            isRequired: true,
            format: 'uri',
        },
        p256dh: {
            type: 'string',
            isRequired: true,
        },
        auth: {
            type: 'string',
            isRequired: true,
        },
        device_name: {
            type: 'string',
            isRequired: true,
        },
    },
} as const;
