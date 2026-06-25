/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { medication_image } from './medication_image';
import type { medication_inventory } from './medication_inventory';
import type { medication_status } from './medication_status';
export type medication = {
    medication_id: string;
    patient_id: string;
    display_name: string;
    generic_name: string;
    form: string;
    strength: string;
    instructions: string;
    status: medication_status;
    source: medication.source;
    caregiver_note: string;
    images: Array<medication_image>;
    active_schedule_ids: Array<string>;
    inventory: medication_inventory;
    warning_text: string;
    version: number;
    created_at: string;
    updated_at: string;
};
export namespace medication {
    export enum source {
        MANUAL = 'manual',
        OCR_CONFIRMED = 'ocr_confirmed',
        IMPORT = 'import',
    }
}

