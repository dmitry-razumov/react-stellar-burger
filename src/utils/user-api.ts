import { IOptions, IUserResponse, TCustomHeaders } from "../services/types/api";
import { TUserForm } from "../services/types/data";
import { request, requestWithRefresh } from "./api";

export const getUser = async () => {
  return requestWithRefresh<IUserResponse>('auth/user', {
    method: 'GET',
    headers: { 
      "Content-Type": "application/json",
      Authorization: localStorage.getItem("accessToken")
    } as TCustomHeaders
  });
}

export const login = async (form: TUserForm) => {
  return request<IUserResponse, IOptions>('auth/login', {
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

export const updateUser = async (form: TUserForm) => {
  return requestWithRefresh<IUserResponse>('auth/user', {
    method: 'PATCH',
    headers: { 
      "Content-Type": "application/json",
      Authorization: localStorage.getItem("accessToken")
    } as TCustomHeaders,
    body: JSON.stringify({
      'email': form.email,
      'password': form.password,
      'name': form.name
    }),
  });
}

export const registerUser = async (form: TUserForm) => {
  return request<IUserResponse, IOptions>('auth/register', {
    method: 'POST',
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      'email': form.email,
      'password': form.password,
      'name': form.name
    }),
  });
}

export const sendResetEmail = async (value:{[name: string]: string}) => {
  request<IUserResponse, IOptions>('password-reset', {
    method: 'POST',
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      'email': value.email,
    }),
  });
}

export const resetPassword = async (value:{[name: string]: string}) => {
  request<IUserResponse, IOptions>('password-reset/reset', {
    method: 'POST',
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      'password': value.password,
      'token': value.code
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