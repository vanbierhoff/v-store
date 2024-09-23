import { ChangeDetectionStrategy, Component, Injector, OnInit, signal, WritableSignal } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
    createStore,
    setGlobalInjector,

    StoreInstanceImplInterface, StoreModule
} from '@v/short-store';
import { TestStore } from '../models/test-store';
import { STORE_FIELD_INSTANCE_EVENTS } from '../../../../../projects/v/store/src/store/store-items/models/store-events';
import { storeService } from '../../../../../projects/v/store/src/store/services/store-service';


@Component({
    selector: 'app-store-subscriber',
    standalone: true,
    imports: [CommonModule, StoreModule],
    providers: [],
    templateUrl: './store-subscriber.component.html',
    styleUrls: ['./store-subscriber.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class StoreSubscriberComponent implements OnInit {

    constructor(injector: Injector) {
        setGlobalInjector(injector);

    }

    store = storeService();
    public firstSub: WritableSignal<any> = signal('first value');
    public storeItem: StoreInstanceImplInterface<TestStore>;


    ngOnInit(): void {
        console.log(this.firstSub());
        createStore(TestStore, 'store');
        this.storeItem = this.store.selectStoreInstance('store');
        this.subscribe();
    }


    subscribe() {
        const item = this.storeItem.get('data');
        item?.listenEvent(STORE_FIELD_INSTANCE_EVENTS.changeValue, (value) => {
            setTimeout(() => {
                this.firstSub.set(value.value);
            }, 2500);
        });

        item?.setValue('1000');
    }
}
