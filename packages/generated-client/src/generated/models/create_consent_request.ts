/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type create_consent_request = {
    document_key: string;
    document_version: string;
    grantee_type: create_consent_request.grantee_type;
    grantee_id: string;
    purposes: Array<string>;
    scopes: Array<string>;
    accepted_at: string;
    expires_at?: string | null;
};
export namespace create_consent_request {
    export enum grantee_type {
        CAREGIVER = 'caregiver',
        CLINICIAN = 'clinician',
        ORG_STAFF = 'org_staff',
    }
}

