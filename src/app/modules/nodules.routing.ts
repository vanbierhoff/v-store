import { Route } from '@angular/router';


export const MODULES_ROUTES: Route[] = [
    {
        path: 'store',
        loadComponent: () => import('./store/test-store/test-store.component')
            .then(m => m.TestStoreComponent)
    },

    {
        path: 'store-sub',
        loadComponent: () => import('./store/store-subscriber/store-subscriber.component')
            .then(m => m.StoreSubscriberComponent)
    },

    {
        path: 'r-type',
        loadComponent: () => import('./r-types/r-type.demo/r-type.demo.component').then(c => c.RTypeDemoComponent)
    },

    {
        path: 'stack',
        loadComponent: () => import('./stack/stack.demo.component').then(c => c.StackDemoComponent)
    }

];
