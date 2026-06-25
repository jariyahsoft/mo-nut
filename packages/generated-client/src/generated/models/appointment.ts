/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { appointment_reminder } from './appointment_reminder';
import type { appointment_status } from './appointment_status';
import type { document_reference } from './document_reference';
import type { ocr_draft_reference } from './ocr_draft_reference';
import type { preparation_item } from './preparation_item';
export type appointment = {
    appointment_id: string;
    patient_id: string;
    scheduled_at: string;
    timezone: string;
    facility_name: string;
    department: string;
    building: string;
    room: string;
    clinician_name: string;
    notes: string;
    status: appointment_status;
    responsible_caregiver_relationship_id: string | null;
    reminders: Array<appointment_reminder>;
    preparation_items: Array<preparation_item>;
    document_links: Array<document_reference>;
    ocr_draft_ref: (ocr_draft_reference | null);
    soft_deleted_at: string | null;
    version: number;
    created_at: string;
    updated_at: string;
};

