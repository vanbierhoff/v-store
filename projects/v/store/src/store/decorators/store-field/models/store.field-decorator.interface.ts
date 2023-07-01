import { ValidatorInterface } from '../../../services/store/models/validation/validator.interface';


export interface StoreFieldDecoratorInterface {
    /**
     * A set of validator functions for a specific field
     */
    validators?: ValidatorInterface[] | [];
    /**
     * Function for check access the store
     */
    policy?: () => Promise<boolean>;

}
