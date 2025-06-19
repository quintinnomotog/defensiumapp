import { Routes } from '@angular/router';
import { TabmenuPage } from './tabmenu.page';

export const tabmenuRoutes: Routes = [
    {
        path: '',
        component: TabmenuPage,
        children: [
            {
                path: 'principal',
                loadComponent: () => import('../../page/principal/principal.page').then(m => m.PrincipalPage)
            },
            {
                path: 'senhas',
                loadComponent: () => import('../../page/senhas/senhas.page').then(m => m.SenhasPage)
            }
        ]
    },
];
