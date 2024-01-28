import { ValidationError } from '../../../services/store/models/validation/validator.interface';
import { StoreFieldInstance } from '../../store-field/store-field-instance';
import { StoreStrategy } from './store-strategy';
import { StackCallback } from '@v/event-stack/event-stack/stack-manager/models/stack-callback';
import { EventStackSubscription } from '@v/event-stack/event-stack/stack-item/models/event-stack.item.interface';



export interface StoreItemInterface<T> {
    validate(): Promise<true | Record<string | symbol, ValidationError[]>>;

    get(field?: string | symbol): StoreFieldInstance<T> | null;

    selectForStore<S = any>(): S;

    set(value: any, key?: string | symbol): void;

    getAll(field: string): StoreFieldInstance<T>[] | null;

    asyncSet?(value: any, key?: string | symbol): Promise<void>;

    listenEvent(event: any, cb: StackCallback<any>): EventStackSubscription

    key: string | symbol;

    isValid?: boolean;
}


export type StoreItemInstance<T> =
    new <T>(config: StoreStrategy<any>, key: string | symbol, ...args: any) => StoreItemInterface<T>
