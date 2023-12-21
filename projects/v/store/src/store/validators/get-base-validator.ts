import { BaseTypes } from '../models/base-types';
import { JsType } from '@v/r-types';
import { isDateStoreValidator } from './is-date-store';
import { typeStoreValidator } from './type-validator';
import { ValidatorInterface } from '../services';




export const getBaseValidator = (type: BaseTypes | any, errorMsg?: string):
    ValidatorInterface | false => {
    switch (type) {
        case String:
            return typeStoreValidator(JsType.string);
        case Number:
            return typeStoreValidator(JsType.number);
        case Boolean:
            return typeStoreValidator(JsType.boolean);
        case Date:
            return isDateStoreValidator(errorMsg);
        case Symbol:
            return typeStoreValidator(JsType.symbol);
        case Array:
            return typeStoreValidator(JsType.array);
        default:
            return false;

    }
};
