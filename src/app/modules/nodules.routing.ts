import { Route } from '@angular/router';


export const MODULES_ROUTES: Route[] = [
    {
        path: 'store',
        loadComponent: () => import('./store/test-store/test-store.component')
            .then(m => m.TestStoreComponent)
    },

];
