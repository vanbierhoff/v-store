export interface TypeDecoratorInterface<T = any>{
    get(): T;
    set: (value: any) => any;
    validate: () => boolean;
}

