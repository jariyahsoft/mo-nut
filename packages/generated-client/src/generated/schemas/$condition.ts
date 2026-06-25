/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $condition = {
    properties: {
        condition_id: {
            type: 'string',
            isRequired: true,
        },
        name: {
            type: 'string',
            isRequired: true,
        },
        status: {
            type: 'Enum',
            isRequired: true,
        },
        diagnosed_on: {
            type: 'string',
            isRequired: true,
            format: 'date',
        },
    },
} as const;
