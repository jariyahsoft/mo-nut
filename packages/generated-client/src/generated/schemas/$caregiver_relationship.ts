/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $caregiver_relationship = {
    properties: {
        relationship_id: {
            type: 'string',
            isRequired: true,
        },
        patient_id: {
            type: 'string',
            isRequired: true,
        },
        caregiver_user_id: {
            type: 'string',
            isRequired: true,
        },
        caregiver_display_name: {
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
        invitation_id: {
            type: 'string',
            isRequired: true,
        },
        expires_at: {
            type: 'string',
            isRequired: true,
            isNullable: true,
            format: 'date-time',
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
        version: {
            type: 'number',
            isRequired: true,
            minimum: 1,
        },
    },
} as const;
