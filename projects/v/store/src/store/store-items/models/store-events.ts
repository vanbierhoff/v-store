import { ValidationError } from '../../services/store/models/validation/validator.interface';
import { StoreFieldInstance } from '../store-field/store-field-instance';



export const STORE_FIELD_INSTANCE_EVENTS = {
    validate: 'validate',
    changeValue: 'changeValue'
} as const;


export interface StoreFieldInstanceEventsInterface {
    [STORE_FIELD_INSTANCE_EVENTS.validate]: Promise<true | ValidationError[]>;
    [STORE_FIELD_INSTANCE_EVENTS.changeValue]: StoreFieldInstance;
}

