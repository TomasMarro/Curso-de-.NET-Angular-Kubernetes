import { UserResponse } from "./user.models";
import * as fromActions from './user.actions';

export interface UserState {
  entity: UserResponse | null;
  id: string | null;
  loading: boolean | null;
  error: string | null;
}


const initialState: UserState = {
  entity: null,
  id: null,
  loading: null,
  error: null
}


export function reducer(state = initialState, action: fromActions.ALL | any): UserState {
  switch (action.type) {
    case fromActions.UserActionTypes.INIT:
      return {
        ...state,
        loading: true,
      };
    case fromActions.UserActionTypes.INIT_UNAUTHORIZED:
      return {
        ...state,
        loading: false,
        entity: null,
        id: null,
        error: null
      };
    case fromActions.UserActionTypes.INIT_ERROR:
      return {
        ...state,
        loading: false,
        entity: null,
        id: null,
        error: action.error
      };
    case fromActions.UserActionTypes.INIT_AUTHORIZED:
      return {
        ...state,
        loading: false,
        entity: action.user,
        id: action.id
      };
    case fromActions.UserActionTypes.LOGIN:
      return {
        ...state,
        loading: true,
        error: null,
        entity: null,
        id: null
      };
    case fromActions.UserActionTypes.LOGIN_SUCCESS:
      return {
        ...state,
        entity: action.user,
        id: action.id,
        loading: false,
        error: null
      };
    case fromActions.UserActionTypes.LOGIN_FAIL:
      return {
        ...state,
        loading: false,
        error: action.error,
        entity: null,
        id: null
      };
    case fromActions.UserActionTypes.REGISTER:
      return {
        ...state,
        loading: true,
        error: null,
        entity: null,
        id: null
      };
    case fromActions.UserActionTypes.REGISTER_SUCCESS:
      return {
        ...state,
        entity: action.user,
        id: action.id,
        loading: false,
        error: null
      };
    case fromActions.UserActionTypes.REGISTER_FAIL:
      return {
        ...state,
        loading: false,
        error: action.error,
        entity: null,
        id: null
      };
    case fromActions.UserActionTypes.LOGOUT:
      return {
        ...initialState
      };
    case fromActions.UserActionTypes.LOGOUT_SUCCESS:
      return {
        ...initialState
      };
    case fromActions.UserActionTypes.LOGOUT_FAIL:
      return{
        ...state,
        error: action.error,
        loading: false,
        entity: null,
        id: null
      };
    default:
      return state;
  }
}
