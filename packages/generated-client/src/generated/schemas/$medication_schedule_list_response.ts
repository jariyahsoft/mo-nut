/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $medication_schedule_list_response = {
    properties: {
        data: {
            properties: {
                schedules: {
                    type: 'array',
                    contains: {
                        type: 'medication_schedule',
                    },
                    isRequired: true,
                },
            },
            isRequired: true,
        },
        meta: {
            type: 'api_meta',
            isRequired: true,
        },
        error: {
            type: 'null',
            isRequired: true,
        },
    },
} as const;
