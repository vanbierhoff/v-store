import { StoreItemInterface, ValidationError } from '@v/short-store';


export const STORE_ITEM_EVENTS = {
    validateStoreItem: 'validateStoreItem',
    changeStoreItem: 'changeStoreItem'
} as const;


export interface StoreItemEventsInterface<T> {
    [STORE_ITEM_EVENTS.changeStoreItem]: StoreItemInterface<T>;
    [STORE_ITEM_EVENTS.validateStoreItem]: Promise<true | Record<string | symbol, ValidationError[]>>;
}
