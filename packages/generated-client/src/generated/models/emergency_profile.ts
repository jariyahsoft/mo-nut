/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { emergency_contact } from './emergency_contact';
export type emergency_profile = {
    patient_id: string;
    display_name: string;
    blood_type: string;
    allergies_summary: Array<string>;
    emergency_contacts: Array<emergency_contact>;
};

