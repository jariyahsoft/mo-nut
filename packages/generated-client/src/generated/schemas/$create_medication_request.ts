/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $create_medication_request = {
    properties: {
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
        inventory: {
            type: 'medication_inventory',
            isRequired: true,
        },
    },
} as const;
