import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NotificationComponent } from './components';



@Injectable()
export class NotificationService {

  constructor(
    private sb: MatSnackBar

  ) { }


  error(message : string) : void {
    this.sb.openFromComponent(NotificationComponent,
      {
        duration: 3000,
        data: {
          message,
          type: 'error'
        },
        panelClass: ['mat-snackbar_error']
      });

  }

  success(message : string) : void {
    this.sb.openFromComponent(NotificationComponent,
      {
        duration: 3000,
        data: {
          message,
          type: 'success'
        },
        panelClass: ['mat-snackbar_success']
      });
  }


}
