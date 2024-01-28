import {
    EventStackManager,
} from 'projects/v/event-stack/src/event-stack';
import { StackCallback } from 'projects/v/event-stack/src/event-stack/stack-manager/models/stack-callback';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { EventStackSubscription } from '@v/event-stack/event-stack/stack-item/models/event-stack.item.interface';


class AbstractField {

    constructor() {
        this.manager.add<number>('change');
    }

    manager = new EventStackManager();

    _value: any;

    listen(event: string, cb: StackCallback<number>): EventStackSubscription {
        return this.manager.listen(event, cb);
    }

    set value(data: any) {
        this._value = data;
        this.manager.emit('change', data);
    }

}

class TestStack {

    constructor(public field: AbstractField) {
    }

    subscribe(event: string, cb: StackCallback<number>): EventStackSubscription {
        return this.field.listen(event, cb);
    }

    updateValue(value: any) {
        this.field.value = value;
    }

}


@Component({
    selector: 'app-stack-demo',
    templateUrl: './stack.demo.component.html',
    styleUrls: ['./stack.demo.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true
})
export class StackDemoComponent implements OnInit {



    ngOnInit() {
        const stack = new AbstractField();
        const field = new TestStack(stack);
        const sub = field.subscribe('change', (data) => {
            console.log(data);
        });
        const sub2 = field.subscribe('change', (data) => {
            console.log('sub2 ' + data);
        });
        field.updateValue(100);
        field.updateValue(200);
        sub.unsubscribe();
        field.updateValue(300);
        sub2.unsubscribe()
    }


}
