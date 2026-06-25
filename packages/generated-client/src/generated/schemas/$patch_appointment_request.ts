/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $patch_appointment_request = {
    properties: {
        scheduled_at: {
            type: 'string',
            format: 'date-time',
        },
        timezone: {
            type: 'string',
        },
        facility_name: {
            type: 'string',
        },
        department: {
            type: 'string',
        },
        building: {
            type: 'string',
        },
        room: {
            type: 'string',
        },
        clinician_name: {
            type: 'string',
        },
        notes: {
            type: 'string',
        },
        reminders: {
            type: 'array',
            contains: {
                type: 'appointment_reminder',
            },
        },
        preparation_items: {
            type: 'array',
            contains: {
                type: 'preparation_item',
            },
        },
        document_links: {
            type: 'array',
            contains: {
                type: 'document_reference',
            },
        },
        responsible_caregiver_relationship_id: {
            type: 'string',
            isNullable: true,
        },
        soft_delete_reason: {
            type: 'string',
        },
    },
} as const;
