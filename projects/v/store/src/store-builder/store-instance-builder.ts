import { BuildConfiguration, TypeStore } from './models/build-config/build-configuration';
import { StoreConstructor } from '../store/create-store/create-from-decorated';
import { StoreFieldInstance } from '../store/store-items/store-field/store-field-instance';
import { getMetadata } from '../../../meta-helper/src/lib/meta-helpers/get-metadata/get-metadata';
import { CombineStoreItem } from '../store/store-items/store-item/combine-store/combine-store-item';
import { STORE_FIELD } from '../store/const/meta-keys/store-field/store-field';
import forEach from 'lodash/forEach';
import { filter, some } from 'lodash';
import { BaseDecoratedStoreItem } from '../store/store-items/store-item/base-decorated-store-item';
import find from 'lodash/find';
import { FieldManager } from '../store/store-items/store-field/field-manager/field-manager';
import {
    PRIMITIVE_KEY,
    PrimitiveStoreItem
} from '../store/store-items/store-item/primitive-store-item/primitive-store-item';


export class StoreInstanceBuilder {

    /**
     * @protected
     * Auxiliary set of builder parameters for creating a store
     */
    protected configuration: BuildConfiguration = {} as BuildConfiguration;

    /**
     * @protected
     * args for create instance. If store is a class
     */
    protected args: any[];

    /**
     * @protected
     * Store value. if store is object(array, primitive value etc)
     * Store item is not a class
     */
    protected storeValue: any;

    /**
     * @protected
     * Storage key that can be used to access the storage
     */
    protected storeKey: string | symbol;

    /**
     * @protected
     * constructor instance. If Store Item is a class
     */
    protected constructorInstance: StoreConstructor<any>;

    /**
     * @protected
     * Instance created from constructor
     */
    protected instance: any;

    /**
     * @protected
     * StoreFieldsInstance list
     */
    protected storeFields: StoreFieldInstance[] = [];

    /**
     *
     * @param type
     * Set type store
     */
    public setTypeStore(type: BuildConfiguration['typeStore']) {
        this.configuration.typeStore = type;
        return this;
    }

    /**
     * @param instance
     * Set an instance of which store will be instantiated. If it is a class
     */
    public setConstructorInstance<T = any>(instance: StoreConstructor<T>) {
        this.constructorInstance = instance;
        return this;
    }

    /**
     * @param value
     * Set store value if store item is not a class
     */
    public setStoreValue(value: any) {
        this.storeValue = value;
        return this;
    }

    /**
     * @param args
     * Set args for create store item as class
     */
    public setArgs(args: any[]) {
        this.args = args;
        return this;
    }

    /**
     *
     * @param key: string | symbol
     * Set storage key, that can be used to access the storage
     */
    public setKey(key: string | symbol) {
        this.storeKey = key;
        return this;
    }

    protected createStoreField(): any {
        let allFields: any[] = [];
        const metaFields = getMetadata(STORE_FIELD, this.constructorInstance as object);
        allFields.push(...metaFields);
        if (this.configuration.typeStore === TypeStore.COMBINE) {
            forEach(Object.keys(this.instance), key => {
                if (some(metaFields, meta => meta.propertyName !== key) &&
                    typeof this.instance[key] !== 'function') {
                    allFields.push({
                        propertyName: key
                    });
                }
            });
        }
        console.log(allFields);
        for(let i = 0; allFields.length > i; i++) {
            const fieldValue = this.instance[allFields[i].propertyName] || undefined;
            const field = new StoreFieldInstance({
                    validators: allFields[i].validators ?? undefined,
                    policy: allFields[i].policy ?? undefined,
                    propertyName: allFields[i].propertyName
                }, fieldValue
            );
            this.storeFields.push(field);
        }
    }

    protected removeNotDecorated() {
        const metaFields = getMetadata(STORE_FIELD, this.constructorInstance as object);
        forEach(Object.keys(this.instance), key => {
            const field = find(metaFields, meta => meta.propertyName === key);
            if (field) {
                return;
            }
            delete this.instance[key];
        });
    }

    protected createInstance() {
        if (this.args) {
            this.instance = new this.constructorInstance(...this.args);
            return;
        }
        this.instance = new this.constructorInstance();
    }

    public build(): any {
        switch (this.configuration.typeStore) {
            case TypeStore.COMBINE:
                this.createInstance();
                this.createStoreField();
                return new CombineStoreItem(this.storeFields, this.instance, this.storeKey);

            case TypeStore.DECORATED:
                this.createInstance();
                this.createStoreField();
                this.removeNotDecorated();
                return new BaseDecoratedStoreItem(this.storeFields, this.instance, this.storeKey);

            case TypeStore.PRIMITIVE:
                const field = new StoreFieldInstance({propertyName: PRIMITIVE_KEY}, this.storeValue);
                return new PrimitiveStoreItem([field], this.storeKey);

        }

    }
}
