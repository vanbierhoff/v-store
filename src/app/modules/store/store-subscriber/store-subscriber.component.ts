import { ChangeDetectionStrategy, Component, Injector, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
    createStore, FIELD_MANAGER_TOKEN, FieldManager,
    setGlobalInjector,
    StoreDataService, StoreItem,
    StoreItemInstance,
    StoreItemInterface,
    StoreService, StoreSubscribersService
} from '@v/short-store';
import { TestStore } from '../models/test-store';
import { STORE_FIELD_INSTANCE_EVENTS } from '../../../../../projects/v/store/src/store/store-items/models/store-events';
import { CUSTOM_STORE_ITEM_TOKEN } from '../../../../../projects/v/store/src/store/const/tokens/custom-store-item.token';
import { StoreFieldInstance } from '../../../../../projects/v/store/src/store/store-items/store-field/store-field-instance';


@Component({
    selector: 'app-store-subscriber',
    standalone: true,
    imports: [CommonModule],
    providers: [StoreService, StoreDataService,
        StoreSubscribersService,
        {
            provide: CUSTOM_STORE_ITEM_TOKEN,
            useValue: StoreItem
        },
        {
            provide: FIELD_MANAGER_TOKEN,
            useValue: FieldManager
        }
    ],
    templateUrl: './store-subscriber.component.html',
    styleUrls: ['./store-subscriber.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class StoreSubscriberComponent implements OnInit {

    constructor(protected store: StoreService, injector: Injector) {
        setGlobalInjector(injector);

    }

    public firstSub = signal('first value');
    public storeItem: StoreItemInterface<TestStore>;


    ngOnInit(): void {
        createStore(TestStore, 'store');
        this.storeItem = this.store.selectStoreInstance('store');
        this.subscribe();
    }


    subscribe() {
        const item = this.storeItem.get('data');
        item?.listenEvent(STORE_FIELD_INSTANCE_EVENTS.changeValue, (value: StoreFieldInstance) => {
            setTimeout(() => {
                this.firstSub.set(value.value);
            }, 2500);
        });

        item?.setValue('1000');
    }
}