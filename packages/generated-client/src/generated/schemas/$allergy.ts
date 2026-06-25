/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $allergy = {
    properties: {
        allergy_id: {
            type: 'string',
            isRequired: true,
        },
        substance: {
            type: 'string',
            isRequired: true,
        },
        category: {
            type: 'Enum',
            isRequired: true,
        },
        reaction: {
            type: 'string',
            isRequired: true,
        },
        severity: {
            type: 'Enum',
            isRequired: true,
        },
    },
} as const;
