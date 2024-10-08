import {
    ChangeDetectionStrategy,
    Component, Inject, Injector,
    OnInit,
    Signal,
    signal, WritableSignal
} from '@angular/core';
import { ExtraValue, TestStore } from '../models/test-store';
import {
    createStore,
    setGlobalInjector, STORE_DATA_SERVICE_TOKEN, StoreDataService,
    StoreModule, storeService
} from '@v/short-store';
import { JsonPipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { mutateStore } from '../../../../../projects/v/store/src/store/services/mutate-store/mutate-store';

const symbolStoreKey = Symbol('storeKey');

@Component({
    selector: 'app-test-store',
    standalone: true,
    templateUrl: './test-store.component.html',
    styleUrls: ['./test-store.component.scss'],
    providers: [],
    imports: [
        JsonPipe,
        StoreModule
    ],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class TestStoreComponent implements OnInit {

    public firstName = signal('Jane');
    public storeSignal: WritableSignal<any>;
    public storeItem: TestStore;
    public symbolStore: TestStore;
    public storeCustom: any;
    public name: Signal<string> = signal('test');
    public store: any;

    constructor( protected injector: Injector, protected http: HttpClient,
                @Inject(STORE_DATA_SERVICE_TOKEN) protected storeData: StoreDataService) {
        setGlobalInjector(injector);
        this.store = storeService();
    }



    ngOnInit() {
        const defStore = createStore(TestStore, 'store');
        console.log('extra value:', defStore.get('data').extra.get(ExtraValue));
        const newStore = new TestStore(this.http);
        const newStore2 = new TestStore(this.http);
        console.log(newStore);
        newStore.data2 = 'data2NewStoreTest';
        newStore2.data2 = 'DATA_NEWSTORE_2!!!!!!!!!!';
        const storeAsFirstObject = createStore(newStore);
        const storeAsTowObject = createStore(newStore2);


        console.log('getByInstance2', this.store.getStore(newStore2));
        console.log('getByKey', this.store.getStore('store'));

        console.log('store fn Service Call', storeService(this.injector).getStore(newStore));


        mutateStore(newStore2, (oldValue) => {
            return {
                ...oldValue,
                data2: 'MUTATE_NEW_STORE2'
            };
        });

        console.log('getByInstance after mutate', this.store.getStore(newStore));
        console.log('getByInstance2 after mutate', this.store.getStore(newStore2));


        createStore('TestStore', 'store1');
        setTimeout(() => {
            this.firstName.set('Den');
        }, 1000);



        // this.name = computed(() => this.firstName() + ' Family');
        //
        // this.storeItem = this.store.selectStore('store');
        // this.storeCustom = this.store.selectStore('customStore');
        // this.symbolStore = this.store.selectStore(symbolStoreKey);
        // // console.log('customStore', this.storeCustom);
        // console.log('SYMBOL STORE', this.symbolStore);
        //
        // this.storeSignal = this.store.selectSignal('store');
        //
        //
        // console.log(this.storeSignal());
        //
        // this.storeItem.data = 105;
        // this.storeItem.method();
        //
        //
        //
        // // const store1 = this.store.selectStore('store1');
        // const storeInstance = this.store.selectStoreInstance('store');
        // const filed = storeInstance.get('data');
        // const filed2 = storeInstance.get('data2');
        // storeInstance.validate().then(res => console.log('storeInstance', res));
        //
        // this.store.listenChange<TestStore>('store').subscribe(
        //     (data: TestStore) => {
        //         this.storeItem = data;
        //     });
        //
        // this.store.anyChanges$.subscribe(data => {
        //     console.log('anyChanges$', data);
        // });
        //
        // setTimeout(() => {
        //     this.store.mutateStore('store', value => {
        //         value.data = 99;
        //         value.dataNotDec = 'update';
        //         return value;
        //     });
        //
        //     this.store.mutateStore(symbolStoreKey, value => {
        //         value.dataNotDec = 'SYMBOLS STORE';
        //         return value;
        //     });
        // }, 2500);
        //
        //
        //
        // storeInstance.validate().then(res => console.log(res));
        // setTimeout(() => {
        //     const data = this.store.selectStore('store');
        // const symStore = this.store.selectStore(symbolStoreKey);
        const dataSignal = this.store.selectSignal('store');
        // console.log(data);
        console.log(dataSignal);
        // console.log('SYMBOL UPDATED', symStore);
        // console.log(data.store.selectStore('store'));
        // }, 4000);

    }

}
