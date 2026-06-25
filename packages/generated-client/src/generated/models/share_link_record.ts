/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type share_link_record = {
    share_link_id: string;
    patient_id: string;
    scopes: Array<string>;
    status: share_link_record.status;
    expires_at: string;
    share_url: string;
};
export namespace share_link_record {
    export enum status {
        ACTIVE = 'active',
        REVOKED = 'revoked',
        EXPIRED = 'expired',
    }
}

