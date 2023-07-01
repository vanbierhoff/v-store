export enum TypeStore {
    COMBINE = 'combine',
    PRIMITIVE = 'primitive',
    DECORATED = 'decorated'
}

export interface BuildConfiguration {
    typeStore: TypeStore;
}
