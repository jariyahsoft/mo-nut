/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { permission_scope } from './permission_scope';
export type caregiver_relationship = {
    relationship_id: string;
    patient_id: string;
    caregiver_user_id: string;
    caregiver_display_name: string;
    relationship_role: caregiver_relationship.relationship_role;
    permission_scopes: Array<permission_scope>;
    access_status: caregiver_relationship.access_status;
    invitation_id: string;
    expires_at: string | null;
    created_at: string;
    updated_at: string;
    version: number;
};
export namespace caregiver_relationship {
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

