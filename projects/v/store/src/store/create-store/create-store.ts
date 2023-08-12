
import { STORE_ITEM_KEY } from '../const/meta-keys/store-item/store-item-key';

import { StoreInstanceBuilder } from '../../store-builder/store-instance-builder';
import { TypeStore } from '../../store-builder/models/build-config/build-configuration';
import { STORE_META_KEY } from '../const/meta-keys/store-instance/store-isnatnce';
import { getMetadata } from '@v/meta-helper';
import { addMetaField } from '@v/meta-helper';
import { StoreDataService } from '../services';
import { PrimitiveType } from '@v/r-types';
import { isPrimitive } from '@v/r-types';


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
        storeBuilder.setStoreValue(storeInstance)
    } else {
        storeBuilder.setTypeStore(
            getMetadata(STORE_META_KEY, storeInstance as object) ? TypeStore.DECORATED : TypeStore.COMBINE);
    }
    addMetaField(StoreDataService, STORE_ITEM_KEY, storeBuilder.build());
}
