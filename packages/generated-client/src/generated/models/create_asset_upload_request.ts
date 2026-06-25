/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type create_asset_upload_request = {
    category: create_asset_upload_request.category;
    mime_type: string;
    file_size_bytes: number;
    checksum_sha256: string;
    capture_source: create_asset_upload_request.capture_source;
};
export namespace create_asset_upload_request {
    export enum category {
        APPOINTMENT_DOCUMENT = 'appointment_document',
        MEDICATION_LABEL = 'medication_label',
        REPORT_ATTACHMENT = 'report_attachment',
        AUDIO_RECORDING = 'audio_recording',
    }
    export enum capture_source {
        CAMERA = 'camera',
        FILE_PICKER = 'file_picker',
        MICROPHONE = 'microphone',
    }
}

