import { ValidatorInterface } from '../../../services';
import { StoreFieldInstance } from '../../../store-items/store-field/store-field-instance';


export interface StoreFieldDecoratorInterface<V = any, F = StoreFieldInstance> {
    /**
     * A set of validator functions for a specific field
     */
    validators?: ValidatorInterface<V>[] | [];
    /**
     * Function for check access the store
     */
    policy?: () => Promise<boolean>;

    initHook?(field: F): any;

}
