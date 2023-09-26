import { Injectable, InjectionToken } from '@angular/core';
import find from 'lodash/find';
import { StoreItemInterface } from '../../store-items/store-item/models/store-item.interface';
import remove from 'lodash/remove';


export const STORE_DATA_SERVICE_TOKEN =
    new InjectionToken<StoreDataService>('store:storeDataService');


// СДЕЛАТЬ ДОБАВЛЕНИЕ ЧЕРЕЗ МЕТОД, ПОИСК ПО КЛЮЧУ И ВНЕСЕНИЕ ИЗМЕНЕНИЕЙ ТУДА
// ДОБАВИТЬ REMOVE_META_DATA METHOD?

@Injectable({providedIn: 'root'})
export class StoreDataService {

    protected store: StoreItemInterface<any>[] = [];

    constructor() {
    }

    public addStore(item: StoreItemInterface<any>) {
        let storeItem = find(this.store, storeItem => storeItem.key === item.key);
        if (storeItem) {
            console.warn(`Item with ${item.key.toString()} exist`);
            storeItem = item;
            return;
        }
        this.store.push(item);
    }

    public selectStore<T = any>(storeKey: string | symbol): T {
        const store = this.getStoreByKey(storeKey);
        if (store) {
            return store.selectForStore<T>();
        }
        throw new Error(`Store with key ${storeKey.toString()} doesn't exist`);
    }

    /**
     *
     * @param storeKey - key for access to store
     * method returns a StoreItem. This is a "functional wrapper" for the data added to the storage.
     * Instance have methods for: validation, get any field, serialized for other operations on data
     */
    public selectStoreInstance<T = any>(storeKey: string | symbol): StoreItemInterface<T> {
        const store = this.getStoreByKey(storeKey);
        if (store) {
            return store;
        }
        throw new Error(`Store with key ${storeKey.toString()} doesn't exist`);
    }

    public mutateStore<T = any>(storeKey: string | symbol, fn: (oldValue: T) => T) {
        let store: StoreItemInterface<T> | null = this.getStoreByKey(storeKey);
        if (!store) {
            throw new Error(`Store with key ${storeKey.toString()} doesn't exist`);
        }
        const newStore = fn(store.selectForStore<T>());
        store.set(newStore);
    }

    public getStoreByKey<T = any>(key: string | symbol): StoreItemInterface<T> | null {
        const store = find(this.store, item => item.key === key);
        if (store) {
            return store as StoreItemInterface<T>;
        }
        return null;
    }

    public destroyStore(key: string | symbol): boolean {
        try {
            remove(this.store, storeItem => storeItem.key === key);
            return true;
        }
        catch (e) {
            console.log(e);
            const keyStore = typeof key === 'string' ? key : key.description;
            console.error(`Failed to delete store by key ${keyStore}. Make sure such a store exists`);
            return false;
        }

    }
}
