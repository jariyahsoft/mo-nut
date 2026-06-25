/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $dose_action_request = {
    properties: {
        action: {
            type: 'Enum',
            isRequired: true,
        },
        responded_at: {
            type: 'string',
            isRequired: true,
            format: 'date-time',
        },
        actor_user_id: {
            type: 'string',
            isRequired: true,
        },
        actor_role: {
            type: 'Enum',
            isRequired: true,
        },
        response_reason: {
            type: 'string',
            isRequired: true,
        },
    },
} as const;
