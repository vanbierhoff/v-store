import { ValidationError } from '../../services/store/models/validation/validator.interface';
import { FieldManager } from '../store-field/field-manager/field-manager';
import { StoreItemInterface } from './models/store-item.interface';
import { StoreStrategy } from './models/store-strategy';
import { EventStackManager, EventStackSubscription } from '@v/event-stack';
import { STORE_ITEM_EVENTS, StoreItemEventsInterface } from './models/store-item-events';
import { StoreFieldInstance } from '../store-field/store-field-instance';
import { StackCallback } from '@v/event-stack/event-stack/stack-manager/models/stack-callback';


export class StoreItem<TYPE = any> implements StoreItemInterface<TYPE> {

    /**
     * Manager all fields in the store
     */
    public fieldsManager: FieldManager<TYPE, StoreFieldInstance>;

    public readonly key: string | symbol;

    extra: any;

    /**
     * Shows if all fields are valid. false if at least one field is invalid
     */
    protected isValidStore: boolean = false;

    protected eventStackManager = new EventStackManager();

    constructor(protected storeStrategy: StoreStrategy<any>,
                key: string | symbol
    ) {
        this.key = key;
        this.eventStackManager.addMultiple([STORE_ITEM_EVENTS.validateStoreItem, STORE_ITEM_EVENTS.changeStoreItem]);
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
        this.eventStackManager.emit<true | Record<string | symbol, ValidationError[]>>
        (STORE_ITEM_EVENTS.validateStoreItem, result);
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


    public listenEvent<T extends keyof typeof STORE_ITEM_EVENTS>(
        event: T,
        cb: StackCallback<StoreItemEventsInterface<TYPE>[T]>): EventStackSubscription {
        return this.eventStackManager.listen(event, cb);
    }

}
