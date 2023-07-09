import { BaseDecoratedStoreItem } from '../base-decorated-store-item';
import concat from 'lodash/concat';
import { StoreFieldInstance } from '../../store-field/store-field-instance';
import { FieldManager } from '../../store-field/field-manager/field-manager';
import { some } from 'lodash';
import forEach from 'lodash/forEach';


export class CombineStoreItem<T> extends BaseDecoratedStoreItem<T> {

    public override key: string | symbol;

    constructor(fields: StoreFieldInstance[], override buildInstance: any, key: string | symbol,
                override args?: any[]
    ) {
        super(fields, buildInstance, key);
        this.fieldsManager = new FieldManager(fields);
        this.key = key;
    }

    override selectForStore(): T {
        let originalState;
        if (this.args) {
            originalState = new this.buildInstance(...this.args);
        } else {
            originalState = new this.buildInstance();
        }

        const origInstanceKeys = concat<string | symbol>(
            Object.keys(originalState),
            Object.getOwnPropertySymbols(originalState));

        for(let key of origInstanceKeys) {
            const fieldInstance = this.fieldsManager.get(key);
            if (fieldInstance) {
                originalState[key] = fieldInstance.value;
            }
        }
        return originalState;
    }

    /**
     * @param value: any
     *
     * Set data in state.
     * @param key
     */
    override set(value: any, key?: string | symbol) {
        if (key) {
            this.setByKey(value, key);
            return;
        }
        const keys = Object.keys(value);
        for(let key of keys) {
            const field = this.fieldsManager.get(key);
            if (field) {
                field.setValue(value[key]);
                continue;
            }
            this.fieldsManager.pushField(value[key], key);
        }
        forEach(this.fieldsManager.getAll(), item => {
            if (some(keys, key => key !== item.propertyName)) {
                this.fieldsManager.removeField(item.propertyName);
            }
        });
    }

    protected setByKey(value: any, key: string | symbol) {
        const field = this.fieldsManager.get(key);
        if (field) {
            this.fieldsManager.set(key, value);
            return;
        }
        this.fieldsManager.pushField(value, key);

    }

}
