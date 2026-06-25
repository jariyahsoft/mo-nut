/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type sync_mutation_result = {
    client_mutation_id: string;
    outcome: sync_mutation_result.outcome;
    retryable: boolean;
    server_resource_id: string | null;
    error_code: string | null;
};
export namespace sync_mutation_result {
    export enum outcome {
        APPLIED = 'applied',
        RETRYABLE_FAILURE = 'retryable_failure',
        CONFLICT = 'conflict',
    }
}

