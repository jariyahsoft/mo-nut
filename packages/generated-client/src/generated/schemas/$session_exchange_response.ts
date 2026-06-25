/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $session_exchange_response = {
    properties: {
        data: {
            properties: {
                session: {
                    type: 'device_session',
                    isRequired: true,
                },
                me: {
                    type: 'me_profile',
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
