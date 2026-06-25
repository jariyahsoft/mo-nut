/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $create_caregiver_invitation_request = {
    properties: {
        invitation_channel: {
            type: 'Enum',
            isRequired: true,
        },
        invitee_contact: {
            type: 'string',
            isRequired: true,
        },
        invitee_display_name: {
            type: 'string',
            isRequired: true,
        },
        relationship_role: {
            type: 'Enum',
            isRequired: true,
        },
        permission_scopes: {
            type: 'array',
            contains: {
                type: 'permission_scope',
            },
            isRequired: true,
        },
        expires_at: {
            type: 'string',
            isRequired: true,
            format: 'date-time',
        },
    },
} as const;
