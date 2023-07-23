import { Injectable } from '@angular/core';
import { filter, Observable, of, Subject, switchMap } from 'rxjs';
import { getMetadata } from '../../../../../meta-helper/src/lib/meta-helpers/get-metadata/get-metadata';
import { STORE_ITEM_KEY } from '../../const/meta-keys/store-item/store-item-key';
import { StoreItemInterface } from '../../store-items/store-item/models/store-item.interface';
import { StoreDataService } from '../store/store-data.service';
import find from 'lodash/find';


@Injectable()
export class StoreSubscribersService {


    public readonly emitChange$ = new Subject<string | symbol>();
    readonly anyChanges$ = this.emitChange$.pipe(
        switchMap((key: string | symbol) => {
            return of(this.getStore<any>(key));
        }));

    constructor() {
    }

    public listenChange<T>(key: string | symbol) {
        return this.emitChange$.pipe(
            filter(emittedKey => emittedKey === key),
            switchMap((key: string | symbol) => {
                return of(this.getStore<T>(key));
            }));
    }

    protected getStore<T>(storeKey: string | symbol) {
        const store = find(getMetadata<StoreItemInterface<T>[]>(STORE_ITEM_KEY, StoreDataService),
            item => item.key === storeKey);
        if (store) {
            return store.selectForStore();
        }
    }


}
