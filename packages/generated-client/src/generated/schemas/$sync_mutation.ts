/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $sync_mutation = {
    properties: {
        client_mutation_id: {
            type: 'string',
            isRequired: true,
        },
        mutation_type: {
            type: 'string',
            isRequired: true,
        },
        base_version: {
            type: 'number',
            isRequired: true,
            isNullable: true,
        },
        idempotency_key: {
            type: 'string',
            isRequired: true,
        },
        payload: {
            type: 'dictionary',
            contains: {
                properties: {
                },
            },
            isRequired: true,
        },
    },
} as const;
