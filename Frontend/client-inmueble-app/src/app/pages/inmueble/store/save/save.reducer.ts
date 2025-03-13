import { InmuebleResponse } from "./save.models";

import * as fromActions from './save.actions';


export interface ListState
{
  inmueble: InmuebleResponse | null;
  loading: boolean | null;
  error: string | null;
}


export const initialState: ListState = {
  inmueble: null,
  loading: null,
  error: null
}

export function reducer(state: ListState = initialState, action: fromActions.SaveActions | any) {

  switch (action.type) {
    case fromActions.SaveActionTypes.SAVE: {
      return {
        ...state,
        loading: true,
        error: null
      }
    }
    case fromActions.SaveActionTypes.SAVE_SUCCESS: {
      return {
        ...state,
        inmueble: action.inmueble,
        loading: false,
        error: null
      }
    }
    case fromActions.SaveActionTypes.SAVE_FAILURE: {
      return {
        ...state,
        loading: false,
        error: action.error
      }
    }
    default:
      return state;
  }

}
