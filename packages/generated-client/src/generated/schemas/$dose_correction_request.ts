/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $dose_correction_request = {
    properties: {
        corrected_status: {
            type: 'dose_status',
            isRequired: true,
        },
        corrected_at: {
            type: 'string',
            isRequired: true,
            format: 'date-time',
        },
        actor_user_id: {
            type: 'string',
            isRequired: true,
        },
        actor_role: {
            type: 'Enum',
            isRequired: true,
        },
        correction_reason: {
            type: 'string',
            isRequired: true,
        },
    },
} as const;
