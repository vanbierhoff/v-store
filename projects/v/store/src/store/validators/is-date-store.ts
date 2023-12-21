import { StoreFieldInstance, ValidationError } from '@v/short-store';
import isDate from 'validator/lib/isDate';


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


