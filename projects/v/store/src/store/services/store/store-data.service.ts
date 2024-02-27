import { Injectable, InjectionToken } from '@angular/core';
import find from 'lodash/find';
import { StoreItemInterface } from '../../store-items/store-item/models/store-item.interface';
import remove from 'lodash/remove';
import { StoreDataServiceInterface } from './models/store-data-service.interface';


export const STORE_DATA_SERVICE_TOKEN =
    new InjectionToken<StoreDataServiceInterface>('store:storeDataService');


@Injectable({providedIn: 'root'})
export class StoreDataService implements StoreDataServiceInterface {

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

    public getStoreByKey<T = any>(key: string | symbol | object): StoreItemInterface<T> | null {
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
