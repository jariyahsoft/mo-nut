/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $measurement_summary_item = {
    properties: {
        measurement_type: {
            type: 'Enum',
            isRequired: true,
        },
        latest_value_text: {
            type: 'string',
            isRequired: true,
        },
        average_value_text: {
            type: 'string',
            isRequired: true,
        },
        trend_direction: {
            type: 'Enum',
            isRequired: true,
        },
        threshold_status: {
            type: 'Enum',
            isRequired: true,
        },
    },
} as const;
