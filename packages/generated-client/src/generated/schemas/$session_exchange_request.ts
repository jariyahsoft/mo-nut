/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $session_exchange_request = {
    properties: {
        identity_provider: {
            type: 'Enum',
            isRequired: true,
        },
        identity_token: {
            type: 'string',
            isRequired: true,
            minLength: 10,
        },
        device: {
            properties: {
                device_name: {
                    type: 'string',
                    isRequired: true,
                },
                platform: {
                    type: 'platform',
                    isRequired: true,
                },
                app_version: {
                    type: 'string',
                    isRequired: true,
                },
                locale: {
                    type: 'string',
                    isRequired: true,
                },
            },
            isRequired: true,
        },
    },
} as const;
