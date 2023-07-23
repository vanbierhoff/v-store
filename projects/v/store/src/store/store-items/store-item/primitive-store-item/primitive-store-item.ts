import { StoreFieldInstance } from '../../store-field/store-field-instance';
import { FieldManager } from '../../store-field/field-manager/field-manager';
import { StoreItemInterface } from '../models/store-item.interface';
import { ValidationError } from '../../../services/store/models/validation/validator.interface';


export const PRIMITIVE_KEY = 'prim';

export class PrimitiveStoreItem implements StoreItemInterface<any> {

    public key: string | symbol;
    /**
     * Manager all fields in the store
     */
    public fieldsManager: FieldManager;

    /**
     * Initial instance from which created in storeItem
     */
    public originalState: any;

    /**
     * Shows if all fields are valid. false if at least one field is invalid
     */
    private readonly isValidStore: boolean = false;

    constructor(fields: StoreFieldInstance[], key: string | symbol
    ) {
        this.fieldsManager = new FieldManager(fields);
        this.key = key;
    }

    public async validate(): Promise<true | Record<string | symbol, ValidationError[]>> {
        const field = this.fieldsManager.getAll()[0];
        const result = await field.validate();
        if (result !== true) {
            return {
                [field.propertyName]: result
            };
        }
        return true;
    }

    public get(field?: string) {
        return this.fieldsManager.get('primitive');
    }

    public getAll() {
        return this.fieldsManager.getAll();
    }


    public selectForStore() {
        return this.fieldsManager.get(PRIMITIVE_KEY)?.value;
    }

    /**
     * @param value: any
     *
     * Set data in state.
     */
    public set(value: any) {
        this.fieldsManager.set(PRIMITIVE_KEY, value);
    }

}
