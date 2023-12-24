import { BASE_URL } from "./data";
import { checkResponse, fetchWithRefresh } from "./api";


export const getIngredientsData = async () => {
  const res = await fetch(`${BASE_URL}ingredients`);
  return await checkResponse(res);
}

export const makeOrderApi = async (order) => {
  const res = await fetchWithRefresh(`${BASE_URL}orders`, {
    method: 'POST',
    headers: {
      "Content-Type": "application/json",
      Authorization: localStorage.getItem("accessToken")
    },
    body: JSON.stringify({
      'ingredients': order,
    }),
  });
  return res;
}
