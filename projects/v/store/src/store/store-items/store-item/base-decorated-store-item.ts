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

    /**
     * Initial instance from which created in storeItem
     */
    public originalState: any;

    public readonly key: string | symbol;

    options: any;

    /**
     * Shows if all fields are valid. false if at least one field is invalid
     */
    private readonly isValidStore: boolean = false;

    get isValid(): boolean {
        return this.isValidStore;
    }


    async validate(): Promise<true | ValidationError[]> {
        return true;
    }

    constructor(fields: StoreFieldInstance[], instance: any, key: string | symbol
    ) {
        this.fieldsManager = new FieldManager(fields);
        this.originalState = instance;
        this.key = key;
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
    selectForStore(): T {
        forEach(this.fieldsManager.getAll(), item => {
            this.originalState[item.propertyName] = item.value;
        });

        return this.originalState;
    }

    /**
     * @param value: any
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
                this.originalState[key] = value[key];
            }
        }
    }
}
