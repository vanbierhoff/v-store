export enum TypeStore {
    COMBINE = 'combine',
    PRIMITIVE = 'primitive',
    DECORATED = 'decorated',
    INSTANCE = 'instance'
}

export interface BuildConfiguration {
    typeStore: TypeStore;
}
