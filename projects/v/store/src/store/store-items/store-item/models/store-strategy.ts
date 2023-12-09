import { ValidationError } from '../../../services';
import { StoreFieldInstance } from '../../store-field/store-field-instance';
import { FieldManager } from '../../store-field/field-manager/field-manager';


export type StoreStrategyInstance<T = any> = new(fields: FieldManager<T, StoreFieldInstance>, buildInstance: any, args?: any) => StoreStrategy<T>

export interface StoreStrategy<T> {
    validate(): Promise<true | Record<string | symbol, ValidationError[]>>;

    get(field?: string | symbol): StoreFieldInstance<T> | null;

    selectForStore<S = any>(): S;

    set(value: any, key?: string | symbol): void;

    asyncSet?(value: any, key?: string | symbol): Promise<void>;

    isValid: boolean;
}

