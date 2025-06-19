import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'tabmenu',
    pathMatch: 'full',
  },
  {
    path: 'tabmenu',
    loadChildren: () => import("./component/tabmenu/tabmenu.routes").then(module => module.tabmenuRoutes),
  },
];
