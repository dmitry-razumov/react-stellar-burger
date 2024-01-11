import { request, requestWithRefresh } from "./api";

export const getIngredientsData = async () => {
  return request('ingredients')
}

export const makeOrderApi = async (order) => {
  return requestWithRefresh('orders', {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
        Authorization: localStorage.getItem("accessToken")
      },
      body: JSON.stringify({
        'ingredients': order,
      }),
    });
}

export const getOrderApi = async (number) => {
  return requestWithRefresh(`orders/${number}`, {
      method: 'GET',
      headers: {
        "Content-Type": "application/json",
        Authorization: localStorage.getItem("accessToken")
      },
    });
}
