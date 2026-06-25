/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { account_status } from './account_status';
import type { me_preferences } from './me_preferences';
import type { role } from './role';
import type { security_event } from './security_event';
export type me_profile = {
    user_id: string;
    display_name: string;
    account_status: account_status;
    roles: Array<role>;
    active_patient_id: string | null;
    locale: string;
    preferences: me_preferences;
    patient_ids: Array<string>;
    security_events: Array<security_event>;
    version: number;
};

