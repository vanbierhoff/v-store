import { getMetadata } from '../../../../meta-helper/src/lib/meta-helpers/get-metadata/get-metadata';
import { STORE_META_KEY } from '../const/meta-keys/store-instance/store-isnatnce';
import { STORE_FIELD } from '../const/meta-keys/store-field/store-field';
import { storeFieldIterator } from './store-factory/field-iterator/store-field-iterator';
import { BaseDecoratedStoreItem } from '../store-items/store-item/base-decorated-store-item';
import { addMetaField } from '../../../../meta-helper/src/lib/meta-helpers/add-meta/add-meta-field';
import { StoreService } from '../services/store/store.service';
import { STORE_ITEM_KEY } from '../const/meta-keys/store-item/store-item-key';
import { isPrimitive, PrimitiveType } from '../../../../r-types/src/public-api';


export type StoreConstructor<T> = new(...args: any[]) => T;

/**
 *  Created store from decorated instance for created of [[createStore]] for sync operations.
 */

export function createStore<T = any>(storeInstance: StoreConstructor<T> | PrimitiveType,
                                     key: string | symbol, args?: any[]): void {
    let store: any;
    let storeInstanceReflect;
    if (!isPrimitive(storeInstance)) {
        storeInstanceReflect = getMetadata(STORE_META_KEY, storeInstance as object);
    }

    if (!isPrimitive(storeInstance) && args) {

    }


    const storeReflectFields = {
        fields: getMetadata(STORE_FIELD, storeInstance as any),
        * [Symbol.iterator]() {
            yield* storeFieldIterator(storeReflectFields.fields, store);
        }
    };
    const data = [...storeReflectFields];
    const createdStore = new BaseDecoratedStoreItem(data, store, key);

    addMetaField(StoreService, STORE_ITEM_KEY, createdStore);

}
