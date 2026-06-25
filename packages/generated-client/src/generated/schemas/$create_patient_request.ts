/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $create_patient_request = {
    properties: {
        display_name: {
            type: 'string',
            isRequired: true,
            minLength: 1,
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
    },
} as const;
