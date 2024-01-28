import { StoreFieldInstance } from '../store-field-instance';
import find from 'lodash/find';
import remove from 'lodash/remove';
import { STORE_ITEM_EVENTS } from '../../store-item/models/store-item-events';
import { EventStackManager } from '@v/event-stack';
import { InjectDepsDecorator } from '../../../../helpers';
import { StoreConstructor } from '../../../create-store/create-store';
import { STORE_INSTANCE_FOR_FIELD_MANAGER } from '../../../const/tokens/store-instance-for-field-manager';
import { StoreFieldInstanceInterface } from '../models/store-field-instance.interface';


@InjectDepsDecorator([
    {field: 'storeInstance', token: STORE_INSTANCE_FOR_FIELD_MANAGER}
])
export class FieldManager<S, T extends StoreFieldInstanceInterface> {

    /**
     * Save additional data
     */
    public extra: any;

    protected storeInstance: StoreConstructor<T>;

    protected eventStackManager = new EventStackManager();

    constructor(protected fields: T[],
                extra?: any) {
        this.extra = extra;
        this.eventStackManager.addMultiple([STORE_ITEM_EVENTS.changeStoreItem]);
    }

    /**
     *
     * @param key string
     * Get field from store by key
     */
    get(key: string | symbol): T | null {
        return find(this.fields, field => field.propertyName === key) ?? null;
    }

    getAll() {
        return this.fields ?? null;
    }

    set(key: string | symbol, value: any) {
        const field = find(this.fields, keyField => keyField.propertyName === key);
        if (!field) {
            return;
        }
        field.setValue(value);
    }

    /**
     *
     * @param key string
     *  Validate the field by key
     */
    async validate(key: string) {
        const fieldInstance =
            find(this.fields, field => field.propertyName === key);
        if (fieldInstance) {
            return await fieldInstance.validate();
        }
        throw new Error(`The filed ${key} doesn't exist`);
    }

    /**
     *
     * @param value any
     * @param key  string | symbol
     *
     * For dynamic added new fields in manager
     */
    public pushField(value: any, key: string | symbol) {
        const field = new this.storeInstance({
            propertyName: key
        }, value);
        this.fields.push(field);
    }

    /**
     * @param key string | symbol
     *
     * For dynamic remove fields from manager
     */
    public removeField(key: string | symbol) {
        remove(this.fields, item => item.propertyName === key);
    }

}
