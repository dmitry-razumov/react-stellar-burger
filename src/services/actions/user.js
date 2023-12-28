import { api } from '../../utils/user-api';

export const SET_AUTH_CHECKED = "SET_AUTH_CHECKED";
export const SET_AUTH_FAILED = "SET_AUTH_FAILED";
export const SET_USER = "SET_USER";
export const SET_USER_LOGIN_FAILED = "SET_USER_LOGIN_FAILED";
export const SET_USER_REGISTER_FAILED = "SET_USER_REGISTER_FAILED";
export const SET_ERROR = "SET_ERROR"

export const setError = (message) => ({
  type: SET_ERROR,
  payload: message,
});

export const setLoginFailed = (message) => ({
  type: SET_USER_LOGIN_FAILED,
  payload: message,
});

export const setRegisterFailed = (message) => ({
  type: SET_USER_REGISTER_FAILED,
  payload: message,
});

export const setAuthChecked = (value) => ({
  type: SET_AUTH_CHECKED,
  payload: value,
});

export const setUser = (user) => ({
  type: SET_USER,
  payload: user,
});

export const getUser = () => {
  return async (dispatch) => {
    return api.getUser()
    .then((res) => {
      if (res && res.success) {
        dispatch(setUser(res.user));
      } else {
        dispatch(setLoginFailed(res.message));
        dispatch(logout());
      }
    })
    .catch(res => dispatch(setError(res.message)))
  }
};

export const checkUserAuth = () => {
  return (dispatch) => {
      if (localStorage.getItem("accessToken")) {
          dispatch(getUser())
            .catch(() => {
                localStorage.removeItem("accessToken");
                localStorage.removeItem("refreshToken");
                localStorage.removeItem("resetEmailSent");
                dispatch(setUser(null));
             })
            .finally(() => dispatch(setAuthChecked(true)));
      } else {
          dispatch(setAuthChecked(true));
      }
  };
};

export const login = (form) => {
  return async (dispatch) => { 
    return api.login(form)
    .then(res => {
      if (res && res.success) {
        localStorage.setItem("accessToken", res.accessToken);
        localStorage.setItem("refreshToken", res.refreshToken);
        dispatch(setUser(res.user));
        dispatch(setAuthChecked(true));
      } else {
        dispatch(setLoginFailed(res.message));
        dispatch(setAuthChecked(true));
      }
    })
    .catch(res => {
      dispatch(setError(res.message));
      dispatch(setAuthChecked(true));
    });
  }
};

export const updateUser = (form) => {
  return async (dispatch) => {
    return api.updateUser(form)
    .then((res) => {
      if (res && res.success) {
        dispatch(setUser(res.user));
        dispatch(setAuthChecked(true));
      } else {
        dispatch(setError(res.message));
        dispatch(setAuthChecked(true));
      }
    })
    .catch(res => {
      dispatch(setError(res.message));
      dispatch(setAuthChecked(true));
    })
  }
};

export const logout = () => {
  return async (dispatch) => {
    return api.logout().then(() => {
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
      dispatch(setUser(null));
      dispatch(setAuthChecked(true));
    })
    .catch(res => { 
      dispatch(setError(res.message));
      dispatch(setAuthChecked(true));
    })
  }
};

export const registerUser = (form) => {
  return async (dispatch) => {
    return api.registerUser(form)
    .then((res) => {
      if (res && res.success) {
        localStorage.setItem("accessToken", res.accessToken);
        localStorage.setItem("refreshToken", res.refreshToken);
        dispatch(setUser(res.user));
        dispatch(setAuthChecked(true));
      } else {
        dispatch(setRegisterFailed(res.message));
        dispatch(setAuthChecked(true));
      }
    })
    .catch(res => {
      dispatch(setError(res.message));
      dispatch(setAuthChecked(true));
    })
  }
};
