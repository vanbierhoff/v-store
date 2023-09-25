import { ValidationError } from '../../../services/store/models/validation/validator.interface';
import { StoreFieldInstance } from '../../store-field/store-field-instance';
import { StoreFieldMeta } from '../../store-field/models/store-field-meta';
import { StoreStrategy } from './store-strategy';


export interface StoreItemInterface<T> {
    validate(): Promise<true | Record<string | symbol, ValidationError[]>>;

    get(field?: string | symbol): StoreFieldInstance<T> | null;

    selectForStore<S = any>(): S;

    set(value: any, key?: string | symbol): void;

    getAll(field: string): StoreFieldInstance<T>[] | null;

    asyncSet?(value: any, key?: string | symbol): Promise<void>;

    key: string | symbol;

    isValid?: boolean;
}


export type StoreItemInstance<T> =
    new <T>(config: StoreStrategy<any>, key: string | symbol, ...args: any) => StoreItemInterface<T>
