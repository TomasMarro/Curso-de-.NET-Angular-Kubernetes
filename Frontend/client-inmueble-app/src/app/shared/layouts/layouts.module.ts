import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EntityFotoComponent } from './entity-foto/entity-foto.component';
import { EntityFotoModule } from './entity-foto/entity-foto.module';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    EntityFotoModule
  ],
  exports: [
    EntityFotoModule
  ]
})
export class LayoutsModule { }
