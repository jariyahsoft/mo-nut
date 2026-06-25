/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $sync_mutation_result = {
    properties: {
        client_mutation_id: {
            type: 'string',
            isRequired: true,
        },
        outcome: {
            type: 'Enum',
            isRequired: true,
        },
        retryable: {
            type: 'boolean',
            isRequired: true,
        },
        server_resource_id: {
            type: 'string',
            isRequired: true,
            isNullable: true,
        },
        error_code: {
            type: 'string',
            isRequired: true,
            isNullable: true,
        },
    },
} as const;
