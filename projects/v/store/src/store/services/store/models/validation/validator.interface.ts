import { StoreFieldInstance } from '../../../../store-items/store-field/store-field-instance';


export type ValidationError = {
    error: true,
    errorMessage?: string;
    item: StoreFieldInstance;
}

export type ValidatorInterface = (item: StoreFieldInstance) =>
    Promise<true | ValidationError>
