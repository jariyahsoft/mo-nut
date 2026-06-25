/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { dose_status } from './dose_status';
export type dose_occurrence = {
    dose_id: string;
    patient_id: string;
    medication_id: string;
    schedule_id: string;
    schedule_version: number;
    due_at: string;
    timezone: string;
    status: dose_status;
    responded_at: string | null;
    actor_user_id: string | null;
    actor_role: string | null;
    response_reason: string | null;
    version: number;
};

