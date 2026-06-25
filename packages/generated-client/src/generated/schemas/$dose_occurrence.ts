/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $dose_occurrence = {
    properties: {
        dose_id: {
            type: 'string',
            isRequired: true,
        },
        patient_id: {
            type: 'string',
            isRequired: true,
        },
        medication_id: {
            type: 'string',
            isRequired: true,
        },
        schedule_id: {
            type: 'string',
            isRequired: true,
        },
        schedule_version: {
            type: 'number',
            isRequired: true,
            minimum: 1,
        },
        due_at: {
            type: 'string',
            isRequired: true,
            format: 'date-time',
        },
        timezone: {
            type: 'string',
            isRequired: true,
        },
        status: {
            type: 'dose_status',
            isRequired: true,
        },
        responded_at: {
            type: 'string',
            isRequired: true,
            isNullable: true,
            format: 'date-time',
        },
        actor_user_id: {
            type: 'string',
            isRequired: true,
            isNullable: true,
        },
        actor_role: {
            type: 'string',
            isRequired: true,
            isNullable: true,
        },
        response_reason: {
            type: 'string',
            isRequired: true,
            isNullable: true,
        },
        version: {
            type: 'number',
            isRequired: true,
            minimum: 1,
        },
    },
} as const;
