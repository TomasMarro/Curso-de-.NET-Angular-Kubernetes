
import { Injectable } from '@angular/core';
import * as fromActions from './save.actions';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { NotificationService } from '@app/services';
import { catchError, delay, map, switchMap, tap } from 'rxjs/operators';
import { Observable, of, } from 'rxjs';
import { Inmueble } from '@app/models/backend/inmueble';
import { InmuebleCreateRequest, InmuebleResponse } from './save.models';
import { environment } from '@src/environments/environment';


type Action = fromActions.SaveActions;


@Injectable()
export class SaveEffects {
  constructor(
    private actions$: Actions,
    private httpClient: HttpClient,
    private router: Router,
    private notification: NotificationService) { }

  create: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType(fromActions.SaveActionTypes.SAVE),
      map((action: fromActions.Create) => action.inmueble),
      switchMap((request: InmuebleCreateRequest) =>
        this.httpClient.post<InmuebleResponse>(`${environment.url}inmuebles`, request)
          .pipe(
            delay(1000),
            tap((response: InmuebleResponse) => {
              this.notification.success('Inmueble creado con éxito');
              this.router.navigate(['/inmueble/list']);
            }),
            map((inmueble: InmuebleResponse) => new fromActions.CreateSuccess(inmueble)),
            catchError(error => {
              this.notification.error(`Error al crear el inmueble: ${error}`);
              return of(new fromActions.CreateFail(error));
            })
          )
      )
    ));

  read: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType(fromActions.SaveActionTypes.READ),
      switchMap(() =>
        this.httpClient.get<InmuebleResponse[]>(`${environment.url}inmuebles`)
          .pipe(
            delay(1000),
            map((inmuebles: InmuebleResponse[]) => new fromActions.ReadSuccess(inmuebles)),
            catchError(error => of(new fromActions.ReadFail(error.message)))
          )
      )
    )
  );


}
