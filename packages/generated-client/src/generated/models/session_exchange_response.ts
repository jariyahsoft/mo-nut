/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { api_meta } from './api_meta';
import type { device_session } from './device_session';
import type { me_profile } from './me_profile';
export type session_exchange_response = {
    data: {
        session: device_session;
        me: me_profile;
    };
    meta: api_meta;
    error: null;
};

