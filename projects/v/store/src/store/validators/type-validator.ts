
import { StoreFieldInstance } from '../store-items/store-field/store-field-instance';
import { ValidationError } from '../services/store/models/validation/validator.interface';
import { JsType } from '@v/r-types/validators/type-validators/models/js-type';
import { typeValidator } from '@v/r-types';



export function typeStoreValidator(type: keyof typeof JsType, errorMsg: string) {
    const validator = typeValidator(type);

    return async (field: StoreFieldInstance): Promise<true | ValidationError> => {
        const res = validator(field.value);
        if (res) {
            return true;
        }
        return {
            item: field,
            errorMessage: errorMsg
        };
    };
}
