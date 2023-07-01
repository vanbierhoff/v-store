import { BaseDecoratedStoreItem } from '../base-decorated-store-item';

import { isPrimitive } from '../../../../../../r-types/src/helpers/is-primitive/is-primitive';
import concat from 'lodash/concat';
import { StoreFieldInstance } from '../../store-field/store-field-instance';
import { FieldManager } from '../../store-field/field-manager/field-manager';
import { some } from 'lodash';
import forEach from 'lodash/forEach';
import { StoreItemInterface } from '../models/store-item.interface';


export const PRIMITIVE_KEY = 'prim';

export class PrimitiveStoreItem implements StoreItemInterface<any>{

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


    public get(field: string) {
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
