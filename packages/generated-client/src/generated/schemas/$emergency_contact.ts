/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $emergency_contact = {
    properties: {
        contact_id: {
            type: 'string',
            isRequired: true,
        },
        name: {
            type: 'string',
            isRequired: true,
        },
        relationship: {
            type: 'string',
            isRequired: true,
        },
        phone_number: {
            type: 'string',
            isRequired: true,
            pattern: '^\\+[1-9][0-9]{7,14}$',
        },
        priority: {
            type: 'number',
            isRequired: true,
            minimum: 1,
        },
    },
} as const;
