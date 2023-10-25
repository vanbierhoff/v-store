import { EventStackItemInterface } from '../../stack-item/models/event-stack.item.interface';

export interface EventStackItemsInterface {
    [key: string | number | symbol]: EventStackItemInterface<any>;
}

