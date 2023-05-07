import { Routes } from '@angular/router';
import { MODULES_ROUTES } from './modules/nodules.routing';


export const APP_ROUTES: Routes = [
    {
        path: '',
        loadComponent: () => import('./modules/layout/layout.component')
            .then(m => m.LayoutComponent),
        children: MODULES_ROUTES
    },
    {
        path: '**',
        redirectTo: '',
        pathMatch: 'full'
    }
];

