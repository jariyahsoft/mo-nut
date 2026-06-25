/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $caregiver_invitation = {
    properties: {
        invitation_id: {
            type: 'string',
            isRequired: true,
        },
        patient_id: {
            type: 'string',
            isRequired: true,
        },
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
        status: {
            type: 'Enum',
            isRequired: true,
        },
        expires_at: {
            type: 'string',
            isRequired: true,
            format: 'date-time',
        },
        created_at: {
            type: 'string',
            isRequired: true,
            format: 'date-time',
        },
        invitation_token_preview: {
            type: 'string',
            isRequired: true,
        },
    },
} as const;
