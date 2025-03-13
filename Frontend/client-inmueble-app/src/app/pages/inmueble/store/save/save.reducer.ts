import { InmuebleResponse } from "./save.models";

import * as fromActions from './save.actions';


export interface ListState
{
  inmuebles: InmuebleResponse[] | null;
  inmueble: InmuebleResponse | null;
  loading: boolean | null;
  error: string | null;
}


export const initialState: ListState = {
  inmuebles: null,
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
    case fromActions.SaveActionTypes.READ: {
      return {
        ...state,
        loading: true,
        error: null
      };
    }
    case fromActions.SaveActionTypes.READ_SUCCESS: {
      return {
        ...state,
        inmuebles: action.inmuebles,
        loading: false,
        error: null
      };
    }
    case fromActions.SaveActionTypes.READ_FAILURE: {
      return {
        ...state,
        loading: false,
        error: action.error
      };
    }
    default:
      return state;
  }

}
