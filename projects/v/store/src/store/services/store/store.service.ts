import { Injectable } from '@angular/core';
import { getMetadata } from '../../../../../meta-helper/src/lib/meta-helpers/get-metadata/get-metadata';
import { STORE_ITEM_KEY } from '../../const/meta-keys/store-item/store-item-key';
import find from 'lodash/find';
import { addMetaField } from '../../../../../meta-helper/src/lib/meta-helpers/add-meta/add-meta-field';
import { StoreItemInterface } from '../../store-items/store-item/models/store-item.interface';


@Injectable()
export class StoreService {

    protected store: StoreItemInterface<any>[];

    constructor() {
        this.store = getMetadata(STORE_ITEM_KEY, StoreService) as StoreItemInterface<any>[];
    }

    selectStore<T = any>(storeKey: string | symbol): T {
        const store = find(getMetadata<StoreItemInterface<T>[]>(STORE_ITEM_KEY, StoreService),
            item => item.key === storeKey);
        if (store) {
            return store.selectForStore<T>();
        }
        throw new Error(`Store with key ${storeKey.toString()} doesn't exist`);
    }

    selectStoreInstance<T = any>(storeKey: string | symbol): StoreItemInterface<T> {
        const store = find(getMetadata<StoreItemInterface<T>[]>(STORE_ITEM_KEY, StoreService),
            item => item.key === storeKey);
        if (store) {
            return store;
        }
        throw new Error(`Store with key ${storeKey.toString()} doesn't exist`);
    }

    mutateStore<T = any>(storeKey: string | symbol, fn: (oldValue: T) => T) {
        const store = find(getMetadata<StoreItemInterface<T>[]>(STORE_ITEM_KEY, StoreService));
        if (!store) {
            throw new Error(`Store with key ${storeKey.toString()} doesn't exist`);
        }
        const newStore = fn(store.selectForStore<T>());
        store.set(newStore);
        addMetaField(StoreService, STORE_ITEM_KEY, newStore);
    }
}
