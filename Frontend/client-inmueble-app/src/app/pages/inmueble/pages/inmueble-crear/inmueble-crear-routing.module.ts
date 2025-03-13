import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InmuebleCrearComponent } from './inmueble-crear.component';

const routes: Routes = [
  {
    path: '',
    component: InmuebleCrearComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InmuebleCrearRoutingModule { }
