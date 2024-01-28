import { TypeEvent } from '@v/event-stack';
import { EventStackSubscription } from '@v/event-stack/event-stack/stack-item/models/event-stack.item.interface';
import {  ValidationError } from '@v/short-store';


export interface StoreFieldInstanceInterface<T = any, I_EVENTS = any> {

    /**
     * @protected
     *
     * Field name from source class
     */
    propertyName: string | symbol;

    listenEvent<E_TYPE extends keyof I_EVENTS>(
        event: E_TYPE,
        cb: TypeEvent<I_EVENTS, E_TYPE>): EventStackSubscription;

    validate(): Promise<true | ValidationError[]>;

    setValue<T = any>(value: any): T;

    get value(): T;

    get isValid(): boolean;

    set isValid(value: boolean);
}
