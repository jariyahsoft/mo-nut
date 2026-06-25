/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { height_measurement_value } from './height_measurement_value';
import type { measurement_source } from './measurement_source';
export type height_measurement_request = {
    measurement_type: string;
    measured_at: string;
    timezone: string;
    source: measurement_source;
    recorded_by_user_id: string;
    note?: string;
    value: height_measurement_value;
};

