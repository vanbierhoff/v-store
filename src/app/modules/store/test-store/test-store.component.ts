import {
    ChangeDetectionStrategy,
    Component,
    computed, Injector,
    OnInit,
    Signal,
    signal, WritableSignal
} from '@angular/core';
import { TestStore } from '../models/test-store';
import {
    createStore,
    FIELD_MANAGER_TOKEN, FieldManager, setGlobalInjector,
    StoreDataService,
    StoreItem,
    StoreService,
    StoreSubscribersService
} from '@v/short-store';
import { CUSTOM_STORE_ITEM_TOKEN } from '../../../../../projects/v/store/src/store/const/tokens/custom-store-item.token';
import { JsonPipe } from '@angular/common';
import { STEP_FIRST, STEP_TWO } from '../models/steps-data/steps-data';
import { StepItem } from '../models/steps-data/step-item';
import { stepFactory } from '../models/steps-data/step-factory';
import { HttpClient } from '@angular/common/http';



const symbolStoreKey = Symbol('storeKey');

@Component({
    selector: 'app-test-store',
    standalone: true,
    templateUrl: './test-store.component.html',
    styleUrls: ['./test-store.component.scss'],
    providers: [
        StoreService,
        StoreDataService,
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
    imports: [
        JsonPipe
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

    constructor(protected store: StoreService, injector: Injector, protected http: HttpClient) {
        setGlobalInjector(injector);

    }

    ngOnInit() {
        [STEP_FIRST, STEP_TWO].forEach(step => {
            createStore(StepItem, step.stepName);
            this.store.mutateStore(step.stepName, store => {
                store = stepFactory(step, this.http);
                return store;
            });
        });
        console.log(this.store.selectStore('first'))
    }

}
