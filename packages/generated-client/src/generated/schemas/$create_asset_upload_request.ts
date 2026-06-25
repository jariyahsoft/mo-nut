/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $create_asset_upload_request = {
    properties: {
        category: {
            type: 'Enum',
            isRequired: true,
        },
        mime_type: {
            type: 'string',
            isRequired: true,
        },
        file_size_bytes: {
            type: 'number',
            isRequired: true,
            minimum: 1,
        },
        checksum_sha256: {
            type: 'string',
            isRequired: true,
            minLength: 32,
        },
        capture_source: {
            type: 'Enum',
            isRequired: true,
        },
    },
} as const;
