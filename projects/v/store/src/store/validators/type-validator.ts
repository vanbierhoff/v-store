import { ValidationError, ValidatorInterface } from '../services/store/models/validation/validator.interface';
import { JsType, typeValidator } from '@v/r-types';
import { StoreFieldInstanceInterface } from '../store-items/store-field/models/store-field-instance.interface';


export function typeStoreValidator(type: keyof typeof JsType, errorMsg?: string): ValidatorInterface {
    const validator = typeValidator(type);
    return {
        name: 'typeValidator',
        validate: async (field: StoreFieldInstanceInterface): Promise<true | ValidationError> => {
            const res = validator(field.value);
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

