import { BASE_URL } from "./data";
import { checkResponse, fetchWithRefresh } from "./api";

export const getUser = async () => {
  const res = await fetchWithRefresh(`${BASE_URL}auth/user`, {
    method: 'GET',
    headers: { 
      "Content-Type": "application/json",
      Authorization: localStorage.getItem("accessToken")
    }
  });
  return res;
}

export const login = async (form) => {
  const res = await fetch(`${BASE_URL}auth/login`, {
    method: 'POST',
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      'email': form.email,
      'password': form.password,
    }),
  });
  return await checkResponse(res);
}

export const logout = async () => {
  const res = await fetch(`${BASE_URL}auth/logout`, {
    method: 'POST',
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      token: localStorage.getItem("refreshToken"),
    }),
  });
  return await checkResponse(res);
}

export const updateUser = async (form) => {
  const res = await fetchWithRefresh(`${BASE_URL}auth/user`, {
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
  return res;
}

export const registerUser = async (form) => {
  const res = await fetch(`${BASE_URL}auth/register`, {
    method: 'POST',
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      'email': form.email,
      'password': form.password,
      'name': form.name
    }),
  });
  return await checkResponse(res);
}

export const sendResetEmail = async (email) => {
  const res = await fetch(`${BASE_URL}password-reset`, {
    method: 'POST',
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      'email': email,
    }),
  });
  return await checkResponse(res);
}

export const resetPassword = async (form) => {
  const res = await fetch(`${BASE_URL}password-reset/reset`, {
    method: 'POST',
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      'password': form.password,
      'token': form.code
    }),
  });
  return await checkResponse(res);
}

export const api = {
  getUser,
  updateUser,
  registerUser,
  login,
  logout
};