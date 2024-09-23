import { InjectionToken } from '@angular/core';
import { StoreItemInstance, StoreInstanceImplInterface } from '../../store-items/store-instance/models/store-instance-impl.interface';


export const CUSTOM_STORE_ITEM_TOKEN = new InjectionToken<StoreItemInstance<any>>('StoreItem:custom');
