/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $measurement_record = {
    properties: {
        measurement_id: {
            type: 'string',
            isRequired: true,
        },
        patient_id: {
            type: 'string',
            isRequired: true,
        },
        measurement_type: {
            type: 'Enum',
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
            isRequired: true,
        },
        value: {
            type: 'one-of',
            contains: [{
                type: 'weight_measurement_value',
            }, {
                type: 'height_measurement_value',
            }, {
                type: 'pulse_measurement_value',
            }, {
                type: 'glucose_measurement_value',
            }, {
                type: 'blood_pressure_measurement_value',
            }],
            isRequired: true,
        },
        version: {
            type: 'number',
            isRequired: true,
            minimum: 1,
        },
        created_at: {
            type: 'string',
            isRequired: true,
            format: 'date-time',
        },
        updated_at: {
            type: 'string',
            isRequired: true,
            format: 'date-time',
        },
    },
} as const;
