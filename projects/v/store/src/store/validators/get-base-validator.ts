import { BaseTypes } from '../models/base-types';
import { JsType } from '@v/r-types';
import { isDateStoreValidator } from './is-date-store';
import { typeStoreValidator } from './type-validator';
import { ValidatorInterface } from '../services';




export const getBaseValidator = (type: BaseTypes | any, errorMsg: string = 'INVALID_TYPE'):
    ValidatorInterface | false => {
    switch (type) {
        case String:
            return typeStoreValidator(JsType.string, errorMsg);
        case Number:
            return typeStoreValidator(JsType.number, errorMsg);
        case Boolean:
            return typeStoreValidator(JsType.boolean, errorMsg);
        case Date:
            return isDateStoreValidator(errorMsg);
        case Symbol:
            return typeStoreValidator(JsType.symbol, errorMsg);
        case Array:
            return typeStoreValidator(JsType.array, errorMsg);
        default:
            return false;

    }
};
