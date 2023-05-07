
import { ValidateFn } from './validate-fn.interface';

export interface TypeInstanceInterface<T = any> {
    get(): T;
    set(): T;

    validate: ValidateFn

}


