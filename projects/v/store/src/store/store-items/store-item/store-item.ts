import { StoreFieldInstance } from '../store-field/store-field-instance';
import { ValidationError } from '../../services/store/models/validation/validator.interface';


export class StoreItem {

    /**
     * List all fields this store item
     */
    fields: StoreFieldInstance[];


    /**
     * Shows if all fields are valid. false if at least one field is invalid
     */
    isValidStore: boolean = false;


    async validate(): Promise<true | ValidationError[]> {
        return true;
    }
}
