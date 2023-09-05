import { StoreDataService } from '../store/store-data.service';
import { StoreSubscribersService } from '../store-subscribers/store-subscribers.service';
import { StoreItemInterface } from '../../store-items/store-item/models/store-item.interface';
import { Injectable } from '@angular/core';



@Injectable({providedIn: 'root'})
export class StoreService {

    public readonly anyChanges$ = this.storeSubscribers.anyChanges$;

    constructor(
        protected storeData: StoreDataService,
        protected storeSubscribers: StoreSubscribersService
    ) {
    }

    public selectStore<T = any>(storeKey: string | symbol): T {
        return this.storeData.selectStore(storeKey);
    }

    public selectStoreInstance<T = any>(storeKey: string | symbol): StoreItemInterface<T> {
        return this.storeData.selectStoreInstance(storeKey);
    }

    public mutateStore<T = any>(storeKey: string | symbol, fn: (oldValue: T) => T) {
        this.storeData.mutateStore(storeKey, fn);
        this.storeSubscribers.emitChange$.next(storeKey);
    }

    public selectSignal(key: string | symbol) {
        return this.storeSubscribers.selectSignal(key);
    }

    public listenChange<T>(key: string | symbol) {
        return this.storeSubscribers.listenChange(key);
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
