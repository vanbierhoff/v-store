import { StoreInstanceImplInterface } from '../store-items/store-instance/models/store-instance-impl.interface';
import { StoreFieldInstance } from '../store-items/store-field/store-field-instance';
import { StoreConstructor } from '../create-store/create-store';
import { StoreDataServiceInterface } from '../services/store/models/store-data-service.interface';


export type StoreFieldInstanceType<T extends StoreFieldInstance> = T;

export interface StoreModuleInterface {
    storeItem?: StoreInstanceImplInterface<any>;
    fieldManager?: any;
    storeFieldInstance?: StoreConstructor<StoreFieldInstanceType<any>>;
    storeData: StoreDataServiceInterface;
}
