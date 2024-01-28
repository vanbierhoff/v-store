import { StoreFieldOptionsInterface } from './models/store-field-options.interface';
import { StoreFieldMeta } from './models/store-field-meta';
import { EventStackManager, EventStackSubscription } from '@v/event-stack';
import { STORE_FIELD_INSTANCE_EVENTS, StoreFieldInstanceEventsInterface } from '../models/store-events';
import { ValidationError, ValidatorInterface } from '../../services';
import { TypeEvent } from '@v/short-stack/src/event-stack/stack-manager/models/type-event.type';




/**
 * Base structure in this lib.
 *
 * The lowest level layer. Basic unit for FieldsManager
 */
export class StoreFieldInstance<T = any, I_EVENTS = StoreFieldInstanceEventsInterface> {

    /**
     * @protected
     *
     * Field name from source class
     */
    public propertyName: string | symbol;
    protected storeValue: T;
    protected extra: StoreFieldOptionsInterface = {} as StoreFieldOptionsInterface;
    protected isValidStoreValue: boolean = false;
    /**
     * @protected
     * Validators responsible for checking the value of a field
     */
    protected validators: ValidatorInterface<this>[] | undefined;

    protected policyFn: (() => Promise<boolean>) | undefined;

    protected eventStackManager = new EventStackManager();

    constructor(config: StoreFieldMeta, value?: T) {
        this.validators = config.validators;
        this.policyFn = config.policy || undefined;
        this.propertyName = config.propertyName;
        this.setValue(value);
        this.eventStackManager.addMultiple<this>([STORE_FIELD_INSTANCE_EVENTS.changeValue, STORE_FIELD_INSTANCE_EVENTS.validate]);
    }

    /**
     * @Getter
     * Returns the value of the field
     */
    get value(): T {
        return this.storeValue;
    }

    get isValid() {
        return this.isValidStoreValue;
    }

    set isValid(value) {
        throw new Error('This value is not editable');
    }

    /**
     * Setter function for update field value
     * @return value
     */
    setValue<T = any>(value: any): T {
        this.storeValue = value;
        this.eventStackManager.emit<this>(STORE_FIELD_INSTANCE_EVENTS.changeValue, this);
        return value;
    }

    /**
     * Function for validate field value
     * @return Promise<boolean>
     */
    public async validate(): Promise<true | ValidationError[]> {
        const errors: ValidationError[] = [];
        if (!this.validators) {
            return this.isValidStoreValue = true;
        }

        for await (let validator of this.validators) {
            let res = await validator(this);
            if (res !== true) {
                this.isValidStoreValue = false;
                errors.push(res);
            }
        }
        if (errors.length > 0) {
            this.isValidStoreValue = false;
            this.eventStackManager.emit<true | ValidationError[]>(STORE_FIELD_INSTANCE_EVENTS.validate, errors);
            return errors;
        }
        this.eventStackManager.emit<true | ValidationError[]>(STORE_FIELD_INSTANCE_EVENTS.validate, true);
        return this.isValidStoreValue = true;
    }

    public listenEvent<E_TYPE extends keyof I_EVENTS>(
        event: E_TYPE,
        cb: TypeEvent<I_EVENTS, E_TYPE>): EventStackSubscription {
        return this.eventStackManager.listen(event as string | symbol, cb);
    }
}
