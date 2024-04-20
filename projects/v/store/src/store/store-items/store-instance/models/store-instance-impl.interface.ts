import { ValidationError } from '../../../services/store/models/validation/validator.interface';
import { StoreStrategy } from './store-strategy';
import { StackCallback } from '@v/event-stack/event-stack/stack-manager/models/stack-callback';
import { EventStackSubscription } from '@v/event-stack/event-stack/stack-item/models/event-stack.item.interface';
import { StoreFieldInstanceInterface } from '../../store-field/models/store-field-instance.interface';
import { ExtraProvider } from '../../../../extra-provider';



export interface StoreInstanceImplInterface<T> {
    validate(): Promise<true | Record<string | symbol, ValidationError[]>>;

    get(field?: string | symbol): StoreFieldInstanceInterface<T>;

    selectForStore<S = any>(): S;

    set(value: any, key?: string | symbol): void;

    getAll(field?: string): StoreFieldInstanceInterface<T>[] | null;

    asyncSet?(value: any, key?: string | symbol): Promise<void>;

    listenEvent(event: any, cb: StackCallback<any>): EventStackSubscription;

    extra: ExtraProvider;

    key: string | symbol | object;

    isValid?: boolean;
}


export type StoreItemInstance<T> =
    new <T>(config: StoreStrategy<any>, key: string | symbol, ...args: any) => StoreInstanceImplInterface<T>
