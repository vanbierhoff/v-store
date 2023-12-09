import { StoreItemInterface } from '../store-items/store-item/models/store-item.interface';
import { StoreFieldInstance } from '../store-items/store-field/store-field-instance';


export interface StoreModuleInterface {
    storeItem: StoreItemInterface<any>;
    fieldManager: any;
    storeFieldInstance: StoreFieldInstance;
}
