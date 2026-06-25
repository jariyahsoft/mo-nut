/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { blood_pressure_measurement_value } from './blood_pressure_measurement_value';
import type { measurement_source } from './measurement_source';
export type blood_pressure_measurement_request = {
    measurement_type: string;
    measured_at: string;
    timezone: string;
    source: measurement_source;
    recorded_by_user_id: string;
    note?: string;
    value: blood_pressure_measurement_value;
};

