import { ValidationError } from "../../../services/store/models/validation/validator.interface";
import { StoreInstanceImplInterface } from "./store-instance-impl.interface";




export const STORE_ITEM_EVENTS = {
    validateStoreInstance: 'validateStoreInstance',
    changeStoreInstance: 'changeStoreInstance'
} as const;


export interface StoreItemEventsInterface<T> {
    [STORE_ITEM_EVENTS.changeStoreInstance]: StoreInstanceImplInterface<T>;
    [STORE_ITEM_EVENTS.validateStoreInstance]: Promise<true | Record<string | symbol, ValidationError[]>>;
}
