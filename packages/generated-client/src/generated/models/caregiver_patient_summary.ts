/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { permission_scope } from './permission_scope';
export type caregiver_patient_summary = {
    patient_id: string;
    display_name: string;
    relationship_id: string;
    relationship_role: caregiver_patient_summary.relationship_role;
    permission_scopes: Array<permission_scope>;
    access_status: caregiver_patient_summary.access_status;
};
export namespace caregiver_patient_summary {
    export enum relationship_role {
        PRIMARY = 'primary',
        BACKUP = 'backup',
        TRANSPORT = 'transport',
    }
    export enum access_status {
        ACTIVE = 'active',
        SUSPENDED = 'suspended',
        REVOKED = 'revoked',
        EXPIRED = 'expired',
    }
}

