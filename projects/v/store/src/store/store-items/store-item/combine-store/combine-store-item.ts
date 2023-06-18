import { BaseDecoratedStoreItem } from '../base-decorated-store-item';

import { isPrimitive } from '../../../../../../r-types/src/helpers/is-primitive/is-primitive';
import concat from 'lodash/concat';
import { StoreFieldInstance } from '../../store-field/store-field-instance';
import { FieldManager } from '../../store-field/field-manager/field-manager';
import { some } from 'lodash';
import forEach from 'lodash/forEach';


export class CombineStoreItem<T> extends BaseDecoratedStoreItem<T> {

    public override key: string | symbol;

    constructor(fields: StoreFieldInstance[], instance: any, key: string | symbol
    ) {
        super(fields, instance, key);
        this.fieldsManager = new FieldManager(fields);
        this.originalState = instance;
        this.key = key;
    }


    override get(field: string) {
        return this.fieldsManager.get(field);
    }

    override getAll() {
        return this.fieldsManager.getAll();
    }


    override selectForStore(): T {
        if (isPrimitive(this.originalState)) {
            return this.originalState;
        }
        const origInstanceKeys = concat<string | symbol>(
            Object.keys(this.originalState),
            Object.getOwnPropertySymbols(this.originalState));

        for(let key of origInstanceKeys) {
            const fieldInstance = this.fieldsManager.get(key);
            if (fieldInstance) {
                this.originalState[key] = fieldInstance.value;
            }
        }
        return this.originalState;
    }

    /**
     * @param value: any
     *
     * Set data in state.
     */
    override set(value: any) {
        const keys = Object.keys(value);
        for(let key of keys) {
            const field = this.fieldsManager.get(key);
            if (field) {
                field.setValue(value[key]);
                this.originalState[key] = value[key];
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

}
