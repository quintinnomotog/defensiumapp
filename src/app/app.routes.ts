import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'tabmenu',
    pathMatch: 'full',
  },
  {
    path: 'principal',
    loadComponent: () => import('./page/principal/principal.page').then( m => m.PrincipalPage)
  },
  {
    path: 'tabmenu',
    loadComponent: () => import('./component/tabmenu/tabmenu.page').then( m => m.TabmenuPage)
  },
];
