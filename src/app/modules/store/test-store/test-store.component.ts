import {
    ChangeDetectionStrategy,
    Component,
    computed, Injector,
    OnInit,
    Signal,
    signal, WritableSignal
} from '@angular/core';
import { TestStore } from '../models/test-store';
import { createStore } from '../../../../../projects/v/store/src/store/create-store/create-store';
import { StoreService } from '../../../../../projects/v/store/src/store/services/store-service/store.service';
import { StoreDataService } from '../../../../../projects/v/store/src/store/services/store/store-data.service';
import { StoreSubscribersService } from '../../../../../projects/v/store/src/store/services/store-subscribers/store-subscribers.service';
import {  setGlobalInjector } from '../../../../../projects/v/store/src/store/injector/injector';
import { JsonPipe } from '@angular/common';


@Component({
    selector: 'app-test-store',
    standalone: true,
    templateUrl: './test-store.component.html',
    styleUrls: ['./test-store.component.scss'],
    providers: [StoreService, StoreDataService,
        StoreSubscribersService],
    imports: [
        JsonPipe
    ],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class TestStoreComponent implements OnInit {

    public firstName = signal('Jane');
    public storeSignal: WritableSignal<any>
    public storeItem: any;
    public name: Signal<string> = signal('test');

    constructor(protected store: StoreService, injector: Injector) {
        setGlobalInjector(injector);
    }

    ngOnInit() {
        createStore(TestStore, 'store');
        createStore('TestStore', 'store1');
        setTimeout(() => {
            this.firstName.set('Den');
        }, 1000);

        this.name = computed(() => this.firstName() + ' Family');

         this.storeItem = this.store.selectStore('store');
        this.storeSignal = this.store.selectSignal('store');

        // console.log(store);
        console.log(this.storeSignal());
        // console.log(store.dataNotDec);
        this.storeItem.data = 105;
        this.storeItem.method();
        // console.log(store.data);

        const store1 = this.store.selectStore('store1');
        const storeInstance = this.store.selectStoreInstance('store');

        this.store.listenChange('store').subscribe(data => {
            this.storeItem = data;
        });

        this.store.anyChanges$.subscribe(data => {
            console.log('anyChanges$', data);
        });

        setTimeout(() => {
            this.store.mutateStore('store', value => {
                value.data = 99;
                value.dataNotDec = 'update'
                return value;
            });
        }, 2500)



        storeInstance.validate().then(res => console.log(res));
        setTimeout(() => {
            const data = this.store.selectStore('store');
            const dataSignal = this.store.selectSignal('store');
            console.log(data);
            console.log(dataSignal());
            console.log(data.store.selectStore('store'));
        }, 4000);

    }

}
