/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $consent_document = {
    properties: {
        document_key: {
            type: 'string',
            isRequired: true,
        },
        document_version: {
            type: 'string',
            isRequired: true,
        },
        title: {
            type: 'string',
            isRequired: true,
        },
        locale: {
            type: 'string',
            isRequired: true,
        },
        summary: {
            type: 'string',
            isRequired: true,
        },
        disclosure_text: {
            type: 'string',
            isRequired: true,
        },
        required_scopes: {
            type: 'array',
            contains: {
                type: 'string',
            },
            isRequired: true,
        },
    },
} as const;
