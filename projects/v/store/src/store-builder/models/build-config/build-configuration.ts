export enum TypeStore {
    PRIMITIVE = 'primitive',
    INSTANCE = 'instance',
    CUSTOM = 'custom'
}

export interface BuildConfiguration {
    typeStore: TypeStore;
}
