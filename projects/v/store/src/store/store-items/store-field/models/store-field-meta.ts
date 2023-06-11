import { StoreFieldDecoratorInterface } from '../../../decorators/store-field/models/store.field-decorator.interface';


export interface StoreFieldMeta extends StoreFieldDecoratorInterface{
    type?: any;
    propertyName: string;
}
