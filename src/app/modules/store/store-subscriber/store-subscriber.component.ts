import { ChangeDetectionStrategy, Component, Injector, OnInit, signal, WritableSignal } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
    createStore, FIELD_MANAGER_TOKEN, FieldManager,
    setGlobalInjector,
    StoreDataService, StoreItem,
    StoreItemInstance,
    StoreItemInterface, StoreModule,
    StoreService, StoreSubscribersService
} from '@v/short-store';
import { TestStore } from '../models/test-store';
import { STORE_FIELD_INSTANCE_EVENTS } from '../../../../../projects/v/store/src/store/store-items/models/store-events';
import { CUSTOM_STORE_ITEM_TOKEN } from '../../../../../projects/v/store/src/store/const/tokens/custom-store-item.token';
import { StoreFieldInstance } from '../../../../../projects/v/store/src/store/store-items/store-field/store-field-instance';


@Component({
    selector: 'app-store-subscriber',
    standalone: true,
    imports: [CommonModule, StoreModule],
    providers: [StoreService
    ],
    templateUrl: './store-subscriber.component.html',
    styleUrls: ['./store-subscriber.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class StoreSubscriberComponent implements OnInit {

    constructor(protected store: StoreService, injector: Injector) {
        setGlobalInjector(injector);

    }

    public firstSub: WritableSignal<any> = signal('first value');
    public storeItem: StoreItemInterface<TestStore>;


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
