import { InjectionToken } from '@angular/core';
import { StoreItemInstance, StoreItemInterface } from '../../store-items/store-item/models/store-item.interface';


export const CUSTOM_STORE_ITEM_TOKEN = new InjectionToken<StoreItemInstance<any>>('StoreItem:custom');
