import { FormFieldConfigInterface } from './models/form-field-config.interface';



export class FormFieldInstance extends StoreFieldInstance {

    constructor(meta: FormFieldConfigInterface, value: any) {
        super(meta, value);
    }

}
