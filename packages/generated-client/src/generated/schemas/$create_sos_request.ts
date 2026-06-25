/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $create_sos_request = {
    properties: {
        allowed_channels: {
            type: 'array',
            contains: {
                type: 'Enum',
            },
            isRequired: true,
        },
        location_shared: {
            type: 'boolean',
            isRequired: true,
        },
    },
} as const;
