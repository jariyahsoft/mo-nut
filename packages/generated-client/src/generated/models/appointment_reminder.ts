/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type appointment_reminder = {
    channel: appointment_reminder.channel;
    minutes_before: number;
};
export namespace appointment_reminder {
    export enum channel {
        IN_APP = 'in_app',
        WEB_PUSH = 'web_push',
        SMS = 'sms',
        EMAIL = 'email',
    }
}

