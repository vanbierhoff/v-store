import { JsType } from './models/js-type';



/**
 * A simple type validator
 * Supported => 'string', 'number', 'boolean', 'array', 'bigint', 'function', 'symbol'
 */
export const typeValidator = (type: keyof typeof JsType) => {
    const types = JsType;
    let checkedType: string;
    if (!(type as any in types)) {
        throw new Error(`This validator doesn't supported  ${type} type `);
    }
    checkedType = type;
    return (value: any): boolean => {
        let type: keyof  typeof JsType = typeof value as keyof typeof JsType;
        if(Array.isArray(value)) {
            type = JsType.array;
        }
        return checkedType === type;
    };
};
