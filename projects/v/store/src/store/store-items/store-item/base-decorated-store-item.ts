import { StoreFieldInstance } from '../store-field/store-field-instance';
import { ValidationError } from '../../services/store/models/validation/validator.interface';
import { FieldManager } from '../store-field/field-manager/field-manager';
import { StoreItemInterface } from './models/store-item.interface';
import forEach from 'lodash/forEach';
import concat from 'lodash/concat';


export class BaseDecoratedStoreItem<T = any> implements StoreItemInterface<T> {

    /**
     * Manager all fields in the store
     */
    public fieldsManager: FieldManager;

    public readonly key: string | symbol;

    extra: any;

    /**
     * Shows if all fields are valid. false if at least one field is invalid
     */
    private readonly isValidStore: boolean = false;

    constructor(fields: StoreFieldInstance[],
                protected buildInstance: any, key: string | symbol,
                protected args?: any[]
    ) {
        this.fieldsManager = new FieldManager(fields);
        this.key = key;
    }

    get isValid(): boolean {
        return this.isValidStore;
    }

    async validate(): Promise<true | Record<string | symbol, ValidationError[]>> {
        const fields = this.fieldsManager.getAll();
        const errors: Record<string | symbol, ValidationError[]> = {};
        for(let field of fields) {
            const result = await field.validate();
            if (result !== true) {
                errors[field.propertyName] = result;
            }
        }
        if (Object.keys(errors).length > 0) {
            return errors;
        }
        return true;
    }

    get(field: string) {
        return this.fieldsManager.get(field);
    }

    getAll() {
        return this.fieldsManager.getAll();
    }

    /**
     * Return original instance with set value form store
     */
    selectForStore<T = any>(): T {
        let originalState: any;
        if (this.args) {
            originalState = new this.buildInstance(...this.args);
        } else {
            originalState = new this.buildInstance();
        }
        forEach(this.fieldsManager.getAll(), item => {
            originalState[item.propertyName] = item.value;
        });

        return originalState;
    }

    /**
     * @param value - any
     *
     * Set data in state.
     */
    set(value: any) {
        const keys = concat<string | symbol>(
            Object.keys(value),
            Object.getOwnPropertySymbols(value));
        for(let key of keys) {
            const field = this.fieldsManager.get(key);
            if (field) {
                field.setValue(value[key]);
            }
        }
    }

    setByKey(value: any, key: string | symbol) {
        const field = this.fieldsManager.get(key);
        if (field) {
            this.fieldsManager.set(key, value);
            return;
        }
        this.fieldsManager.pushField(value, key);
    }
}
