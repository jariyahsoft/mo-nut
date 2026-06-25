/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type allergy = {
    allergy_id: string;
    substance: string;
    category: allergy.category;
    reaction: string;
    severity: allergy.severity;
};
export namespace allergy {
    export enum category {
        DRUG = 'drug',
        FOOD = 'food',
        ENVIRONMENT = 'environment',
    }
    export enum severity {
        MILD = 'mild',
        MODERATE = 'moderate',
        SEVERE = 'severe',
    }
}

