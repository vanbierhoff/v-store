import { EventStackItemInterface } from './models/event-stack.item.interface';
import { EventStackManager } from '../stack-manager/event-stack';


export class EventStackItem implements EventStackItemInterface {

    constructor(protected manager: EventStackManager,
                protected nameEvent: string,
                protected idEvent: string | number
    ) {
    }

    unsubscribe() {
        this.manager.removeStackItem(this);
    }

    get name(): string {
        return this.nameEvent;
    }

    get id(): string | number {
        return this.idEvent;
    }
}
