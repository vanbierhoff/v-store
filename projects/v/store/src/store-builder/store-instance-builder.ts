import { BuildConfiguration, TypeStore } from './models/build-config/build-configuration';

import { StoreFieldInstance } from '../store/store-items/store-field/store-field-instance';
import { STORE_FIELD } from '../store/const/meta-keys/store-field/store-field';
import { StoreStrategy, StoreStrategyInstance } from '../store/store-items/store-item/models/store-strategy';
import { FieldManager } from '../store/store-items/store-field/field-manager/field-manager';
import { StoreItem } from '../store/store-items/store-item/store-item';
import { PRIMITIVE_KEY } from '../store/const/primitive-store-key';
import { Inject, Optional } from '@angular/core';
import { FIELD_MANAGER_TOKEN } from '../store/const';
import { CUSTOM_STORE_ITEM_TOKEN } from '../store/const/tokens/custom-store-item.token';
import { StoreItemInstance } from '../store/store-items/store-item/models/store-item.interface';
import { getMetadata } from '@v/meta-helper';
import { InjectDepsDecorator } from '../helpers/inject-deps/inject-deps.decorator';
import { StoreConstructor } from '../store/create-store/create-store';
import { StoreFieldInstanceInterface } from '../store/store-items/store-field/models/store-field-instance.interface';
import forEach from 'lodash/forEach';


@InjectDepsDecorator([
    {field: 'fieldManager', token: FIELD_MANAGER_TOKEN},
    {field: 'customStoreItem', token: CUSTOM_STORE_ITEM_TOKEN}
])
export class StoreInstanceBuilder {

    constructor(@Optional() @Inject(FIELD_MANAGER_TOKEN)
                protected fieldManager?: typeof FieldManager,
                @Optional() @Inject(CUSTOM_STORE_ITEM_TOKEN)
                protected customStoreItem?: StoreItemInstance<any>
    ) {
        if (!(this.fieldManager instanceof FieldManager)) {
            this.fieldManager = FieldManager;
        }
    }

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
     *
     * storeStrategy instance
     */
    protected storeStrategy: StoreStrategy<any>;
    /**
     * @protected
     *
     * instance from which will be created storeStrategy
     */
    protected storeStrategyInstance: StoreStrategyInstance<any>;

    /**
     * @protected
     * Storage key that can be used to access the storage
     */
    protected storeKey: string | symbol | any;

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
    protected storeFields: StoreFieldInstanceInterface[] = [];

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
     * @param key - string | symbol
     * Set storage key, that can be used to access the storage
     */
    public setKey(key: string | symbol | any) {
        this.storeKey = key;
        return this;
    }

    public setStrategy(strategy: StoreStrategyInstance) {
        this.storeStrategyInstance = strategy;
    }

    public build(): any {
        switch (this.configuration.typeStore as string) {
            case TypeStore.INSTANCE:
                this.createInstance();
                this.setValueToInstance();
                this.createStoreFields();
                this.createStrategy();
                console.log(this.storeStrategy);
                return new StoreItem(this.storeStrategy, this.storeKey);

            case TypeStore.PRIMITIVE:
                this.storeFields.push(new StoreFieldInstance({propertyName: PRIMITIVE_KEY}, this.storeValue));
                this.createStrategy();
                return new StoreItem(this.storeStrategy, this.storeKey);

            case TypeStore.CUSTOM:
                this.createInstance();
                this.createStoreFields();
                this.createStrategy();
                if (this.customStoreItem) {
                    return new this.customStoreItem(this.storeStrategy, this.storeKey);
                }

        }
    }


    protected createStoreFields(): any {
        let allFields: any[] = [];
        const metaFields = getMetadata(STORE_FIELD, this.constructorInstance as object);
        allFields.push(...metaFields);

        for(let i = 0; allFields.length > i; i++) {
            const fieldValue = this.instance[allFields[i].propertyName] || undefined;
            const field: StoreFieldInstanceInterface = new StoreFieldInstance({
                    validators: allFields[i].validators ?? undefined,
                    policy: allFields[i].policy ?? undefined,
                    propertyName: allFields[i].propertyName
                }, fieldValue
            );
            // call the initialization hook on the field if it exists
            if (allFields[i].initHook) {
                allFields[i].initHook(field);
            }
            this.storeFields.push(field);
        }
    }

    protected createStrategy() {
        const fieldManager = new this.fieldManager!(this.storeFields);
        this.storeStrategy = new this.storeStrategyInstance(
            fieldManager, this.constructorInstance, this.args);
    }

    protected createInstance() {
        if (this.args) {
            this.instance = new this.constructorInstance(...this.args);
            return;
        }
        this.instance = new this.constructorInstance();
    }

    /**
     * set a value to created instance
     * @protected
     */
    protected setValueToInstance() {
        if (!this.storeValue) {
            return;
        }
        const keys = Object.keys(this.storeValue);
        if (!keys || keys.length === 0) {
            return;
        }
        forEach(keys, key => {
            if (this.instance.hasOwnProperty(key)) {
                this.instance[key] = this.storeValue[key];
            }
        });
    }
}
