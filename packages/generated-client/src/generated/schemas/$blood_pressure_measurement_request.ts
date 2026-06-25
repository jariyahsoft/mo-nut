/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $blood_pressure_measurement_request = {
    properties: {
        measurement_type: {
            type: 'string',
            isRequired: true,
        },
        measured_at: {
            type: 'string',
            isRequired: true,
            format: 'date-time',
        },
        timezone: {
            type: 'string',
            isRequired: true,
        },
        source: {
            type: 'measurement_source',
            isRequired: true,
        },
        recorded_by_user_id: {
            type: 'string',
            isRequired: true,
        },
        note: {
            type: 'string',
        },
        value: {
            type: 'blood_pressure_measurement_value',
            isRequired: true,
        },
    },
} as const;
