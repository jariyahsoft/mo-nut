/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $asset_upload_target = {
    properties: {
        upload_url: {
            type: 'string',
            isRequired: true,
            format: 'uri',
        },
        upload_expires_at: {
            type: 'string',
            isRequired: true,
            format: 'date-time',
        },
        max_upload_size_bytes: {
            type: 'number',
            isRequired: true,
            minimum: 1,
        },
    },
} as const;
