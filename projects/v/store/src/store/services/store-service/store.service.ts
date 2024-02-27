import { STORE_DATA_SERVICE_TOKEN, StoreDataService } from '../store/store-data.service';
import { StoreSubscribersService } from '../store-subscribers/store-subscribers.service';
import { StoreItemInterface } from '../../store-items/store-item/models/store-item.interface';
import { Inject, Injectable } from '@angular/core';



@Injectable()
export class StoreService {

    public readonly anyChanges$ = this.storeSubscribers.anyChanges$;

    constructor(
         @Inject(STORE_DATA_SERVICE_TOKEN) protected storeData: StoreDataService,
        protected storeSubscribers: StoreSubscribersService
    ) {
    }

    public selectStore<T = any>(storeKey: string | symbol | object): T {
        const store = this.storeData.getStoreByKey(storeKey);
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
        const store = this.storeData.getStoreByKey(storeKey);
        if (store) {
            return store;
        }
        throw new Error(`Store with key ${storeKey.toString()} doesn't exist`);
    }

    public mutateStore<T = any>(storeKey: string | symbol | object, fn: (oldValue: T) => T) {
        let store: StoreItemInterface<T> | null = this.storeData.getStoreByKey(storeKey);
        if (!store) {
            throw new Error(`Store with key ${storeKey.toString()} doesn't exist`);
        }
        const newStore = fn(store.selectForStore<T>());
        store.set(newStore);
    }

    public selectSignal(key: string | symbol) {
        return this.storeSubscribers.selectSignal(key);
    }

    public listenChange<T>(key: string | symbol) {
        return this.storeSubscribers.listenChange<T>(key);
    }

    /**
     * @param key
     * Validate store data
     */
    public validate(key: string | symbol) {
        const store = this.storeData.getStoreByKey(key);
        if (!store) {
            throw new Error(`Store with key ${key.toString()} doesn't exist`);
        }
        return store.validate();
    }

}
