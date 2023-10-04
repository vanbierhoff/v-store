import { EventStackItemInterface } from '../../stack-item/models/event-stack.item.interface';
import { StackCallback } from './stack-callback';


export interface EventStackItemsInterface {
    [key: string | number]: Array<{
        stackItem: EventStackItemInterface,
        callback: StackCallback<any>
    }>;
}

