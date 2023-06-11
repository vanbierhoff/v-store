import { StoreFieldDecoratorInterface } from './models/store.field-decorator.interface';
import { addMetaField } from '../../../../../meta-helper/src/lib/meta-helpers/add-meta/add-meta-field';
import { STORE_FIELD } from '../../const/meta-keys/store-field/store-field';
import { StoreFieldMeta } from '../../store-items/store-field/models/store-field-meta';



export function StoreField<T = any>(options?: StoreFieldDecoratorInterface): PropertyDecorator;
export function StoreField<T = any>(target: any, key: string): any;
export function StoreField(optionsOrTarget: any = {}, key?: string) {
    const decorator = function (
        target: any,
        propertyName: string
    ): any {
        const t = (Reflect as any).getMetadata('design:type', target, propertyName);
        const options = key ? {} : optionsOrTarget;
        const storeField: StoreFieldMeta = {
            propertyName,
            type: t,
            ...options
        };
        addMetaField(target, STORE_FIELD, storeField);
    };

    if (key) {
        return decorator(optionsOrTarget, key);
    }

    return decorator;

}
