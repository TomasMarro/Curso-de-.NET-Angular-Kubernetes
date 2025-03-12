import { Action } from "@ngrx/store";
import { EmailPasswordCredentials, UserCreateRequest, UserResponse } from "./user.models";

export enum UserActionTypes {
    INIT = '[User] Init: Start',
    INIT_AUTHORIZED = '[User] Init: Authorized',
    INIT_UNAUTHORIZED = '[User] Init: UnAthorized',
    INIT_ERROR = '[User] Init: Error',

    LOGIN = '[User] Login: Start',
    LOGIN_SUCCESS = '[User] Login: Success',
    LOGIN_FAIL = '[User] Login: Fail',

    LOGOUT = '[User] Logout: Start',
    LOGOUT_SUCCESS = '[User] Logout: Success',
    LOGOUT_FAIL = '[User] Logout: Fail',

    REGISTER = '[User] Register: Start',
    REGISTER_SUCCESS = '[User] Register: Success',
    REGISTER_FAIL = '[User] Register: Fail',
}


//INIT _> EL USUARIO ESTA EN SESSION?
export class Init implements Action {
    readonly type = UserActionTypes.INIT;

    constructor() {}
}

export class InitAuthorized implements Action {
  readonly type = UserActionTypes.INIT_AUTHORIZED;

  constructor(
    public email: string,
    public user: UserResponse | null
  ) {}
}

export class InitUnAuthorized implements Action {
  readonly type = UserActionTypes.INIT_UNAUTHORIZED;

  constructor(
  ) {}
}

export class InitError implements Action {
  readonly type = UserActionTypes.INIT_ERROR;

  constructor(
    public error: any
  ) {}
}


//LOGIN _> EL USUARIO ESTA EN SESSION?
export class Login implements Action {
    readonly type = UserActionTypes.LOGIN;

    constructor(
        public credentials: EmailPasswordCredentials
    ) {}
}

export class LoginSuccess implements Action {
    readonly type = UserActionTypes.LOGIN_SUCCESS;

    constructor(
        public email: string,
        public user: UserResponse
    ) {}
}

export class LoginFail implements Action {
    readonly type = UserActionTypes.LOGIN_FAIL;

    constructor(
        public error: string
    ) {}
}

//REGISTER _> registro de usuarios
export class Register implements Action {
    readonly type = UserActionTypes.REGISTER;

    constructor(
        public user: UserCreateRequest
    ) {}
}

export class RegisterSuccess implements Action {
    readonly type = UserActionTypes.REGISTER_SUCCESS;

    constructor(
        public email: string,
        public user: UserResponse | null
    ) {}
}

export class RegisterFail implements Action {
    readonly type = UserActionTypes.REGISTER_FAIL;

    constructor(
        public error: string
    ) {}
}


//LOGOUT _> cerrar sesion
export class Logout implements Action {
    readonly type = UserActionTypes.LOGOUT;

    constructor() {}
}

export class LogoutSuccess implements Action {
    readonly type = UserActionTypes.LOGOUT_SUCCESS;

    constructor() {}
}

export class LogoutFail implements Action {
    readonly type = UserActionTypes.LOGOUT_FAIL;

    constructor(
        public error: string
    ) {}
}


export type ALL = Init |
        InitAuthorized |
      InitUnAuthorized |
             InitError |
                 Login |
          LoginSuccess |
             LoginFail |
              Register |
       RegisterSuccess |
          RegisterFail |
                Logout |
         LogoutSuccess |
             LogoutFail;
