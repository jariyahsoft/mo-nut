/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $patient_profile = {
    properties: {
        patient_id: {
            type: 'string',
            isRequired: true,
        },
        display_name: {
            type: 'string',
            isRequired: true,
        },
        birth_date: {
            type: 'string',
            isRequired: true,
            format: 'date',
        },
        gender: {
            type: 'Enum',
            isRequired: true,
        },
        blood_type: {
            type: 'Enum',
            isRequired: true,
        },
        language: {
            type: 'string',
            isRequired: true,
        },
        font_scale: {
            type: 'font_scale',
            isRequired: true,
        },
        account_owner_user_id: {
            type: 'string',
            isRequired: true,
        },
        conditions: {
            type: 'array',
            contains: {
                type: 'condition',
            },
            isRequired: true,
        },
        allergies: {
            type: 'array',
            contains: {
                type: 'allergy',
            },
            isRequired: true,
        },
        emergency_contacts: {
            type: 'array',
            contains: {
                type: 'emergency_contact',
            },
            isRequired: true,
        },
        record_numbers: {
            type: 'array',
            contains: {
                type: 'record_number',
            },
            isRequired: true,
        },
        emergency_card_settings: {
            type: 'emergency_card_settings',
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
