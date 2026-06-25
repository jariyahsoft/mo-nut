/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $appointment_transition_request = {
    properties: {
        target_status: {
            type: 'appointment_status',
            isRequired: true,
        },
        reason: {
            type: 'string',
            isRequired: true,
        },
        transition_occurred_at: {
            type: 'string',
            format: 'date-time',
        },
    },
} as const;
