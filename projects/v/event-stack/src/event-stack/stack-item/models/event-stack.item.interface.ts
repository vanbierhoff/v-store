import { StackCallback } from '@v/short-stack/src/event-stack/stack-manager/models/stack-callback';



export interface EventStackItemInterface<T> {
    unsubscribe: (id: number) => void;
    name: string | symbol | number;
    id: string | number;
    idCount: string | number;

    emit<T>(data: T): void;

    addCallback<T>(cb: StackCallback<T>): void;
}

export interface EventStackSubscription {
    id: number;
    unsubscribe: () => void;
}
