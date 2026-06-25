/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $blood_pressure_measurement_value = {
    properties: {
        unit: {
            type: 'string',
            isRequired: true,
        },
        systolic: {
            type: 'number',
            isRequired: true,
            maximum: 260,
            minimum: 50,
        },
        diastolic: {
            type: 'number',
            isRequired: true,
            maximum: 180,
            minimum: 30,
        },
    },
} as const;
