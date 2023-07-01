import { ValidationError } from '../../../services/store/models/validation/validator.interface';
import { StoreFieldInstance } from '../../store-field/store-field-instance';


export interface StoreItemInterface<T> {
    validate?(): Promise<true | ValidationError[]>;

    get(field?: string): StoreFieldInstance<T> | null;

    selectForStore(): T;

    set(value: any, key?: string | symbol): void;

    isValid?: boolean;
}
