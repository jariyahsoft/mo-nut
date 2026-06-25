/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { api_meta } from './api_meta';
import type { caregiver_patient_summary } from './caregiver_patient_summary';
export type caregiver_patient_list_response = {
    data: {
        patients: Array<caregiver_patient_summary>;
    };
    meta: api_meta;
    error: null;
};

