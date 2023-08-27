import { RTypeValidatorInterface } from '../../r-validators/models/r-type-validator.interface';


export type JsTypeList = keyof typeof JsType;

export type RTypes = JsTypeList | RTypeValidatorInterface;

// 'string', 'number', 'boolean', 'array', 'bigint', 'function', 'symbol', 'undefined', 'object']
export const JsType = {
    string: 'string',
    number: 'number',
    boolean: 'boolean',
    array: 'array',
    bigint: 'bigint',
    function: 'function',
    symbol: 'symbol'
} as const;


