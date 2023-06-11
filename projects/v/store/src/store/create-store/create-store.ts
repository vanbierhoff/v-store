import { storeInstanceFactory } from './store-factory/store-instance-factory';
import { getMetadata } from '../../../../meta-helper/src/lib/meta-helpers/get-metadata/get-metadata';
import { STORE_META_KEY } from '../const/meta-keys/store-instance/store-isnatnce';
import { STORE_FIELD } from '../const/meta-keys/store-field/store-field';
import { storeFieldIterator } from './store-factory/field-iterator/store-field-iterator';


export type StoreConstructor<T> = new(...args: any[]) => T;

/**
 * Simplified basic version of [[createStore]] for sync operations.
 */
export function createStore<T = any>(storeInstance: StoreConstructor<T>, key: string | symbol, ...args: any[]): void {
    const store = new storeInstance(...args);
    const storeInstanceReflect = getMetadata(STORE_META_KEY, storeInstance);
    const storeReflectFields = {
        fields: getMetadata(STORE_FIELD, storeInstance),
        * [Symbol.iterator]() {
            yield* storeFieldIterator(storeReflectFields.fields, store);
        }
    };

    const data = [...storeReflectFields];
    console.log(data);
}
