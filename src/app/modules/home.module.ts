import { NgModule } from '@angular/core';

import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { RouterModule, Routes } from '@angular/router';

const ROUTES: Routes = [
  {
    path: '',
    component: HomeComponent
  }
];

const MODULES = [
  CommonModule
];

@NgModule({
  declarations: [HomeComponent],
  imports: [...MODULES, RouterModule.forChild(ROUTES)],
  exports: [RouterModule]
})

export class HomeModule {}
