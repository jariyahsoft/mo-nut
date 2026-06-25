/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type measurement_summary_item = {
    measurement_type: measurement_summary_item.measurement_type;
    latest_value_text: string;
    average_value_text: string;
    trend_direction: measurement_summary_item.trend_direction;
    threshold_status: measurement_summary_item.threshold_status;
};
export namespace measurement_summary_item {
    export enum measurement_type {
        WEIGHT = 'weight',
        HEIGHT = 'height',
        PULSE = 'pulse',
        GLUCOSE = 'glucose',
        BLOOD_PRESSURE = 'blood_pressure',
    }
    export enum trend_direction {
        UP = 'up',
        DOWN = 'down',
        STABLE = 'stable',
        INSUFFICIENT_DATA = 'insufficient_data',
    }
    export enum threshold_status {
        WITHIN_RANGE = 'within_range',
        OUTSIDE_RANGE = 'outside_range',
        NOT_CONFIGURED = 'not_configured',
    }
}

