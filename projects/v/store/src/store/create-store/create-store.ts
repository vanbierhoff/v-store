import { StoreInstanceBuilder } from '../../store-builder/store-instance-builder';
import { TypeStore } from '../../store-builder/models/build-config/build-configuration';
import { STORE_META_KEY } from '../const/meta-keys/store-instance/store-isnatnce';
import { getMetadata } from '@v/meta-helper';
import { StoreDataService } from '../services';
import { PrimitiveType } from '@v/r-types';
import { isPrimitive } from '@v/r-types';
import { PrimitiveStoreStrategy } from '../store-items/strategies/primitive-store.strategy';
import { BaseStoreStrategy } from '../store-items/strategies/base-store.strategy';
import { getGlobalInjector } from '../injector/injector';


export type StoreConstructor<T> = new(...args: any[]) => T;

/**
 *  Created store from decorated instance for created of [[createStore]] for sync operations.
 */
export function createStore<T = any>(storeInstance: StoreConstructor<T> | PrimitiveType,
                                     key: string | symbol, args?: any[]): void {

    const storeBuilder = new StoreInstanceBuilder()
        .setConstructorInstance<T>(storeInstance as StoreConstructor<T>)
        .setKey(key);

    if (args) {
        storeBuilder.setArgs(args);
    }

    if (isPrimitive(storeInstance)) {
        storeBuilder.setTypeStore(TypeStore.PRIMITIVE);
        storeBuilder.setStrategy(PrimitiveStoreStrategy);
        storeBuilder.setStoreValue(storeInstance);
    } else {
        const meta = getMetadata(STORE_META_KEY, storeInstance as object);
        if (!meta) {
            throw new Error(`instance ${storeInstance as string} doesn't have StoreInstanceDecorator decorator`);
        }
        storeBuilder.setStrategy(BaseStoreStrategy);
        storeBuilder.setTypeStore(TypeStore.INSTANCE);
    }
    const injector = getGlobalInjector();
    if (!injector) {
        throw new Error(`Injector doesn't' exist`);
    }
    const storeData = injector.get(StoreDataService);
    storeData.addStore(storeBuilder.build());
}
