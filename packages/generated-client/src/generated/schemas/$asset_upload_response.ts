/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $asset_upload_response = {
    properties: {
        data: {
            properties: {
                asset_id: {
                    type: 'string',
                    isRequired: true,
                },
                patient_id: {
                    type: 'string',
                    isRequired: true,
                },
                category: {
                    type: 'string',
                    isRequired: true,
                },
                mime_type: {
                    type: 'string',
                    isRequired: true,
                },
                file_size_bytes: {
                    type: 'number',
                    isRequired: true,
                },
                upload_target: {
                    type: 'asset_upload_target',
                    isRequired: true,
                },
            },
            isRequired: true,
        },
        meta: {
            type: 'api_meta',
            isRequired: true,
        },
        error: {
            type: 'null',
            isRequired: true,
        },
    },
} as const;
