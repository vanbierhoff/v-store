import { StoreFieldInstanceInterface } from '../../../../store-items/store-field/models/store-field-instance.interface';


export type ValidationError<T = StoreFieldInstanceInterface<any, any>> = {
    error: true,
    errorMessage?: string;
    item: T;
}

export type ValidatorInterface<I = StoreFieldInstanceInterface> = (item: I) =>
    Promise<true | ValidationError>
