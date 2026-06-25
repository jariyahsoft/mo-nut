/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $glucose_measurement_value = {
    properties: {
        unit: {
            type: 'string',
            isRequired: true,
        },
        amount: {
            type: 'number',
            isRequired: true,
            maximum: 600,
            minimum: 20,
        },
        context: {
            type: 'Enum',
            isRequired: true,
        },
    },
} as const;
