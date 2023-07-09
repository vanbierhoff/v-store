import {
    ChangeDetectionStrategy,
    Component,
    computed,
    OnInit,
    Signal,
    signal
} from '@angular/core';
import { TestStore } from '../models/test-store';
import { SyncStoreService } from '../../../../../projects/v/store/src/store/services/store/sync-store.service';
import { createStore } from '../../../../../projects/v/store/src/store/create-store/create-from-decorated';


@Component({
    selector: 'app-test-store',
    standalone: true,
    templateUrl: './test-store.component.html',
    styleUrls: ['./test-store.component.scss'],
    providers: [SyncStoreService],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class TestStoreComponent implements OnInit {

    public firstName = signal('Jane');
    public name: Signal<string> = signal('test');

    constructor(protected store: SyncStoreService) {
    }

    ngOnInit() {
        createStore(TestStore, 'store', [this.store]);
        createStore('TestStore', 'store1');
        setTimeout(() => {
            this.firstName.set('Den');
        }, 1000);

        this.name = computed(() => this.firstName() + ' Family');

        const store = this.store.syncSelectStore('store');

        console.log(store);
        console.log(store.dataNotDec);
        store.data = 105;
        store.method();
        console.log(store.data);

        const store1 = this.store.syncSelectStore('store1');
        this.store.syncMutateStore('store', value => {
            value.data = 99;
            return value;
        });

        setTimeout(() => {
           const data = this.store.syncSelectStore('store')
                console.log(data);
        }, 3000);

    }

}
