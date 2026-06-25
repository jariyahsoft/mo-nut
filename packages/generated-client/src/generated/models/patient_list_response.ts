/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { api_meta } from './api_meta';
import type { patient_profile } from './patient_profile';
export type patient_list_response = {
    data: {
        patients: Array<patient_profile>;
    };
    meta: api_meta;
    error: null;
};

