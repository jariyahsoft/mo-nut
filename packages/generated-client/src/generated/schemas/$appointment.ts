/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $appointment = {
    properties: {
        appointment_id: {
            type: 'string',
            isRequired: true,
        },
        patient_id: {
            type: 'string',
            isRequired: true,
        },
        scheduled_at: {
            type: 'string',
            isRequired: true,
            format: 'date-time',
        },
        timezone: {
            type: 'string',
            isRequired: true,
        },
        facility_name: {
            type: 'string',
            isRequired: true,
        },
        department: {
            type: 'string',
            isRequired: true,
        },
        building: {
            type: 'string',
            isRequired: true,
        },
        room: {
            type: 'string',
            isRequired: true,
        },
        clinician_name: {
            type: 'string',
            isRequired: true,
        },
        notes: {
            type: 'string',
            isRequired: true,
        },
        status: {
            type: 'appointment_status',
            isRequired: true,
        },
        responsible_caregiver_relationship_id: {
            type: 'string',
            isRequired: true,
            isNullable: true,
        },
        reminders: {
            type: 'array',
            contains: {
                type: 'appointment_reminder',
            },
            isRequired: true,
        },
        preparation_items: {
            type: 'array',
            contains: {
                type: 'preparation_item',
            },
            isRequired: true,
        },
        document_links: {
            type: 'array',
            contains: {
                type: 'document_reference',
            },
            isRequired: true,
        },
        ocr_draft_ref: {
            type: 'any-of',
            contains: [{
                type: 'ocr_draft_reference',
            }, {
                type: 'null',
            }],
            isRequired: true,
        },
        soft_deleted_at: {
            type: 'string',
            isRequired: true,
            isNullable: true,
            format: 'date-time',
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
        updated_at: {
            type: 'string',
            isRequired: true,
            format: 'date-time',
        },
    },
} as const;
