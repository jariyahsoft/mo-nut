/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type preparation_item = {
    item_id: string;
    label: string;
    type: preparation_item.type;
};
export namespace preparation_item {
    export enum type {
        FASTING = 'fasting',
        DOCUMENT = 'document',
        MEDICATION = 'medication',
        TRAVEL = 'travel',
        OTHER = 'other',
    }
}

