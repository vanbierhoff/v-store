import {
    ChangeDetectionStrategy,
    Component,
    computed,
    OnInit,
    Signal,
    signal
} from '@angular/core';
import { TestStore } from '../models/test-store';
import { StoreService } from '../../../../../projects/v/store/src/store/services/store/store.service';
import { createStore } from '../../../../../projects/v/store/src/store/create-store/create-from-decorated';


@Component({
    selector: 'app-test-store',
    standalone: true,
    templateUrl: './test-store.component.html',
    styleUrls: ['./test-store.component.scss'],
    providers: [StoreService],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class TestStoreComponent implements OnInit {

    public firstName = signal('Jane');
    public name: Signal<string> = signal('test');

    constructor(protected store: StoreService) {
    }

    ngOnInit() {
        createStore(TestStore, 'store', [this.store]);
        createStore('TestStore', 'store1');
        setTimeout(() => {
            this.firstName.set('Den');
        }, 1000);

        this.name = computed(() => this.firstName() + ' Family');

        const store = this.store.selectStore('store');

        console.log(store);
        console.log(store.dataNotDec);
        store.data = 105;
        store.method();
        console.log(store.data);

        const store1 = this.store.selectStore('store1');
        const storeInstance = this.store.selectStoreInstance('store');

        this.store.mutateStore('store', value => {
            value.data = 99;
            return value;
        });

        storeInstance.validate().then(res => console.log(res));
        setTimeout(() => {
            const data = this.store.selectStore('store');
            console.log(data);
        }, 3000);

    }

}
