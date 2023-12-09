import { StoreItemInterface } from '../store-items/store-item/models/store-item.interface';
import { StoreFieldInstance } from '../store-items/store-field/store-field-instance';


export type StoreFieldInstanceType<T extends StoreFieldInstance> = T;

export interface StoreModuleInterface {
    storeItem: StoreItemInterface<any>;
    fieldManager: any;
    storeFieldInstance: StoreFieldInstanceType<any>;
}
