import { getGlobalInjector, VInjectionProvider } from '../../injector/injector';
import { STORE_DATA_SERVICE_TOKEN } from '../store/store-data.service';
import { StoreInstanceImplInterface } from '../../store-items/store-instance/models/store-instance-impl.interface';



export const mutateStore = <T = any>(storeKey: string | symbol | object,
                                     fn: (oldValue: T) => T, vInjector?: VInjectionProvider) => {
    const injector =
        vInjector ? vInjector : getGlobalInjector();
    if (!injector) {
        throw new Error('No injector found!');
    }
    const storeData = injector.get(STORE_DATA_SERVICE_TOKEN);

    let store: StoreInstanceImplInterface<T> | null = storeData.getStoreByKey(storeKey);
    if (!store) {
        throw new Error(`Store with key ${storeKey.toString()} doesn't exist`);
    }
    const newStore = fn(store.selectForStore<T>());
    store.set(newStore);
};
