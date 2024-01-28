import { StoreFieldInstance } from '../../../../store-items/store-field/store-field-instance';


export type ValidationError<T = StoreFieldInstance<any, any>> = {
    error: true,
    errorMessage?: string;
    item: T;
}

export type ValidatorInterface<I = StoreFieldInstance> = (item: I) =>
    Promise<true | ValidationError>
