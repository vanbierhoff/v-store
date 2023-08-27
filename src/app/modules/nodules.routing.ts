import { Route } from '@angular/router';


export const MODULES_ROUTES: Route[] = [
    {
        path: 'store',
        loadComponent: () => import('./store/test-store/test-store.component')
            .then(m => m.TestStoreComponent)
    },

    {
        path: 'r-type',
        loadComponent: () => import('./r-types/r-type.demo/r-type.demo.component').then(c => c.RTypeDemoComponent)
    }

];
