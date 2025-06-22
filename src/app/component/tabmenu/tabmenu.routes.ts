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
        path: 'configuracao',
        loadComponent: () => import('../../page/configuracao/configuracao.page').then(m => m.ConfiguracaoPage)
      },
      {
        path: 'vault',
        loadComponent: () => import('../../page/vault/vault.page').then(m => m.VaultPage)
      }
    ]
  },
];
