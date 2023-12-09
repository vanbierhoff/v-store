import { StoreItemInterface } from '../store-items/store-item/models/store-item.interface';
import { StoreFieldInstance } from '../store-items/store-field/store-field-instance';
import { StoreConstructor } from '../create-store/create-store';


export type StoreFieldInstanceType<T extends StoreFieldInstance> = T;

export interface StoreModuleInterface {
    storeItem?: StoreItemInterface<any>;
    fieldManager?: any;
    storeFieldInstance?: StoreConstructor<StoreFieldInstanceType<any>>;
}
