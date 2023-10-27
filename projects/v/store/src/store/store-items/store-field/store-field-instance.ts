import { ValidationError, ValidatorInterface } from '../../services/store/models/validation/validator.interface';
import { StoreFieldOptionsInterface } from './models/store-field-options.interface';
import { StoreFieldMeta } from './models/store-field-meta';
import { EventStackManager } from '@v/event-stack';
import { STORE_FIELD_EVENTS } from '../models/store-events';


export class StoreFieldInstance<T = any> {

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
    protected validators: ValidatorInterface[] | undefined;

    protected policyFn: (() => Promise<boolean>) | undefined;

    protected eventStackManager = new EventStackManager();

    constructor(config: StoreFieldMeta, value?: T) {
        this.validators = config.validators;
        this.policyFn = config.policy || undefined;
        this.propertyName = config.propertyName;
        this.setValue(value);
        this.eventStackManager.addMultiple<StoreFieldInstance>([STORE_FIELD_EVENTS.changeValue, STORE_FIELD_EVENTS.validate]);
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
        this.eventStackManager.emit<StoreFieldInstance>(STORE_FIELD_EVENTS.changeValue, this);
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
            this.eventStackManager.emit(STORE_FIELD_EVENTS.validate, this);
            return errors;
        }
        this.eventStackManager.emit(STORE_FIELD_EVENTS.validate, this);
        return this.isValidStoreValue = true;
    }
}
