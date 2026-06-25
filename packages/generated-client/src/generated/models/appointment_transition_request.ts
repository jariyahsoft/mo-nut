/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { appointment_status } from './appointment_status';
export type appointment_transition_request = {
    target_status: appointment_status;
    reason: string;
    transition_occurred_at?: string;
};

