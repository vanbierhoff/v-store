import { StoreFieldDecoratorInterface } from './models/store.field-decorator.interface';
import { STORE_FIELD } from '../../const/meta-keys/store-field/store-field';
import { StoreFieldMeta } from '../../store-items/store-field/models/store-field-meta';
import { addMetaField } from '@v/meta-helper';
import { getBaseValidator } from '../../validators/get-base-validator';
import { ValidatorInterface } from '../../services';


export function StoreField<T = any>(options?: StoreFieldDecoratorInterface): PropertyDecorator;
export function StoreField<T = any>(target: any, key: string): any;
export function StoreField(optionsOrTarget: any = {}, key?: string) {
    const decorator = function (
        target: any,
        propertyName: string
    ): any {
        const t = (Reflect as any).getMetadata('design:type', target, propertyName);
        const baseValidator: false | ValidatorInterface = getBaseValidator(t);
        const options = key ? {} : optionsOrTarget;
        if (baseValidator) {
            if (options.validators) {
                options.validators = [...options.validators, baseValidator];
            } else {
                options.validators = [baseValidator];
            }
        }

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
