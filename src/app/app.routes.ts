import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'tabmenu/principal',
    pathMatch: 'full',
  },
  {
    path: 'tabmenu',
    loadChildren: () => import("./component/tabmenu/tabmenu.routes").then(module => module.tabmenuRoutes),
  },
  {
    path: 'credencial-cadastrar',
    loadComponent: () => import('./modal/credencial-cadastrar/credencial-cadastrar.page').then( m => m.CredencialCadastrarPage)
  },
];
