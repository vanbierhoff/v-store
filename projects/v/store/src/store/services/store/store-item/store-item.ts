import { ValidatorInterface } from '../models/validation/validator.interface';
import { StoreItemInterface } from '../models/item/store-item.interface';



export class StoreItem implements StoreItemInterface {
    constructor(value: any,
                protected options: any,
                protected validators: ValidatorInterface[],
                protected metadata: any) {
        this.#value = value;
        this.validate();
    }

    #valid: boolean = true;
    #value: any;

    get isValid(): boolean {
        return this.#valid;
    }

    get value() {
        return this.#value;
    }

    set value(value: any) {
        this.#value = value;
        this.validate();
    }

    async validate(): Promise<boolean> {
        return true;
    }

}
