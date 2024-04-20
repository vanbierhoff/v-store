import { StoreFieldInstanceInterface } from '../../../../store-items/store-field/models/store-field-instance.interface';


export type ValidationError<T = StoreFieldInstanceInterface<any, any>> = {
    error: true,
    errorMessage?: string;
    item: T;
}


export interface ValidatorInterface<I = StoreFieldInstanceInterface> {
    name: string,
    validate: (field: I) => Promise<true | ValidationError>;
}

