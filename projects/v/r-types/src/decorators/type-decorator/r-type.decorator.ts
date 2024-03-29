import { RTypes, typeValidator } from '../../validators/type-validators';
import set from 'lodash/set';

import { RTypeValidatorInterface } from '../../validators/r-validators';

// Сделать weakRef реализацию
export function RType<T, P = any>(this: any, {
    typeOrValidator, options = undefined, defaultValue = undefined
}: {
    typeOrValidator: RTypes,
    options?: P,
    defaultValue?: T
}): any {
    return (target: any, propertyKey: string, _: PropertyDescriptor): any => {
        const SymValue = Symbol('SymbolValue');
        let validator: RTypeValidatorInterface;
        if (typeof typeOrValidator !== 'function') {
            validator = typeValidator(typeOrValidator);
        } else {
            validator = typeOrValidator;
        }

        const field = {
            [SymValue]: defaultValue || null
        };

        Object.defineProperties(field, {
            get: {
                value: () => field[SymValue] as T,
                writable: false
            },
            validate: {
                value: () => validator(field[SymValue], options),
                writable: false
            },
            set: {
                value: (value: any) => set(field, SymValue, value),
                writable: false
            }

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
