/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $height_measurement_value = {
    properties: {
        unit: {
            type: 'string',
            isRequired: true,
        },
        amount: {
            type: 'number',
            isRequired: true,
            maximum: 250,
            minimum: 30,
        },
    },
} as const;
