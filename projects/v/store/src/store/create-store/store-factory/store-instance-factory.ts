import { StoreConstructor } from '../create-store';
import { getMetadata } from '../../../../../meta-helper/src/lib/meta-helpers/get-metadata/get-metadata';
import { STORE_META_KEY } from '../../const/meta-keys/store-instance/store-isnatnce';
import { STORE_FIELD } from '../../const/meta-keys/store-field/store-field';
import { storeFieldIterator } from './field-iterator/store-field-iterator';



export function storeInstanceFactory<T>(storeInstance: StoreConstructor<T>, args: any[], key: string | symbol) {


}

