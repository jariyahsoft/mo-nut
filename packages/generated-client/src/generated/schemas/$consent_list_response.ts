/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $consent_list_response = {
    properties: {
        data: {
            properties: {
                consents: {
                    type: 'array',
                    contains: {
                        type: 'consent_record',
                    },
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
