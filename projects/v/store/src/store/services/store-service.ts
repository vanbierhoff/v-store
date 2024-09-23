import { Observable } from 'rxjs';
import { getGlobalInjector, VInjectionProvider } from '../injector/injector';
import { STORE_DATA_SERVICE_TOKEN, StoreDataService } from './store/store-data.service';
import { STORE_SUBSCRIBERS_TOKEN, StoreSubscribersService } from './store-subscribers/store-subscribers.service';
import { StoreInstanceImplInterface } from '../store-items/store-instance/models/store-instance-impl.interface';
import { ValidationError } from './store/models';


export const storeService = <T>(injectorItem?: VInjectionProvider) => {
    const injector =
        injectorItem ? injectorItem : getGlobalInjector();
    if (!injector) {
        throw new Error('No injector found!');
    }
    const storeData: StoreDataService = injector.get(STORE_DATA_SERVICE_TOKEN);
    const storeSubscribers: StoreSubscribersService = injector.get(STORE_SUBSCRIBERS_TOKEN);

    return {
        getStore: (storeKey: string | symbol | object): T => {
            const store = storeData.getStoreByKey(storeKey);
            if (store) {
                return store.selectForStore<T>();
            }
            throw new Error(`Store with key ${storeKey.toString()} doesn't exist`);
        },

        selectStoreInstance: <T = any>(storeKey: string | symbol): StoreInstanceImplInterface<T> => {
            const store = storeData.getStoreByKey(storeKey);
            if (store) {
                return store;
            }
            throw new Error(`Store with key ${storeKey.toString()} doesn't exist`);
        },
        listenChange: <T>(key: string | symbol): Observable<T> => {
            return storeSubscribers.listenChange<T>(key);
        },

        selectSignal: (key: string | symbol) => {
            return storeSubscribers.selectSignal(key);
        },

        validate: (key: string | symbol)
            : Promise<true | Record<string | symbol, ValidationError[]>> => {
            const store = storeData.getStoreByKey(key);
            if (!store) {
                throw new Error(`Store with key ${key.toString()} doesn't exist`);
            }
            return store.validate();
        }
    };
};

