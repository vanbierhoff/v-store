import { StoreFieldDecoratorInterface } from '../../../decorators/store-field/models/store.field-decorator.interface';
import { BaseTypes } from '../../../models/base-types';


export interface StoreFieldMeta<V = any> extends StoreFieldDecoratorInterface<V> {
    type?: BaseTypes | any;
    propertyName: string | symbol;
}
