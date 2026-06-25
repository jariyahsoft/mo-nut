/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type sos_channel_status = {
    channel: sos_channel_status.channel;
    delivery_status: sos_channel_status.delivery_status;
    detail: string;
};
export namespace sos_channel_status {
    export enum channel {
        CALL = 'call',
        SMS = 'sms',
        PUSH = 'push',
        LIVE_LOCATION = 'live_location',
    }
    export enum delivery_status {
        SENT = 'sent',
        FAILED = 'failed',
        UNAVAILABLE = 'unavailable',
    }
}

