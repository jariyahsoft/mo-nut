/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $caregiver_patient_summary = {
    properties: {
        patient_id: {
            type: 'string',
            isRequired: true,
        },
        display_name: {
            type: 'string',
            isRequired: true,
        },
        relationship_id: {
            type: 'string',
            isRequired: true,
        },
        relationship_role: {
            type: 'Enum',
            isRequired: true,
        },
        permission_scopes: {
            type: 'array',
            contains: {
                type: 'permission_scope',
            },
            isRequired: true,
        },
        access_status: {
            type: 'Enum',
            isRequired: true,
        },
    },
} as const;
