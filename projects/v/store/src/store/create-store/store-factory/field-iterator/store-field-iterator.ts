import { StoreFieldMeta } from '../../../store-items/store-field/models/store-field-meta';
import { StoreFieldInstance } from '../../../store-items/store-field/store-field-instance';


export function* storeFieldIterator(targetArray: StoreFieldMeta[], storeInstance: any): any {
    for(let i = 0; targetArray.length > i; i++) {
        const fieldValue = storeInstance[targetArray[i].propertyName] || undefined;
        const field = new StoreFieldInstance({
                validators: targetArray[i].validators ?? undefined,
                policy: targetArray[i].policy ?? undefined,
                strictSet: targetArray[i].strictSet ?? false,
                propertyName: targetArray[i].propertyName
            }, fieldValue
        );
        yield field;
    }

    return {
        value: undefined,
        done: true
    };
}
