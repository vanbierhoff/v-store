# Store

State manager for angular 16+

### Base settings after start:
In main.ts or app/core module set injector
```typescript
  providers: [
    {
        provide: APP_INITIALIZER,
        multi: true,
        useFactory: (injector: Injector) => {
            setGlobalInjector({
                get(token: any, order?: number, originalFormConstructor?: any): any {
                    const notFound = Symbol('notFound');
                    const value = injector.get(token, notFound);
                    if (value === notFound) {
                        return;
                    }
                    return value;
                }
            });
            return () => {
            };
        },
        deps: [
            Injector
        ]
    }]
```

If you use standalone components, you may need set injector in this component,
because injector from  main.ts/app.module will be not access.
```typescript

constructor(protected store: StoreService, injector: Injector) {
    setGlobalInjector(injector);
}
```
