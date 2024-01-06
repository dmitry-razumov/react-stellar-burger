import { BASE_URL } from "./data";

export const request = async (endpoint, options) => {
  return fetch(`${BASE_URL}${endpoint}`, options)
    .then(res => res.json(), err => Promise.reject(err))
    .catch(err => Promise.reject(err))
}

export const refreshToken = async () => {
  return request('auth/token', {
    method: "POST",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
    body: JSON.stringify({
      token: localStorage.getItem("refreshToken"),
    }),
  })
};

export const requestWithRefresh = async (endpoint, options) => {
  try {
    const res = await request(endpoint, options);
    if (res.message === "jwt expired") {
      const refreshData = await refreshToken();
      if (!refreshData.success) {
        return refreshData;
      }
      localStorage.setItem("refreshToken", refreshData.refreshToken);
      localStorage.setItem("accessToken", refreshData.accessToken);
      options.headers.authorization = refreshData.accessToken;
      return await request(endpoint, options);
    }
    return res;
  } catch (err) {
    return Promise.reject(err);
  }
};
