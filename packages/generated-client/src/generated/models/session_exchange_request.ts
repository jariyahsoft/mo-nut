/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { platform } from './platform';
export type session_exchange_request = {
    identity_provider: session_exchange_request.identity_provider;
    identity_token: string;
    device: {
        device_name: string;
        platform: platform;
        app_version: string;
        locale: string;
    };
};
export namespace session_exchange_request {
    export enum identity_provider {
        PHONE_OTP = 'phone_otp',
        EMAIL_PASSWORDLESS = 'email_passwordless',
        GOOGLE = 'google',
        APPLE = 'apple',
    }
}

