import { baseUrl } from "./data";

const checkResponse = (res) => {
  return res.ok ? res.json() : res.json().then((err) => {
        Promise.reject(`Код ошибки HTTP: ${res.status} Ошибка: ${err}`);
        });
}

export const getIngredientsData = async () => {
  const res = await fetch(baseUrl);
  return await checkResponse(res);
}
