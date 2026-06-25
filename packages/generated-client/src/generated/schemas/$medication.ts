/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $medication = {
    properties: {
        medication_id: {
            type: 'string',
            isRequired: true,
        },
        patient_id: {
            type: 'string',
            isRequired: true,
        },
        display_name: {
            type: 'string',
            isRequired: true,
        },
        generic_name: {
            type: 'string',
            isRequired: true,
        },
        form: {
            type: 'string',
            isRequired: true,
        },
        strength: {
            type: 'string',
            isRequired: true,
        },
        instructions: {
            type: 'string',
            isRequired: true,
        },
        status: {
            type: 'medication_status',
            isRequired: true,
        },
        source: {
            type: 'Enum',
            isRequired: true,
        },
        caregiver_note: {
            type: 'string',
            isRequired: true,
        },
        images: {
            type: 'array',
            contains: {
                type: 'medication_image',
            },
            isRequired: true,
        },
        active_schedule_ids: {
            type: 'array',
            contains: {
                type: 'string',
            },
            isRequired: true,
        },
        inventory: {
            type: 'medication_inventory',
            isRequired: true,
        },
        warning_text: {
            type: 'string',
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
