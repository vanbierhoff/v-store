import { ValidationError } from '../../services/store/models/validation/validator.interface';
import { FieldManager } from '../store-field/field-manager/field-manager';
import forEach from 'lodash/forEach';
import concat from 'lodash/concat';
import { StoreStrategy } from '../store-item/models/store-strategy';
import { StoreFieldInstance } from '../store-field/store-field-instance';
import { StoreFieldInstanceInterface } from '../store-field/models/store-field-instance.interface';


export class DecoratedStoreStrategy<T = any> implements StoreStrategy<T> {

    /**
     * Manager all fields in the store
     */
    public fieldsManager: FieldManager<T, StoreFieldInstanceInterface>;

    /**
     * Shows if all fields are valid. false if at least one field is invalid
     */
    protected isValidStore: boolean = false;

    constructor(fields: FieldManager<T, StoreFieldInstanceInterface>, protected buildInstance: any, protected args?: any[]) {
        this.fieldsManager = fields;
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
                this.isValidStore = false;
                errors[field.propertyName] = result;
            }
        }
        if (Object.keys(errors).length > 0) {
            return errors;
        }
        this.isValidStore = true;
        return true;
    }

    get(field: string) {
        return this.fieldsManager.get(field);
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
     * @param key - key field for access to value
     */
    set(value: any, key: string | symbol) {
        if (key) {
            return this.setByKey(value, key);
        }
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
