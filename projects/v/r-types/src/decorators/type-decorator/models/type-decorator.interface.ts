export interface TypeDecoratorInterface<T = any>{
    get(): T;
    validate: () => boolean;
}

