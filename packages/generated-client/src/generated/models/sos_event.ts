/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { sos_channel_status } from './sos_channel_status';
export type sos_event = {
    sos_id: string;
    patient_id: string;
    status: sos_event.status;
    disclosure_note: string;
    allowed_channels: Array<'call' | 'sms' | 'push' | 'live_location'>;
    channel_statuses: Array<sos_channel_status>;
    initiated_at: string;
    closed_at: string | null;
};
export namespace sos_event {
    export enum status {
        ACTIVE = 'active',
        CLOSED = 'closed',
    }
}

