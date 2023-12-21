import isDate from 'validator/lib/isDate';
import { StoreFieldInstance } from '../store-items/store-field/store-field-instance';
import { ValidationError } from '../services';


export function isDateStoreValidator(errorMsg?: string) {
    return async (field: StoreFieldInstance): Promise<true | ValidationError> => {
        const res = isDate(field.value);
        if (res) {
            return true;
        }
        return {
            item: field,
            error: true,
            errorMessage: errorMsg || ''
        };
    };
}


