/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $emergency_profile = {
    properties: {
        patient_id: {
            type: 'string',
            isRequired: true,
        },
        display_name: {
            type: 'string',
            isRequired: true,
        },
        blood_type: {
            type: 'string',
            isRequired: true,
        },
        allergies_summary: {
            type: 'array',
            contains: {
                type: 'string',
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
    },
} as const;
