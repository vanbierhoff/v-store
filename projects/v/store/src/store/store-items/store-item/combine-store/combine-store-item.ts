
import { StoreFieldInstance } from '../../store-field/store-field-instance';

export class CombineStoreItem<T>{

    public  key: string | symbol;

    constructor(fields: StoreFieldInstance[], protected buildInstance: any, key: string | symbol,
                protected args?: any[]
    ) {
        // this.fieldsManager = new FieldManager(fields);
        this.key = key;
    }


}
