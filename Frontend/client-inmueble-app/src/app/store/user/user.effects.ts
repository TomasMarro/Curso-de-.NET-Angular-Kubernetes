

import { Injectable } from '@angular/core';
import * as fromActions from './user.actions';
import { HttpClient } from '@angular/common/http';
import { act, Actions, createEffect, ofType } from '@ngrx/effects';
import { NotificationService } from '@app/services';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError, map, switchMap, tap } from 'rxjs/operators';
import { UserResponse } from './user.models';
import { environment } from '@src/environments/environment';

type Action = fromActions.ALL;

@Injectable()
export class UserEffects {


  /**
   *
   */
  constructor(
    private httpClient: HttpClient,
    private actions: Actions,
    private notification: NotificationService,
    private router: Router
  ) {


  }

  register: Observable<Action> = createEffect(() =>
    this.actions.pipe(
      ofType(fromActions.UserActionTypes.REGISTER),
      map((action: fromActions.Register) => action.user),
      switchMap(userData =>
        this.httpClient.post<UserResponse>(`${environment.url}usuarios/register/`, userData)
          .pipe(
            tap((response: UserResponse) => {
              localStorage.setItem('token', response.token);
              this.router.navigate(['/']);
            }),
            map((response: UserResponse) => new fromActions.RegisterSuccess(response.email, response || null)),
            catchError(error => {
              this.notification.error('Error registrar un nuevo usuario');
              return of(new fromActions.RegisterFail(error.message));
            }
            )
          ),
      )
    )
  )


  login: Observable<Action> = createEffect(() =>
    this.actions.pipe(
      ofType(fromActions.UserActionTypes.LOGIN),
      map((action: fromActions.Login) => action.credentials),
      switchMap(userData =>
        this.httpClient.post<UserResponse>(`${environment.url}usuarios/login/`, userData)
          .pipe(
            tap((response: UserResponse) => {
              localStorage.setItem('token', response.token);
              this.router.navigate(['/']);
            }),
            map((response: UserResponse) => new fromActions.LoginSuccess(response.email, response || null)),
            catchError(error => {
              this.notification.error('Las crendeciales son incorrectas');
              return of(new fromActions.LoginFail(error.message));
            }
            )
          ),
      )
    )
  )

  init: Observable<Action> = createEffect(() =>
    this.actions.pipe(
      ofType(fromActions.UserActionTypes.INIT),
      switchMap(async () => localStorage.getItem('token') ? this.httpClient.get<UserResponse>(`${environment.url}usuarios/`) : of(null)),
      switchMap(token => {
        if (token) {
          return this.httpClient.get<UserResponse>(`${environment.url}usuarios/getUserSession/`)
            .pipe(
              tap((response: UserResponse) => {
                console.log("Data del usuario:", response);
              }),
              map((response: UserResponse) => new fromActions.InitAuthorized(response.email, response || null)),
              catchError(error => {
                return of(new fromActions.InitError(error.message));
              }
              )
            )
        }
        else {
          return of(new fromActions.InitUnAuthorized())
        }
      }
      )
    )
  )



}
