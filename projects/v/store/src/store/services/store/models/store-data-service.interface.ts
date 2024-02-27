import { StoreItemInterface } from '@v/short-store';


export interface StoreDataServiceInterface {
    addStore(item: StoreItemInterface<any>): void;
    destroyStore(key: string | symbol): boolean;
    getStoreByKey<T = any>(key: string | symbol | object): StoreItemInterface<T> | null;
}
