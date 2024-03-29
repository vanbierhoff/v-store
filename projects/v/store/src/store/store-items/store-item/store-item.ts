import { ValidationError } from '../../services/store/models/validation/validator.interface';
import { FieldManager } from '../store-field/field-manager/field-manager';
import { StoreItemInterface } from './models/store-item.interface';
import { StoreStrategy } from './models/store-strategy';


export class StoreItem<T = any> implements StoreItemInterface<T> {

    /**
     * Manager all fields in the store
     */
    public fieldsManager: FieldManager;

    public readonly key: string | symbol;

    extra: any;

    /**
     * Shows if all fields are valid. false if at least one field is invalid
     */
    protected isValidStore: boolean = false;

    constructor(protected storeStrategy: StoreStrategy<any>,
                key: string | symbol
    ) {
        this.key = key;
    }

    /**
     * @return boolean
     *
     * return valid store status
     */
    get isValid(): boolean {
        return this.isValidStore;
    }

    /**
     * validate a store data
     */
    async validate(): Promise<true | Record<string | symbol, ValidationError[]>> {
        const result = await this.storeStrategy.validate();
        this.isValidStore = result === true;
        return result;
    }

    get(field: string | symbol) {
        return this.storeStrategy.get(field);
    }

    /**
     *  get all fields from store
     */
    getAll() {
        return this.fieldsManager.getAll();
    }

    /**
     * Return original instance with set value form store
     */
    selectForStore<T = any>(): T {
        return this.storeStrategy.selectForStore();
    }

    /**
     * @param value - any
     *
     * @param key - key to field for set a value to field
     *
     * Set data in state.
     */
    set(value: any, key?: string | symbol) {
        this.storeStrategy.set(value, key);
    }

}
