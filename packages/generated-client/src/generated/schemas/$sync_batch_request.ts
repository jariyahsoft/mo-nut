/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $sync_batch_request = {
    properties: {
        mutations: {
            type: 'array',
            contains: {
                type: 'sync_mutation',
            },
            isRequired: true,
        },
    },
} as const;
