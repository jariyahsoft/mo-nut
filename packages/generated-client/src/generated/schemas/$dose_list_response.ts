/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $dose_list_response = {
    properties: {
        data: {
            properties: {
                doses: {
                    type: 'array',
                    contains: {
                        type: 'dose_occurrence',
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
