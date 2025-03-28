import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SpinnerComponent } from './spinner.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';



@NgModule({
  declarations: [
    SpinnerComponent
  ],
  imports: [
    MatProgressSpinnerModule,
    CommonModule
  ],
  exports: [
    SpinnerComponent
  ]
})
export class SpinnerModule { }
