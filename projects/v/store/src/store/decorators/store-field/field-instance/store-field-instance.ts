import { ValidationError, ValidatorInterface } from '../../../services/store/models/validation/validator.interface';
import { StoreFieldDecoratorInterface } from '../models/store.field-decorator.interface';
import { StoreFieldOptionsInterface } from './models/store-field-options.interface';


export class StoreFieldInstance<T = any> {

    protected storeValue: T;

    protected options: StoreFieldOptionsInterface;

    protected isValidStoreValue: boolean;

    /**
     * @protected
     * Validators responsible for checking the value of a field
     */
    protected validators: ValidatorInterface[] | undefined;

    protected policyFn: (() => Promise<boolean>) | undefined;

    constructor(config: StoreFieldDecoratorInterface) {
        this.options.strictSet = config.strictSet ?? false;
        this.validators = config.validators || undefined;
        this.policyFn = config.policy;
    }

    /**
     * @Getter
     * Returns the value of the field
     */
    get value(): T {
        return this.storeValue;
    }

    /**
     * Setter function for update field value
     * @return value
     */
    async setValue(value: any): Promise<any> {
        if (this.options.strictSet) {
            this.validate().then((res) => {
                if (res) {
                    this.storeValue = value;
                    return value;
                }
            });
        }
        this.storeValue = value;
        return value;
    }

    get isValid() {
        return this.isValidStoreValue;
    }

    set isValid(value) {
        throw new Error('This value is not editable');
    }

    /**
     * Function for validate field value
     * @return Promise<boolean>
     */
    public async validate(): Promise<true | ValidationError> {
        if (!this.validators) {
            return this.isValidStoreValue = true;
        }

        for await (let validator of this.validators) {
            let res = await validator(this);
            if (res !== true) {
                this.isValidStoreValue = false;
                return res;
            }
        }
        return this.isValidStoreValue = true;
    }
}
