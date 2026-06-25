/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { appointment_reminder } from './appointment_reminder';
import type { document_reference } from './document_reference';
import type { preparation_item } from './preparation_item';
export type patch_appointment_request = {
    scheduled_at?: string;
    timezone?: string;
    facility_name?: string;
    department?: string;
    building?: string;
    room?: string;
    clinician_name?: string;
    notes?: string;
    reminders?: Array<appointment_reminder>;
    preparation_items?: Array<preparation_item>;
    document_links?: Array<document_reference>;
    responsible_caregiver_relationship_id?: string | null;
    soft_delete_reason?: string;
};

