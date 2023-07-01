import { Injectable } from '@angular/core';
import { BaseDecoratedStoreItem } from '../../store-items/store-item/base-decorated-store-item';
import { getMetadata } from '../../../../../meta-helper/src/lib/meta-helpers/get-metadata/get-metadata';
import { STORE_ITEM_KEY } from '../../const/meta-keys/store-item/store-item-key';
import find from 'lodash/find';


@Injectable()
export class StoreService {

    protected store: BaseDecoratedStoreItem[];

    constructor() {
        this.store = getMetadata(STORE_ITEM_KEY, StoreService) as BaseDecoratedStoreItem[];
    }

    selectStore(storeKey: string | symbol) {
        console.log(storeKey);
        console.log(getMetadata<BaseDecoratedStoreItem>(STORE_ITEM_KEY, StoreService));
        const store: BaseDecoratedStoreItem = find(getMetadata<BaseDecoratedStoreItem>(STORE_ITEM_KEY, StoreService),
            item => item.key === storeKey);
        if (store) {
            return store.selectForStore();
        }
    }
}
