import { api } from '../../utils/user-api';
import { AppDispatch, AppThunk } from '../types';
import { TUser, TUserForm } from '../types/data';

export const SET_AUTH_CHECKED: "SET_AUTH_CHECKED" = "SET_AUTH_CHECKED";
export const SET_USER: "SET_USER" = "SET_USER";
export const SET_USER_LOGIN_FAILED: "SET_USER_LOGIN_FAILED" = "SET_USER_LOGIN_FAILED";
export const SET_USER_REGISTER_FAILED: "SET_USER_REGISTER_FAILED" = "SET_USER_REGISTER_FAILED";
export const SET_ERROR: "SET_ERROR" = "SET_ERROR";

export interface ISetAuthCheckedAction {
  type: typeof SET_AUTH_CHECKED,
  payload: boolean,
}

export interface ISetUserAction {
  type: typeof SET_USER,
  payload: TUser | null,
}

export interface ISetUserLoginFailedAction {
  type: typeof SET_USER_LOGIN_FAILED,
  payload: string,
}

export interface ISetUserRegisterFailedAction {
  type: typeof SET_USER_REGISTER_FAILED,
  payload: string,
}

export interface ISetErrorAction {
  type: typeof SET_ERROR,
  payload: string,
}

export type TUserActions = ISetAuthCheckedAction 
                          | ISetUserAction 
                          | ISetUserLoginFailedAction 
                          | ISetUserRegisterFailedAction 
                          | ISetErrorAction

export const setErrorAction = (payload:string):ISetErrorAction => ({
  type: SET_ERROR,
  payload,
});

export const setLoginFailedAction = (payload: string):ISetUserLoginFailedAction => ({
  type: SET_USER_LOGIN_FAILED,
  payload,
});

export const setRegisterFailedAction = (payload: string):ISetUserRegisterFailedAction => ({
  type: SET_USER_REGISTER_FAILED,
  payload,
});

export const setAuthCheckedAction = (payload: boolean):ISetAuthCheckedAction => ({
  type: SET_AUTH_CHECKED,
  payload,
});

export const setUserAction = (payload: TUser | null):ISetUserAction => ({
  type: SET_USER,
  payload,
});

export const getUser:AppThunk = () => async (dispatch: AppDispatch) => {
  api.getUser()
  .then((res) => {
    if (res && res.success) {
      dispatch(setUserAction(res.user));
    } else {
      dispatch(setLoginFailedAction(res.message));
      logout();
    }
  })
  .catch(res => dispatch(setErrorAction(res.message)))
}

export const checkUserAuth:AppThunk = () => async (dispatch: AppDispatch) => {
  if (localStorage.getItem("accessToken")) {
    try {
      api.getUser()
      .then((res) => {
        if (res && res.success) {
          dispatch(setUserAction(res.user));
        } else {
          dispatch(setLoginFailedAction(res.message));
          logout();
        }
      })
      .catch(res => dispatch(setErrorAction(res.message)))
    } catch {
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
      localStorage.removeItem("resetEmailSent");
      dispatch(setUserAction(null));
    } finally {
      dispatch(setAuthCheckedAction(true));
    }
  } else {
    dispatch(setAuthCheckedAction(true));
  }
}

export const login:AppThunk = (form: TUserForm ) => async (dispatch:AppDispatch) => { 
  api.login(form)
  .then(res => {
    if (res && res.success) {
      localStorage.setItem("accessToken", res.accessToken);
      localStorage.setItem("refreshToken", res.refreshToken);
      dispatch(setUserAction(res.user));
      dispatch(setAuthCheckedAction(true));
    } else {
      dispatch(setLoginFailedAction(res.message));
      dispatch(setAuthCheckedAction(true));
    }
  })
  .catch(res => {
    dispatch(setErrorAction(res.message));
    dispatch(setAuthCheckedAction(true));
  });
}


export const updateUser:AppThunk = (form: TUserForm) => async (dispatch:AppDispatch) => {
  api.updateUser(form)
  .then((res) => {
    if (res && res.success) {
      dispatch(setUserAction(res.user));
      dispatch(setAuthCheckedAction(true));
    } else {
      dispatch(setErrorAction(res.message));
      dispatch(setAuthCheckedAction(true));
    }
  })
  .catch(res => {
    dispatch(setErrorAction(res.message));
    dispatch(setAuthCheckedAction(true));
  })
}

export const logout:AppThunk = () => async (dispatch:AppDispatch) => {
  api.logout()
  .then(() => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    dispatch(setUserAction(null));
    dispatch(setAuthCheckedAction(true));
  })
  .catch(res => { 
    dispatch(setErrorAction(res.message));
    dispatch(setAuthCheckedAction(true));
  })
}

export const registerUser:AppThunk = (form: TUserForm) => async (dispatch:AppDispatch) => {
  api.registerUser(form)
  .then((res) => {
    if (res && res.success) {
      localStorage.setItem("accessToken", res.accessToken);
      localStorage.setItem("refreshToken", res.refreshToken);
      dispatch(setUserAction(res.user));
      dispatch(setAuthCheckedAction(true));
    } else {
      dispatch(setRegisterFailedAction(res.message));
      dispatch(setAuthCheckedAction(true));
    }
  })
  .catch(res => {
    dispatch(setErrorAction(res.message));
    dispatch(setAuthCheckedAction(true));
  })
}
