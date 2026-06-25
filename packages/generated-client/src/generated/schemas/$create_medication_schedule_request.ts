/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $create_medication_schedule_request = {
    properties: {
        pattern_type: {
            type: 'schedule_pattern_type',
            isRequired: true,
        },
        timezone: {
            type: 'string',
            isRequired: true,
        },
        local_times: {
            type: 'array',
            contains: {
                type: 'string',
                pattern: '^[0-2][0-9]:[0-5][0-9]$',
            },
            isRequired: true,
        },
        interval_hours: {
            type: 'number',
            isRequired: true,
            isNullable: true,
        },
        days_of_week: {
            type: 'array',
            contains: {
                type: 'Enum',
            },
            isRequired: true,
        },
        day_of_month: {
            type: 'number',
            isRequired: true,
            isNullable: true,
        },
        as_needed_instructions: {
            type: 'string',
            isRequired: true,
            isNullable: true,
        },
        effective_from: {
            type: 'string',
            isRequired: true,
            format: 'date',
        },
        effective_to: {
            type: 'string',
            isRequired: true,
            isNullable: true,
            format: 'date',
        },
    },
} as const;
