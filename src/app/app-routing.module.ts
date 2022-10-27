import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CanLoadSecondPage } from './modules/second-page.resolver';

const ROUTES: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    loadChildren: () => import('./modules/home.module').then(mod => mod.HomeModule)
  },
  {
    path: 'second-page',
    loadChildren: () => import('./modules/second-page.module').then(mod => mod.SecondPageModule),
    canLoad: [CanLoadSecondPage]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(ROUTES)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
