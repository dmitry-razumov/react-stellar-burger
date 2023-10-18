import { baseUrl } from "./data";

const checkResponse = (res) => {
  return res.ok ? res.json() : res.json()
            .then((err) => {
                Promise.reject(`Код ошибки HTTP: ${res.status} Ошибка: ${err}`)
            });
}

const getIngredientsData = async (data, setData) => {
  try {
    setData({ ...data, isLoading: true });
    const res = await fetch(baseUrl);
    if (!res.ok) {
      setData({ ...data, isError: true, errorType: res.status});
    }
    const resultData = await checkResponse(res);
    setData({
      ...data,
      ingredientsData: resultData.data,
      isLoading: false
    });
  }
  catch (err) {
    console.log(err);
  }
}

export default getIngredientsData;