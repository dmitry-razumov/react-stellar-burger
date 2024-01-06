import { request, requestWithRefresh } from "./api";

export const getUser = async () => {
  return requestWithRefresh('auth/user', {
    method: 'GET',
    headers: { 
      "Content-Type": "application/json",
      Authorization: localStorage.getItem("accessToken")
    }
  });
}

export const login = async (form) => {
  return request('auth/login', {
    method: 'POST',
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      'email': form.email,
      'password': form.password,
    }),
  });
}

export const logout = async () => {
  return request('auth/logout', {
    method: 'POST',
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      token: localStorage.getItem("refreshToken"),
    }),
  });
}

export const updateUser = async (form) => {
  return requestWithRefresh('auth/user', {
    method: 'PATCH',
    headers: { 
      "Content-Type": "application/json",
      Authorization: localStorage.getItem("accessToken")
    },
    body: JSON.stringify({
      'email': form.email,
      'password': form.password,
      'name': form.name
    }),
  });
}

export const registerUser = async (form) => {
  return request('auth/register', {
    method: 'POST',
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      'email': form.email,
      'password': form.password,
      'name': form.name
    }),
  });
}

export const sendResetEmail = async (form) => {
  request('password-reset', {
    method: 'POST',
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      'email': form.email,
    }),
  });
}

export const resetPassword = async (form) => {
  request('password-reset/reset', {
    method: 'POST',
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      'password': form.password,
      'token': form.code
    }),
  });
}

export const api = {
  getUser,
  updateUser,
  registerUser,
  login,
  logout
};