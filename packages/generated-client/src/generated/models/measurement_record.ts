/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { blood_pressure_measurement_value } from './blood_pressure_measurement_value';
import type { glucose_measurement_value } from './glucose_measurement_value';
import type { height_measurement_value } from './height_measurement_value';
import type { measurement_source } from './measurement_source';
import type { pulse_measurement_value } from './pulse_measurement_value';
import type { weight_measurement_value } from './weight_measurement_value';
export type measurement_record = {
    measurement_id: string;
    patient_id: string;
    measurement_type: measurement_record.measurement_type;
    measured_at: string;
    timezone: string;
    source: measurement_source;
    recorded_by_user_id: string;
    note: string;
    value: (weight_measurement_value | height_measurement_value | pulse_measurement_value | glucose_measurement_value | blood_pressure_measurement_value);
    version: number;
    created_at: string;
    updated_at: string;
};
export namespace measurement_record {
    export enum measurement_type {
        WEIGHT = 'weight',
        HEIGHT = 'height',
        PULSE = 'pulse',
        GLUCOSE = 'glucose',
        BLOOD_PRESSURE = 'blood_pressure',
    }
}

