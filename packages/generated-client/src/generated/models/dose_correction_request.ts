/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { dose_status } from './dose_status';
export type dose_correction_request = {
    corrected_status: dose_status;
    corrected_at: string;
    actor_user_id: string;
    actor_role: dose_correction_request.actor_role;
    correction_reason: string;
};
export namespace dose_correction_request {
    export enum actor_role {
        PATIENT = 'patient',
        CAREGIVER = 'caregiver',
        CLINICIAN = 'clinician',
    }
}

