/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { schedule_pattern_type } from './schedule_pattern_type';
export type medication_schedule = {
    schedule_id: string;
    medication_id: string;
    pattern_type: schedule_pattern_type;
    timezone: string;
    local_times: Array<string>;
    interval_hours: number | null;
    days_of_week: Array<'monday' | 'tuesday' | 'wednesday' | 'thursday' | 'friday' | 'saturday' | 'sunday'>;
    day_of_month: number | null;
    as_needed_instructions: string | null;
    effective_from: string;
    effective_to: string | null;
    superseded_by_schedule_id: string | null;
    active: boolean;
    version: number;
    created_at: string;
};

