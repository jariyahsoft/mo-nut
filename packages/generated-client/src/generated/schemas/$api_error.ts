/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $api_error = {
    properties: {
        code: {
            type: 'Enum',
            isRequired: true,
        },
        message: {
            type: 'string',
            isRequired: true,
        },
        fields: {
            type: 'array',
            contains: {
                type: 'field_error',
            },
            isRequired: true,
        },
    },
} as const;
