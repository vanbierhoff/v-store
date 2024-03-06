import { EventStackItemInterface } from './models/event-stack.item.interface';
import { EventStackManager } from '../stack-manager/event-stack';
import forEach from 'lodash/forEach';
import remove from 'lodash/remove';
import { StackCallback } from '../stack-manager/models/stack-callback';


export class EventStackItem<T> implements EventStackItemInterface<T> {

    constructor(protected manager: EventStackManager,
                protected nameEvent: string | symbol | number,
                protected idEvent: string | number
    ) {
    }

    protected cbCount: number = 0;

    protected callbacks: Array<{ id: number, cb: StackCallback }> = [];

    get name(): string | symbol | number {
        return this.nameEvent;
    }

    get id(): string | number {
        return this.idEvent;
    }

    get idCount(): number {
        return this.cbCount;
    }

    public unsubscribe(id: number) {
        this.remove(id);
    }

    public addCallback<T>(cb: StackCallback<T>) {
        this.callbacks.push({
            id: ++this.cbCount,
            cb
        });
    }

    public emit<T>(data: T): void {
        forEach(this.callbacks, item => item.cb(data));
    }

    private remove(id: number) {
        remove(this.callbacks, item => item.id == id);
    }

}
