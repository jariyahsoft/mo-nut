/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $processing_job = {
    properties: {
        job_id: {
            type: 'string',
            isRequired: true,
        },
        asset_id: {
            type: 'string',
            isRequired: true,
        },
        job_type: {
            type: 'Enum',
            isRequired: true,
        },
        status: {
            type: 'Enum',
            isRequired: true,
        },
        provider_name: {
            type: 'string',
            isRequired: true,
        },
        provider_model_version: {
            type: 'string',
            isRequired: true,
        },
        retryable: {
            type: 'boolean',
            isRequired: true,
        },
        draft_id: {
            type: 'string',
            isRequired: true,
            isNullable: true,
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
