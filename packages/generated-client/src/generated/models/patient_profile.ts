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
export type patient_profile = {
    patient_id: string;
    display_name: string;
    birth_date: string;
    gender: patient_profile.gender;
    blood_type: patient_profile.blood_type;
    language: string;
    font_scale: font_scale;
    account_owner_user_id: string;
    conditions: Array<condition>;
    allergies: Array<allergy>;
    emergency_contacts: Array<emergency_contact>;
    record_numbers: Array<record_number>;
    emergency_card_settings: emergency_card_settings;
    version: number;
    created_at: string;
    updated_at: string;
};
export namespace patient_profile {
    export enum gender {
        FEMALE = 'female',
        MALE = 'male',
        NON_BINARY = 'non_binary',
        UNDISCLOSED = 'undisclosed',
    }
    export enum blood_type {
        A = 'A',
        B = 'B',
        AB = 'AB',
        O = 'O',
        UNKNOWN = 'unknown',
    }
}

