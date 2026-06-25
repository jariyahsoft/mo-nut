/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $confirm_processing_draft_request = {
    properties: {
        target_type: {
            type: 'Enum',
            isRequired: true,
        },
        confirmed_by_user_id: {
            type: 'string',
            isRequired: true,
        },
        fields: {
            type: 'dictionary',
            contains: {
                properties: {
                },
            },
            isRequired: true,
        },
    },
} as const;
