import { Injectable, InjectionToken } from '@angular/core';
import { getMetadata } from '@v/meta-helper';
import { STORE_ITEM_KEY } from '../../const/meta-keys/store-item/store-item-key';
import find from 'lodash/find';
import { addMetaField } from '@v/meta-helper';
import { StoreItemInterface } from '../../store-items/store-item/models/store-item.interface';

export const STORE_DATA_SERVICE_TOKEN =
    new InjectionToken<StoreDataService>('store:storeDataService')

@Injectable()
export class StoreDataService {

    protected store: StoreItemInterface<any>[];

    constructor() {
        this.store = getMetadata(STORE_ITEM_KEY, StoreDataService) as StoreItemInterface<any>[];
    }

   public selectStore<T = any>(storeKey: string | symbol): T {
        const store = find(getMetadata<StoreItemInterface<T>[]>(STORE_ITEM_KEY, StoreDataService),
            item => item.key === storeKey);
        if (store) {
            return store.selectForStore<T>();
        }
        throw new Error(`Store with key ${storeKey.toString()} doesn't exist`);
    }

   public selectStoreInstance<T = any>(storeKey: string | symbol): StoreItemInterface<T> {
        const store = find(getMetadata<StoreItemInterface<T>[]>(STORE_ITEM_KEY, StoreDataService),
            item => item.key === storeKey);
        if (store) {
            return store;
        }
        throw new Error(`Store with key ${storeKey.toString()} doesn't exist`);
    }

   public mutateStore<T = any>(storeKey: string | symbol, fn: (oldValue: T) => T) {
        const store = find(getMetadata<StoreItemInterface<T>[]>(STORE_ITEM_KEY, StoreDataService));
        if (!store) {
            throw new Error(`Store with key ${storeKey.toString()} doesn't exist`);
        }
        const newStore = fn(store.selectForStore<T>());
        store.set(newStore);
        addMetaField(StoreDataService, STORE_ITEM_KEY, newStore);
    }
}
