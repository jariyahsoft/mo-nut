/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { api_meta } from './api_meta';
import type { sync_mutation_result } from './sync_mutation_result';
export type sync_batch_response = {
    data: {
        results: Array<sync_mutation_result>;
    };
    meta: api_meta;
    error: null;
};

