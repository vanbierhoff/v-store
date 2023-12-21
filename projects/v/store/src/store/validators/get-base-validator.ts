import { BaseTypes } from '../models/base-types';
import { JsType } from '@v/r-types';
import isDate from 'validator/lib/isDate';
import { typeStoreValidator, ValidatorInterface } from '@v/short-store';
import { isDateStoreValidator } from './is-date-store';




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
