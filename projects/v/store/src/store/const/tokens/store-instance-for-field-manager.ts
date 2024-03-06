import { InjectionToken } from '@angular/core';
import { StoreFieldInstance } from '../../store-items/store-field/store-field-instance';


export type StoreInstanceType<T extends StoreFieldInstance> = T;

export const STORE_INSTANCE_FOR_FIELD_MANAGER = new InjectionToken<StoreInstanceType<any>>('StoreInstance:instance');
