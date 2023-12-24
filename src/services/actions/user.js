import { api } from '../../utils/user-api';

export const SET_AUTH_CHECKED = "SET_AUTH_CHECKED";
export const SET_USER = "SET_USER";

export const setAuthChecked = (value) => ({
  type: SET_AUTH_CHECKED,
  payload: value,
});

export const setUser = (user) => ({
  type: SET_USER,
  payload: user,
});

export const getUser = () => {
  return (dispatch) => {
    return api.getUser()
    .then((res) => {
      dispatch(setUser(res.user));
    });
  };
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
  return (dispatch) => {
    return api.login(form).then((res) => {
      localStorage.setItem("accessToken", res.accessToken);
      localStorage.setItem("refreshToken", res.refreshToken);
      dispatch(setUser(res.user));
      dispatch(setAuthChecked(true));
    });
  };
};

export const updateUser = (form) => {
  return (dispatch) => {
    return api.updateUser(form).then((res) => {
      dispatch(setUser(res.user));
      dispatch(setAuthChecked(true));
    });
  };
};

export const logout = () => {
  return (dispatch) => {
    return api.logout().then(() => {
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
      dispatch(setUser(null));
      dispatch(setAuthChecked(true));
    });
  };
};

export const registerUser = (form) => {
  return (dispatch) => {
    return api.registerUser(form).then((res) => {
      localStorage.setItem("accessToken", res.accessToken);
      localStorage.setItem("refreshToken", res.refreshToken);
      dispatch(setUser(res.user));
      dispatch(setAuthChecked(true));
    });
  };
};
