/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $medication_schedule = {
    properties: {
        schedule_id: {
            type: 'string',
            isRequired: true,
        },
        medication_id: {
            type: 'string',
            isRequired: true,
        },
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
            maximum: 24,
            minimum: 1,
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
            maximum: 31,
            minimum: 1,
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
        superseded_by_schedule_id: {
            type: 'string',
            isRequired: true,
            isNullable: true,
        },
        active: {
            type: 'boolean',
            isRequired: true,
        },
        version: {
            type: 'number',
            isRequired: true,
            minimum: 1,
        },
        created_at: {
            type: 'string',
            isRequired: true,
            format: 'date-time',
        },
    },
} as const;
