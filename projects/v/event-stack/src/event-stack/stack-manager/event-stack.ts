import { EventStackItemsInterface } from './models/event-stack-items.interface';
import { EventStackManagerInterface } from './models/event-stack-manager.interface';
import { EventStackItemInterface } from '../stack-item/models/event-stack.item.interface';
import { EventStackItem } from '../stack-item/event-stack-item';
import { StackCallback } from './models/stack-callback';
import remove from 'lodash/remove';
import forEach from 'lodash/forEach';



export class EventStackManager implements EventStackManagerInterface {
    protected items: EventStackItemsInterface = {};
    protected idCounter = 0;

    public add<T>(name: string, callback: StackCallback<T>): EventStackItemInterface {
        const stackItem = new EventStackItem(this, name, this.idCounter++);
        this.items[name] = [{
            stackItem,
            callback
        }];
        return stackItem;
    }

    removeStackItem(item: EventStackItemInterface): void {
        if (!this.items[item.name]) {
            return;
        }
        remove(this.items[item.name], stackItem =>
            item.id === stackItem.stackItem.id);
    }

    emit<T>(event: string | number, data: T) {
        if (!this.items[event]) {
            return;
        }
        forEach(this.items[event], item => item.callback(data));
    }




}
