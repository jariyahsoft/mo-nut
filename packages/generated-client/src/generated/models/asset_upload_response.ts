/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { api_meta } from './api_meta';
import type { asset_upload_target } from './asset_upload_target';
export type asset_upload_response = {
    data: {
        asset_id: string;
        patient_id: string;
        category: string;
        mime_type: string;
        file_size_bytes: number;
        upload_target: asset_upload_target;
    };
    meta: api_meta;
    error: null;
};

