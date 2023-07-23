import { StoreDataService } from '../store/store-data.service';
import { StoreSubscribersService } from '../store-subscribers/store-subscribers.service';
import { StoreItemInterface } from '../../store-items/store-item/models/store-item.interface';
import { Injectable } from '@angular/core';


@Injectable()
export class StoreService {

    public anyChanges$ = this.storeSubscribers.anyChanges$;

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

    public listenChange<T>(key: string | symbol) {
        return this.storeSubscribers.listenChange(key);
    }

}
