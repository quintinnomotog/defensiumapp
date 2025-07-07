import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'tabmenu/principal',
    pathMatch: 'full',
  },
  // {
  //   path: '',
  //   redirectTo: 'pessoa-cadastrar',
  //   pathMatch: 'full',
  // },
  {
    path: 'tabmenu',
    loadChildren: () => import("./component/tabmenu/tabmenu.routes").then(module => module.tabmenuRoutes),
  },
  {
    path: 'credencial-cadastrar',
    loadComponent: () => import('./modal/credencial-cadastrar/credencial-cadastrar.page').then( m => m.CredencialCadastrarPage)
  },
  {
    path: 'pessoa-cadastrar',
    loadComponent: () => import('./modal/pessoa-cadastrar/pessoa-cadastrar.page').then( m => m.PessoaCadastrarPage)
  },
  {
    path: 'credencial-editar/:codePublic',
    loadComponent: () => import('./page/credencial-editar/credencial-editar.page').then( m => m.CredencialEditarPage)
  },
];
