import { Action } from "@ngrx/store";

import { InmuebleCreateRequest, InmuebleResponse } from "./save.models";



export enum SaveActionTypes {
  SAVE = '[Inmueble] Save: Start',
  SAVE_SUCCESS = '[Inmueble] Save: Success',
  SAVE_FAILURE = '[Inmueble] Save: Failure',

  READ = '[Inmueble] Read: Start',
  READ_SUCCESS = '[Inmueble] Read: Success',
  READ_FAILURE = '[Inmueble] Read: Failure'

}

export class Create implements Action {
  readonly type = SaveActionTypes.SAVE;
  constructor(public inmueble: InmuebleCreateRequest) {}
}

export class CreateSuccess implements Action {
  readonly type = SaveActionTypes.SAVE_SUCCESS;
  constructor(public inmueble: InmuebleResponse) {}
}

export class CreateFail implements Action {
  readonly type = SaveActionTypes.SAVE_FAILURE;
  constructor(public errot: string) {}
}

export class Read implements Action {
  readonly type = SaveActionTypes.READ;
}

export class ReadSuccess implements Action {
  readonly type = SaveActionTypes.READ_SUCCESS;
  constructor(public inmuebles: InmuebleResponse[]) {}
}

export class ReadFail implements Action {
  readonly type = SaveActionTypes.READ_FAILURE;
  constructor(public error: string) {}
}

export type SaveActions = Create | CreateSuccess | CreateFail | Read | ReadSuccess | ReadFail;
