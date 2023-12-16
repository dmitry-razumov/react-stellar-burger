import { BASE_URL } from "./data";

const checkResponse = (res) => {
  return res.ok ? res.json() : res.json().then((err) => {
        Promise.reject(`Код ошибки HTTP: ${res.status} Ошибка: ${err}`);
        });
}

export const getIngredientsData = async () => {
  const res = await fetch(`${BASE_URL}ingredients`);
  return await checkResponse(res);
}

export const makeOrderApi = async (order) => {
  const res = await fetch(`${BASE_URL}orders`, {
    method: 'POST',
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      'ingredients': order,
    }),
  });
  return await checkResponse(res);
}