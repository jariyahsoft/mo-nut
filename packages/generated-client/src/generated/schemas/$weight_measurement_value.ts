/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $weight_measurement_value = {
    properties: {
        unit: {
            type: 'string',
            isRequired: true,
        },
        amount: {
            type: 'number',
            isRequired: true,
            maximum: 500,
            minimum: 1,
        },
    },
} as const;
