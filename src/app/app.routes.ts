import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'tabmenu/principal',
    pathMatch: 'full',
  },
  {
    path: "tabmenu",
    loadChildren: () => import("./component/tabmenu/tabmenu.routes").then(module => module.tabmenuRoutes),
  },
  {
    path: 'senha-cadastrar',
    loadComponent: () => import('./page/senha/senha-cadastrar/senha-cadastrar.page').then( m => m.SenhaCadastrarPage)
  }
];
