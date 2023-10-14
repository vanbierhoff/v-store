import { StoreItemInterface } from '../store-items/store-item/models/store-item.interface';
import { FieldManager } from '@v/short-store';


export interface StoreModuleInterface {
    storeItem: StoreItemInterface<any>;
    fieldManager: any;
}
