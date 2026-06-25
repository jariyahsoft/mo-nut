/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type confirm_processing_draft_request = {
    target_type: confirm_processing_draft_request.target_type;
    confirmed_by_user_id: string;
    fields: Record<string, any>;
};
export namespace confirm_processing_draft_request {
    export enum target_type {
        APPOINTMENT = 'appointment',
        MEDICATION = 'medication',
        CHECKLIST = 'checklist',
        TRANSCRIPT = 'transcript',
    }
}

