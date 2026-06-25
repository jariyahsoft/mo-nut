/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { medication_inventory } from './medication_inventory';
import type { medication_status } from './medication_status';
export type patch_medication_request = {
    display_name?: string;
    generic_name?: string;
    instructions?: string;
    status?: medication_status;
    caregiver_note?: string;
    inventory?: medication_inventory;
};

