/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { allergy } from './allergy';
import type { condition } from './condition';
import type { emergency_contact } from './emergency_contact';
import type { font_scale } from './font_scale';
import type { record_number } from './record_number';
export type create_patient_request = {
    display_name: string;
    birth_date: string;
    gender: create_patient_request.gender;
    blood_type: create_patient_request.blood_type;
    language: string;
    font_scale: font_scale;
    conditions: Array<condition>;
    allergies: Array<allergy>;
    emergency_contacts: Array<emergency_contact>;
    record_numbers: Array<record_number>;
};
export namespace create_patient_request {
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

