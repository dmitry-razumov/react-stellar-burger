import type { TUserActions } from '../actions/user'

import { 
  SET_AUTH_CHECKED,
  SET_USER,
  SET_USER_LOGIN_FAILED,
  SET_USER_REGISTER_FAILED,
  SET_ERROR
} from '../actions/user';
import { TUser } from '../types/data';

type TUserState = {
  user: TUser | null,
  isError: boolean,
  errorMessage: string,
  errorLoginMessage: string,
  errorRegisterMessage: string,
  isAuthChecked: boolean,
  authFailed: boolean 
}

const initialState: TUserState = {
  user: null,
  isError: false,
  errorMessage: '',
  errorLoginMessage: '',
  errorRegisterMessage: '',
  isAuthChecked: false,
  authFailed: false 
};

export const userReducer = (state = initialState, action: TUserActions): TUserState => {
  switch (action.type) {
    case SET_AUTH_CHECKED:
      return {
        ...state,
        isAuthChecked: action.payload,
        authFailed: false
      }
    case SET_USER:
      return {
        ...state,
        user: action.payload,
        isError: false,
        errorLoginMessage: '',
        errorRegisterMessage: '',
        errorMessage: ''
      }
    case SET_USER_LOGIN_FAILED:
      return {
        ...state,
        errorLoginMessage: action.payload
      }
    case SET_USER_REGISTER_FAILED:
      return {
        ...state,
        errorRegisterMessage: action.payload
      }
    case SET_ERROR:
      return {
        ...state,
        isError: true,
        errorMessage: action.payload
      }
    default:
      return state;    
  }
};
