/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { medication_image } from './medication_image';
import type { medication_inventory } from './medication_inventory';
export type create_medication_request = {
    display_name: string;
    generic_name: string;
    form: string;
    strength: string;
    instructions: string;
    source: create_medication_request.source;
    caregiver_note: string;
    images: Array<medication_image>;
    inventory: medication_inventory;
};
export namespace create_medication_request {
    export enum source {
        MANUAL = 'manual',
        OCR_CONFIRMED = 'ocr_confirmed',
        IMPORT = 'import',
    }
}

