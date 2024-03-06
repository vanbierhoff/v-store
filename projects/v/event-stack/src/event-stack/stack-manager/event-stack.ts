import { EventStackManagerInterface } from './models/event-stack-manager.interface';
import { EventStackItemInterface, EventStackSubscription } from '../stack-item/models/event-stack.item.interface';
import { EventStackItem } from '../stack-item/event-stack-item';
import { StackCallback } from './models/stack-callback';
import { EventStackItemsInterface } from './models/event-stack-items.interface';


export class EventStackManager implements EventStackManagerInterface {
    protected items: EventStackItemsInterface = {};
    protected idCounter = 0;

    public add<T>(name: string | symbol | number): EventStackItemInterface<T> {
        const stackItem = new EventStackItem(this, name, this.idCounter++);
        this.items[name] = stackItem;
        return stackItem;
    }

    public addMultiple<T>(names: Array<string | symbol | number>): Array<EventStackItemInterface<T>> {
        const events:Array<EventStackItemInterface<T>>  = [];
        names.forEach(name => {
            const stackItem = new EventStackItem(this, name, this.idCounter++);
            if (!(name in this.items)) {
                this.items[name] = stackItem;
                events.push(stackItem);
            }
        });
        return events;

    }

    public listen<T>(name: string | symbol, callback: StackCallback<T>): EventStackSubscription {
        if (!this.items[name]) {
            throw new Error(`event doesnt exist`);
        }
        this.items[name].addCallback(callback);
        const returnedObj = {
            id: this.items[name].idCount as number,
            unsubscribe: () => this.items[name].unsubscribe(returnedObj.id)
        };
        return returnedObj;
    }

    public removeEventItem(item: EventStackItemInterface<any>): void {
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
