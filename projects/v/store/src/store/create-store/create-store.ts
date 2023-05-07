export type StoreConstructor<T> = new(...args: any[]) => T;

/**
 * Simplified basic version of [[createStore]] for sync operations.
 */
export function createStore<T = any>(form: StoreConstructor<T>, key: string | symbol, ...args: any[]): T {


    return new form(...args);
}
