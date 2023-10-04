import { EventStackItemInterface, EventStackManager } from 'projects/v/event-stack/src/event-stack';
import { StackCallback } from 'projects/v/event-stack/src/event-stack/stack-manager/models/stack-callback';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';


class AbstractField {

    manager = new EventStackManager();

    _value: any;

    public subscribe(event: string, callback: StackCallback<any>) {
        return this.manager.add(event, callback);
    }

    set value(data: any) {
        this._value = data;
        this.manager.emit('change', data);
    }

}

class TestStack {

    constructor(public field: AbstractField) {
    }

    subscribe(name: string, cb: StackCallback<any>): EventStackItemInterface {
        return this.field.subscribe(name, cb);
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
        field.updateValue(100);
        field.updateValue(200);
        sub.unsubscribe();
        field.updateValue(300);
    }


}
