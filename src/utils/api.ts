import { IOptions, IResponse } from "../services/types/api";
import { BASE_URL } from "./data";

export const request = async  <T extends Response, RI extends RequestInit>(endpoint: string, options: RI | object = {}): Promise<T> => {
  return fetch(`${BASE_URL}${endpoint}`, options)
    .then(res => res.json(), err => Promise.reject(err))
    .catch(err => Promise.reject(err))
}

export const refreshToken = async () => {
  return request<IResponse, IOptions>('auth/token', {
    method: "POST",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
    body: JSON.stringify({
      token: localStorage.getItem("refreshToken"),
    }),
  })
};

export const requestWithRefresh = async <T extends IResponse>(endpoint:string, options:IOptions): Promise<T> => {
  try {
    const res = await request<T, IOptions>(endpoint, options);
    if (res.message === "jwt expired") {
      const refreshData = await refreshToken();
      if (!refreshData.success) {
        return Promise.reject(refreshData);
      }
      localStorage.setItem("refreshToken", refreshData.refreshToken);
      localStorage.setItem("accessToken", refreshData.accessToken);
      options.headers.authorization = refreshData.accessToken;
      return await request<T, IOptions>(endpoint, options);
    }
    return res;
  } catch (err) {
    return Promise.reject(err);
  }
};
