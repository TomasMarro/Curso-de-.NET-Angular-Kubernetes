import { Component, OnInit } from '@angular/core';
import { environment } from '@src/environments/environment';
import { test } from '@app/test';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { NotificationService } from '@app/services';
import * as fromRoot from '@app/store';
import * as fromUser from '@app/store/user';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'client-inmueble-app';
  showSpinner = false;
  user$! : Observable<fromUser.UserResponse> ;
  isAuthorized$! :  Observable<boolean>;



  /**
   *
   */
  constructor( private fs: AngularFirestore,
    private ns: NotificationService,
    private store: Store<fromRoot.State>,
    private roter: Router
  ) {
  }


  ngOnInit() {
   this.user$ = this.store.pipe(select(fromUser.getUser))  as Observable<fromUser.UserResponse>;
   this.isAuthorized$ = this.store.pipe(select(fromUser.getIsAuthorized))  as Observable<boolean>;

   this.store.dispatch(new fromUser.Init());
  }


  onToggleSpinner() : void {
    this.showSpinner = !this.showSpinner
  }

  onFilesChanged(urls : string | string[]): void {
    console.log(urls);
  }

  onSuccess() : void {
    this.ns.success('Operación exitosa');
  }

  onError() : void {
    this.ns.error('Operación fallida');
  }

  cerrarSession(): void{
    localStorage.removeItem('token');
    this.store.dispatch(new fromUser.Logout());
    this.roter.navigate(['/auth/login']);
  }

}
