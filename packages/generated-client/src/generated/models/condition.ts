/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type condition = {
    condition_id: string;
    name: string;
    status: condition.status;
    diagnosed_on: string;
};
export namespace condition {
    export enum status {
        ACTIVE = 'active',
        RESOLVED = 'resolved',
        MONITORING = 'monitoring',
    }
}

