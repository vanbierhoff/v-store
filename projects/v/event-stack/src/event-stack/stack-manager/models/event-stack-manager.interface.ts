import { EventStackItemInterface } from '../../stack-item/models/event-stack.item.interface';


export interface EventStackManagerInterface {
    subscribe?<T>(event: string | number, callback: ((value: T) => void)): EventStackItemInterface;

    removeStackItem(item: EventStackItemInterface): void;


}
