import { StoreFieldInstance } from '../store-field-instance';
import find from 'lodash/find';
import remove from 'lodash/remove';


export class FieldManager {

    /**
     * Save additional data
     */
    public extra: any;


    constructor(protected fields: StoreFieldInstance[]) {
    }

    /**
     *
     * @param key string
     * Get field from store by key
     */
    get(key: string | symbol): StoreFieldInstance | null {
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
        const field = new StoreFieldInstance({
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
