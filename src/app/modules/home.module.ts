import { NgModule } from '@angular/core';

import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
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
  imports: [...MODULES, RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class HomeModule {}
