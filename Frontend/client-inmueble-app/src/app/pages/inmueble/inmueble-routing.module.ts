import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '@app/guards/auth/auth.guard';

const routes: Routes = [
  {
    path: 'nuevo',
    loadChildren: () => import('./pages/inmueble-crear/inmueble-crear.module').then(m => m.InmuebleCrearModule),
    canActivate: [AuthGuard]

  },
  {
    path: 'list',
    loadChildren: () => import('./pages/inmueble-list/inmueble-list.module').then(m => m.InmuebleListModule),
    canActivate: [AuthGuard]
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InmuebleRoutingModule { }
