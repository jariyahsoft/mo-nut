/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $measurement_list_response = {
    properties: {
        data: {
            properties: {
                measurements: {
                    type: 'array',
                    contains: {
                        type: 'measurement_record',
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
