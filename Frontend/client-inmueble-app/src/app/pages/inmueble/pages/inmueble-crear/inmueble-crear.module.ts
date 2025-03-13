import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InmuebleCrearRoutingModule } from './inmueble-crear-routing.module';
import { InmuebleCrearComponent } from './inmueble-crear.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { FlexLayoutModule } from '@angular/flex-layout';
import { SpinnerModule } from '@app/shared/indicators';
import { EntityFotoModule } from '@app/shared/layouts';
import { PoopupsModule } from '@app/shared/poopups';


@NgModule({
  declarations: [
    InmuebleCrearComponent
  ],
  imports: [
    CommonModule,
    InmuebleCrearRoutingModule,

    MatToolbarModule,
    MatIconModule,
    MatFormFieldModule,
    MatButtonModule,
    MatInputModule,
    MatCardModule,


    FlexLayoutModule,
    SpinnerModule,
    EntityFotoModule,
    FormsModule,
    PoopupsModule


  ]
})
export class InmuebleCrearModule { }
