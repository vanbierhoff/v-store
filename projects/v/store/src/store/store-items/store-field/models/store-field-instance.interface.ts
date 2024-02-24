import { TypeEvent } from '@v/event-stack';
import { EventStackSubscription } from '@v/event-stack/event-stack/stack-item/models/event-stack.item.interface';
import { ValidationError } from '../../../services/store/models/validation/validator.interface';
import { ExtraProvider } from '../../../../extra-provider/extra-provider';



export interface StoreFieldInstanceInterface<T = any, I_EVENTS = any> {

    /**
     * @protected
     *
     * Field name from source class
     */
    propertyName: string | symbol;

    extra: ExtraProvider;

    listenEvent<E_TYPE extends keyof I_EVENTS>(
        event: E_TYPE,
        cb: TypeEvent<I_EVENTS, E_TYPE>): EventStackSubscription;

    validate(): Promise<true | ValidationError[]>;

    setValue<T = any>(value: any): T;

    get value(): T;

    get isValid(): boolean;

    set isValid(value: boolean);
}
