/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { allergy } from './allergy';
import type { condition } from './condition';
import type { emergency_card_settings } from './emergency_card_settings';
import type { emergency_contact } from './emergency_contact';
import type { font_scale } from './font_scale';
import type { record_number } from './record_number';
export type patch_patient_request = {
    display_name?: string;
    language?: string;
    font_scale?: font_scale;
    conditions?: Array<condition>;
    allergies?: Array<allergy>;
    emergency_contacts?: Array<emergency_contact>;
    record_numbers?: Array<record_number>;
    emergency_card_settings?: emergency_card_settings;
};

