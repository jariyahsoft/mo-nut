/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type consent_record = {
    consent_id: string;
    patient_id: string;
    document_key: string;
    document_version: string;
    grantee_type: consent_record.grantee_type;
    grantee_id: string;
    purposes: Array<string>;
    scopes: Array<string>;
    status: consent_record.status;
    accepted_at: string;
    expires_at: string | null;
    version: number;
};
export namespace consent_record {
    export enum grantee_type {
        CAREGIVER = 'caregiver',
        CLINICIAN = 'clinician',
        ORG_STAFF = 'org_staff',
    }
    export enum status {
        DRAFT = 'draft',
        ACTIVE = 'active',
        SUSPENDED = 'suspended',
        REVOKED = 'revoked',
        EXPIRED = 'expired',
    }
}

