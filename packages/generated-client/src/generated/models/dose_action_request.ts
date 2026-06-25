/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type dose_action_request = {
    action: dose_action_request.action;
    responded_at: string;
    actor_user_id: string;
    actor_role: dose_action_request.actor_role;
    response_reason: string;
};
export namespace dose_action_request {
    export enum action {
        TAKEN = 'taken',
        SNOOZED = 'snoozed',
        SKIPPED = 'skipped',
        ISSUE_REPORTED = 'issue_reported',
    }
    export enum actor_role {
        PATIENT = 'patient',
        CAREGIVER = 'caregiver',
    }
}

