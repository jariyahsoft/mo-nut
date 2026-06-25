/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type glucose_measurement_value = {
    unit: string;
    amount: number;
    context: glucose_measurement_value.context;
};
export namespace glucose_measurement_value {
    export enum context {
        FASTING = 'fasting',
        POST_MEAL = 'post_meal',
        BEDTIME = 'bedtime',
        RANDOM = 'random',
    }
}

