import {
    ChangeDetectionStrategy,
    Component,
    computed,
    OnInit,
    Signal,
    signal
} from '@angular/core';
import { TestStore } from '../models/test-store';
import { HttpClient } from '@angular/common/http';
import { StoreService } from '../../../../../projects/v/store/src/store/services/store/store.service';


@Component({
    selector: 'app-test-store',
    standalone: true,
    templateUrl: './test-store.component.html',
    styleUrls: ['./test-store.component.scss'],
    providers: [StoreService],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class TestStoreComponent implements OnInit {

    constructor(protected store: StoreService) {
    }

    public firstName = signal('Jane');

    public name: Signal<string> = signal('test');

    ngOnInit() {
        console.log(new TestStore(this.store));
        setTimeout(() => {
            this.firstName.set('Den');
        }, 1000);

        this.name = computed(() => this.firstName() + ' Family');
    }

}
