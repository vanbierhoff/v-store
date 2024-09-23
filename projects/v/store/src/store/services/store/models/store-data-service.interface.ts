import { StoreInstanceImplInterface } from "../../../store-items/store-instance/models/store-instance-impl.interface";



export interface StoreDataServiceInterface {
    addToStore(item: StoreInstanceImplInterface<any>): void;
    destroyStore(key: string | symbol): boolean;
    getStoreByKey<T = any>(key: string | symbol | object): StoreInstanceImplInterface<T> | null;
}
