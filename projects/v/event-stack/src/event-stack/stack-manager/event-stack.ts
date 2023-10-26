import { EventStackItemsInterface } from './models/event-stack-items.interface';
import { EventStackManagerInterface } from './models/event-stack-manager.interface';
import { EventStackItemInterface, EventStackSubscription } from '../stack-item/models/event-stack.item.interface';
import { EventStackItem } from '../stack-item/event-stack-item';
import { StackCallback } from './models/stack-callback';


export class EventStackManager implements EventStackManagerInterface {
    protected items: EventStackItemsInterface = {};
    protected idCounter = 0;

    public add<T>(name: string | symbol | number): EventStackItemInterface<T> {
        const stackItem = new EventStackItem(this, name, this.idCounter++);
        this.items[name] = stackItem;
        return stackItem;
    }

    public listen<T>(name: string | symbol, callback: StackCallback<T>): EventStackSubscription {
        if (!this.items[name]) {
            throw new Error(`event doesnt exist`);
        }
        this.items[name].addCallback(callback);
        const returnOb = {
            id: this.items[name].idCount as number,
            unsubscribe: () => this.items[name].unsubscribe(returnOb.id)
        };
        return returnOb;
    }

    public removeStackItem(item: EventStackItemInterface<any>): void {
        if (!this.items[item.name]) {
            return;
        }
        delete this.items[item.name];
    }

    public emit<T>(event: string | number | symbol, data: T) {
        if (!this.items[event as any]) {
            return;
        }
        this.items[event].emit(data);
    }
}
