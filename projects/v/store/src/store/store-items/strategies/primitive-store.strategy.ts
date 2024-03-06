import { FieldManager } from '../store-field/field-manager/field-manager';
import { ValidationError } from '../../services';
import { StoreStrategy } from '../store-item/models/store-strategy';
import { StoreFieldInstance } from '../store-field/store-field-instance';
import { StoreFieldInstanceInterface } from '../store-field/models/store-field-instance.interface';




export const PRIMITIVE_KEY = 'prim';

export class PrimitiveStoreStrategy<T> implements StoreStrategy<T> {

    public fieldsManager: FieldManager;

    /**
     * Initial instance from which created in storeItem
     */
    public originalState: any;

    /**
     * Shows if all fields are valid. false if at least one field is invalid
     */
    protected isValidStore: boolean = false;

    constructor(fields: FieldManager, _args: any[]) {
        this.fieldsManager = fields;
    }

    get isValid(): boolean {
        return this.isValidStore;
    }

    public async validate(): Promise<true | Record<string | symbol, ValidationError[]>> {
        const field = this.fieldsManager.get(PRIMITIVE_KEY);
        if (!field) {
            throw new Error(`Field doesn't exist`);
        }
        const result = await field.validate();
        if (result !== true) {
            return {
                [field.propertyName]: result
            };
        }
        return true;
    }

    public get(field?: string) {
        return this.fieldsManager.get(PRIMITIVE_KEY);
    }

    public getAll() {
        return this.fieldsManager.getAll();
    }


    public selectForStore() {
        return this.fieldsManager.get(PRIMITIVE_KEY)?.value;
    }

    /**
     * @param value - any
     *
     * Set data in state.
     */
    public set(value: any) {
        this.fieldsManager.set(PRIMITIVE_KEY, value);
    }

}
