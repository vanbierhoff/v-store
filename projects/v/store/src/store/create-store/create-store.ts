export type StoreConstructor<T> = new(...args: any[]) => T;

/**
 * Simplified basic version of [[createStore]] for sync operations.
 */
export function createStore<T = any>(store: StoreConstructor<T>, key: string | symbol, ...args: any[]): T {
    return new store(...args);
}
