import { StoreConstructor } from '../create-store';
import { getMetadata } from '../../../../../meta-helper/src/lib/meta-helpers/get-metadata/get-metadata';
import { STORE_META_KEY } from '../../const/meta-keys/store-instance/store-isnatnce';



export function storeInstanceFactory<T>(storeInstance: StoreConstructor<T>, args: any[], key: string | symbol) {
    const store = new storeInstance(...args);
    const storeFields = getMetadata(STORE_META_KEY, storeInstance);

}
