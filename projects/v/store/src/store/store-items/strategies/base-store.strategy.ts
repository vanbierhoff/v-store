import concat from 'lodash/concat';

import { FieldManager } from '../store-field/field-manager/field-manager';
import { ValidationError } from '../../services';
import { StoreStrategy } from '../store-item/models/store-strategy';
import find from 'lodash/find';
import some from 'lodash/some';
import { isPrimitive } from '@v/r-types';


export class BaseStoreStrategy<T> implements StoreStrategy<T> {

    protected fieldsManager: FieldManager;

    constructor(fields: FieldManager, protected buildInstance: any, protected args?: any[]) {
        this.fieldsManager = fields;
    }

    protected isValidStore: boolean;

    get isValid() {
        return this.isValidStore;
    }

    public selectForStore<T = any>(): T {
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

    public get(field: string | symbol) {
        return this.fieldsManager.get(field);
    }


    /**
     * validate a store data
     */
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

    /**
     * @param value - value for all store or target field
     *
     * Set data in state.
     * @param key - key for target field
     */
    public set(value: any, key?: string | symbol) {
        if (key) {
            this.setByKey(value, key);
            return;
        }
        const designedArgs: any[] = (Reflect as any).getMetadata('design:paramtypes', value.constructor) || [];

        const keys = concat<string | symbol>(
            Object.keys(value),
            Object.getOwnPropertySymbols(value));

        for(let key of keys) {
            const field = this.fieldsManager.get(key);
            if (field) {
                field.setValue(value[key]);
                continue;
            }
            if(designedArgs && !isPrimitive(value[key]) &&
                some(designedArgs, arg => arg === value[key].constructor)) {
                continue;
            }
            this.fieldsManager.pushField(value[key], key);
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
