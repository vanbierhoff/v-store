import { JsType } from '../../validators/type-validators/models/js-type';
import set from 'lodash/set';
import { typeValidator } from '@v/r-types';

// Сделать weakRef реализацию
export function RType<T>(this: any, type: keyof typeof JsType, defaultValue?: T): any {
    return (target: any, propertyKey: string, _: PropertyDescriptor): any => {
        const SymValue = Symbol('SymbolValue');
        const validator = typeValidator(type);
        const field = {
            [SymValue]: defaultValue || null,
        }

        Object.defineProperties(field, {
            get: {
                value: () =>  field[SymValue] as T,
                writable: false,
            },
            validate: {
                value: () => validator(field[SymValue]),
                writable: false
            },
        });

        return {
            get: (): any => {
                return field;
            },
            set(value: any) {
                set(field, SymValue, value);
                return true;
            }
        };
    };
}
