import { ValidatorInterface } from '../../../services/store/models/validation/validator.interface';
import { StoreFieldInstance } from '../../../store-items/store-field/store-field-instance';


export interface StoreFieldDecoratorInterface {
    /**
     * A set of validator functions for a specific field
     */
    validators?: ValidatorInterface[] | [];
    /**
     * Function for check access the store
     */
    policy?: () => Promise<boolean>;

    initHook?(field: StoreFieldInstance) : any;

}
