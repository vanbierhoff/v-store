import { StoreInstanceBuilder } from '../../store-builder/store-instance-builder';
import { TypeStore } from '../../store-builder/models/build-config/build-configuration';
import { STORE_META_KEY } from '../const/meta-keys/store-instance/store-isnatnce';
import { getMetadata } from '@v/meta-helper';
import { STORE_DATA_SERVICE_TOKEN, StoreDataService } from '../services';
import { isPrimitive, PrimitiveType } from '@v/r-types';
import { PrimitiveStoreStrategy } from '../store-items/strategies/primitive-store.strategy';
import { BaseStoreStrategy } from '../store-items/strategies/base-store.strategy';
import { getGlobalInjector } from '../injector/injector';
import { StoreInstanceImplInterface } from '../store-items/store-instance/models/store-instance-impl.interface';


export type StoreConstructor<T> = new(...args: any[]) => T;

/**
 *  Created store from decorated instance for created of [[createStore]] for sync operations.
 */
export function createStore<T = any>(storeInstance: StoreConstructor<T> | PrimitiveType | any,
                                     key?: string | symbol, custom = false,
                                     args?: any[]): StoreInstanceImplInterface<T> {

    const constructorInstance = typeof storeInstance === 'function' ? storeInstance as StoreConstructor<T> : storeInstance['constructor'];
    const storeBuilder = new StoreInstanceBuilder()
        .setConstructorInstance<T>(constructorInstance)
        .setKey(key ?? storeInstance);

    if (args) {
        storeBuilder.setArgs(args);
    }
    if (!isPrimitive(storeInstance) && typeof storeInstance !== 'function') {
        storeBuilder.setStoreValue(storeInstance);
    }

    if (isPrimitive(storeInstance)) {
        storeBuilder.setTypeStore(TypeStore.PRIMITIVE);
        storeBuilder.setStrategy(PrimitiveStoreStrategy);
        storeBuilder.setStoreValue(storeInstance);
    } else {
        // use key from decorator!
        const meta = getMetadata(STORE_META_KEY, constructorInstance as object);
        if (!meta) {
            throw new Error(`instance ${storeInstance as string} doesn't have StoreInstanceDecorator decorator`);
        }
        if (custom) {
            storeBuilder.setTypeStore(TypeStore.CUSTOM);
        } else {
            storeBuilder.setTypeStore(TypeStore.INSTANCE);
            storeBuilder.setStrategy(BaseStoreStrategy);
        }
    }
    const injector = getGlobalInjector();
    if (!injector) {
        throw new Error(`Injector doesn't' exist`);
    }

    const storeItem = storeBuilder.build();
    const storeData: StoreDataService = injector.get(STORE_DATA_SERVICE_TOKEN);
    storeData.addToStore(storeItem);
    return storeItem;
}
