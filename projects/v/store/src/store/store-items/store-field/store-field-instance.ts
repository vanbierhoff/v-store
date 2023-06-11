import { ValidationError, ValidatorInterface } from '../../services/store/models/validation/validator.interface';
import { StoreFieldOptionsInterface } from './models/store-field-options.interface';
import { StoreFieldMeta } from './models/store-field-meta';


export class StoreFieldInstance<T = any> {

    protected storeValue: T;

    protected options: StoreFieldOptionsInterface = {} as StoreFieldOptionsInterface;

    protected isValidStoreValue: boolean = false;

    /**
     * @protected
     *
     * Field name from source class
     */
    protected propertyName: string;

    /**
     * @protected
     * Validators responsible for checking the value of a field
     */
    protected validators: ValidatorInterface[] | undefined;

    protected policyFn: (() => Promise<boolean>) | undefined;

    constructor(config: StoreFieldMeta, value?: T) {
        this.options.strictSet = config.strictSet ?? false;
        this.validators = config.validators || undefined;
        this.policyFn = config.policy;
        this.propertyName = config.propertyName;
        this.setValue(value);
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
            return this.validate().then((res) => {
                if (res) {
                    this.storeValue = value;
                    this.isValidStoreValue = true;
                    return value;
                }
            });
        }
        this.isValidStoreValue = true;
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
