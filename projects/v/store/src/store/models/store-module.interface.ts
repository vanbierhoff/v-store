import { StoreItemInterface } from '../store-items/store-item/models/store-item.interface';


export interface StoreModuleInterface {
    storeItem: StoreItemInterface<any>;
    fieldManager: any;
}
