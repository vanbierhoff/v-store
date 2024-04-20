import isDate from 'validator/lib/isDate';
import { ValidationError } from '../services';
import { StoreFieldInstanceInterface } from '../store-items/store-field/models/store-field-instance.interface';


export function isDateStoreValidator(errorMsg?: string) {
    return {
        name: 'dateValidator',
        validate: async (field: StoreFieldInstanceInterface): Promise<true | ValidationError> => {
            const res = isDate(field.value);
            if (res) {
                return true;
            }
            return {
                item: field,
                error: true,
                errorMessage: errorMsg || ''
            };
        }
    };
}


