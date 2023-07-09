import { Injectable } from '@angular/core';
import { BaseDecoratedStoreItem } from '../../store-items/store-item/base-decorated-store-item';
import { getMetadata } from '../../../../../meta-helper/src/lib/meta-helpers/get-metadata/get-metadata';
import { STORE_ITEM_KEY } from '../../const/meta-keys/store-item/store-item-key';
import find from 'lodash/find';
import { addMetaField } from '../../../../../meta-helper/src/lib/meta-helpers/add-meta/add-meta-field';


@Injectable()
export class StoreService {

    protected store: BaseDecoratedStoreItem[];

    constructor() {
        this.store = getMetadata(STORE_ITEM_KEY, StoreService) as BaseDecoratedStoreItem[];
    }

    selectStore(storeKey: string | symbol) {
        const store = find(getMetadata<BaseDecoratedStoreItem>(STORE_ITEM_KEY, StoreService),
            item => item.key === storeKey);
        if (store) {
            return store.selectForStore();
        }
    }

    mutateStore<T = any>(storeKey: string | symbol, fn: (oldValue: T) => T) {
        const store: any = find(getMetadata<BaseDecoratedStoreItem>(STORE_ITEM_KEY, StoreService));
        const newStore = fn(store.selectForStore());
        console.log(store.set(newStore));
        addMetaField(StoreService, STORE_ITEM_KEY, newStore);
    }
}
