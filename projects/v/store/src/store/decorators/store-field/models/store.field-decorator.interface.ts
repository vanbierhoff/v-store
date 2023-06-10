import { ValidatorInterface } from '../../../services/store/models/validation/validator.interface';


export interface StoreFieldDecoratorInterface {
    /**
     * A set of validator functions for a specific field
     */
    validators?: ValidatorInterface[];
    /**
     * Function for check access the store
     */
    policy?: () => Promise<boolean>;
    /**
     * In strict mode, a check will be performed before setting the value.
     * In this mode, it is possible to set only a valid value in the store
     */
    strictSet?: boolean;
}
