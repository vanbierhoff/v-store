export enum TypeStore {
    COMBINE = 'combine',
    PRIMITIVE = 'primitive',
    INSTANCE = 'instance'
}

export interface BuildConfiguration {
    typeStore: TypeStore;
}
