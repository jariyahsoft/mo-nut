/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type report_record = {
    report_id: string;
    patient_id: string;
    scopes: Array<string>;
    status: report_record.status;
    expires_at: string | null;
    asset_id: string | null;
    created_at: string;
};
export namespace report_record {
    export enum status {
        QUEUED = 'queued',
        GENERATING = 'generating',
        READY = 'ready',
        FAILED = 'failed',
    }
}

