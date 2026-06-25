/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { measurement_source } from './measurement_source';
import type { weight_measurement_value } from './weight_measurement_value';
export type weight_measurement_request = {
    measurement_type: string;
    measured_at: string;
    timezone: string;
    source: measurement_source;
    recorded_by_user_id: string;
    note?: string;
    value: weight_measurement_value;
};

