import { Inject, Injectable, InjectionToken, OnDestroy, signal, WritableSignal } from '@angular/core';
import { filter, Observable, of, Subject, Subscription, switchMap, tap } from 'rxjs';
import { STORE_DATA_SERVICE_TOKEN, StoreDataService } from '../store/store-data.service';
import find from 'lodash/find';
import concat from 'lodash/concat';
import { getGlobalInjector } from '../../injector/injector';


export const STORE_SUBSCRIBERS_TOKEN =
    new InjectionToken<StoreSubscribersService>('store:subscribers');

@Injectable()
export class StoreSubscribersService implements OnDestroy {

    constructor(
        @Inject(STORE_DATA_SERVICE_TOKEN) protected storeData: StoreDataService) {

        this.emitChange$ = new Subject<string | symbol | object>();
        this.anyChanges$ = this.emitChange$.pipe(
            switchMap((key: string | symbol | object) => {
                return of(this.getStore<any>(key));
            }));
        this.selectSignalSubscribe();
    }


    protected signalsList: Record<string | symbol, WritableSignal<any>> = {};


    public readonly emitChange$: Subject<string | symbol | object>;
    protected selectSignalEmit$: Subscription;
    readonly anyChanges$;

    /**
     * @param key key for access to store
     * emit new store data after emit change event
     * @return observable : Observable<T>
     */
    public listenChange<T>(key: string | symbol | object): Observable<T> {
        return this.emitChange$.pipe(
            filter(emittedKey => emittedKey === key),
            switchMap((key: string | symbol | object) => {
                return of(this.getStore<T>(key));
            }));
    }

    /**
     * @param key key for access to store
     *  select store and return store value as Signal
     * @return observable : WritableSignal<T>
     */
    public selectSignal<T>(key: string | symbol | object): WritableSignal<T> {
        const storeItem = this.getStore(key);
        if (!storeItem) {
            console.warn(`item with key  ${key.toString()}  doesn't exist`);
        }
        const signalItem = signal(storeItem);
        this.signalsList[key.toString()] = signalItem;
        return signalItem;
    }

    protected selectSignalSubscribe() {
        this.selectSignalEmit$ = this.emitChange$.pipe(tap((key) => {
            const origInstanceKeys = concat<string | symbol>(
                Object.keys(this.signalsList),
                Object.getOwnPropertySymbols(this.signalsList));
            const signalKey = find(origInstanceKeys, keyItem => keyItem === key);
            if (signalKey) {
                this.signalsList[signalKey].set(this.getStore(key));
            }
        })).subscribe();
    }

    protected getStore<T>(storeKey: string | symbol | object) {
        const store = this.storeData.getStoreByKey(storeKey);
        if (store) {
            return store.selectForStore();
        }
        return null;
    }

    ngOnDestroy() {
        this.selectSignalEmit$.unsubscribe();
    }

}




