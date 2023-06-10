import { StoreFieldInstance } from '../../../../decorators/store-field/field-instance/store-field-instance';


export type ValidationError = {
    errorMessage: string;
    item: StoreFieldInstance;
}

export type ValidatorInterface = (item: StoreFieldInstance) =>
    Promise<true | ValidationError>
