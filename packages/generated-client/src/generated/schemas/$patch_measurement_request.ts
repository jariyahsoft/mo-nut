/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $patch_measurement_request = {
    type: 'one-of',
    contains: [{
        type: 'weight_measurement_request',
    }, {
        type: 'height_measurement_request',
    }, {
        type: 'pulse_measurement_request',
    }, {
        type: 'glucose_measurement_request',
    }, {
        type: 'blood_pressure_measurement_request',
    }],
} as const;
