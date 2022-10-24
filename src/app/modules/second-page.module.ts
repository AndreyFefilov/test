import { NgModule } from '@angular/core';
import { SecondPageComponent } from './second-page.component';
import { CommonModule } from '@angular/common';
import { ForgeService } from '../forge.service';
import { RouterModule, Routes } from '@angular/router';

const ROUTES: Routes = [
  {
    path: '',
    component: SecondPageComponent
  }
];

const SERVICES = [
  ForgeService
];
const MODULES = [
  CommonModule
];

@NgModule({
  declarations: [SecondPageComponent],
  imports: [...MODULES, RouterModule.forChild(ROUTES)],
  exports: [RouterModule],
  providers: SERVICES
})

export class SecondPageModule {}
