/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $consent_record = {
    properties: {
        consent_id: {
            type: 'string',
            isRequired: true,
        },
        patient_id: {
            type: 'string',
            isRequired: true,
        },
        document_key: {
            type: 'string',
            isRequired: true,
        },
        document_version: {
            type: 'string',
            isRequired: true,
        },
        grantee_type: {
            type: 'Enum',
            isRequired: true,
        },
        grantee_id: {
            type: 'string',
            isRequired: true,
        },
        purposes: {
            type: 'array',
            contains: {
                type: 'string',
            },
            isRequired: true,
        },
        scopes: {
            type: 'array',
            contains: {
                type: 'string',
            },
            isRequired: true,
        },
        status: {
            type: 'Enum',
            isRequired: true,
        },
        accepted_at: {
            type: 'string',
            isRequired: true,
            format: 'date-time',
        },
        expires_at: {
            type: 'string',
            isRequired: true,
            isNullable: true,
            format: 'date-time',
        },
        version: {
            type: 'number',
            isRequired: true,
            minimum: 1,
        },
    },
} as const;
