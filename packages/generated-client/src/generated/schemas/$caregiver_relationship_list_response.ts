/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $caregiver_relationship_list_response = {
    properties: {
        data: {
            properties: {
                relationships: {
                    type: 'array',
                    contains: {
                        type: 'caregiver_relationship',
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
