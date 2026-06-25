/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $patch_patient_request = {
    properties: {
        display_name: {
            type: 'string',
            minLength: 1,
        },
        language: {
            type: 'string',
        },
        font_scale: {
            type: 'font_scale',
        },
        conditions: {
            type: 'array',
            contains: {
                type: 'condition',
            },
        },
        allergies: {
            type: 'array',
            contains: {
                type: 'allergy',
            },
        },
        emergency_contacts: {
            type: 'array',
            contains: {
                type: 'emergency_contact',
            },
        },
        record_numbers: {
            type: 'array',
            contains: {
                type: 'record_number',
            },
        },
        emergency_card_settings: {
            type: 'emergency_card_settings',
        },
    },
} as const;
