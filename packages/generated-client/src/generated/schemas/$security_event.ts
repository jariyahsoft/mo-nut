/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $security_event = {
    properties: {
        event_type: {
            type: 'Enum',
            isRequired: true,
        },
        occurred_at: {
            type: 'string',
            isRequired: true,
            format: 'date-time',
        },
        source: {
            type: 'Enum',
            isRequired: true,
        },
    },
} as const;
