import { IMakeOrderResponse, IGetOrdersResponse, TCustomHeaders, IIngredientResponse, IOptions } from "../services/types/api";
import { request, requestWithRefresh } from "./api";

export const getIngredientsData = async () => {
  return request<IIngredientResponse, IOptions>('ingredients')
}

export const makeOrderApi = async (order: ReadonlyArray<string>) => {
  return requestWithRefresh<IMakeOrderResponse>('orders', {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
        Authorization: localStorage.getItem("accessToken")
      } as TCustomHeaders,
      body: JSON.stringify({
        'ingredients': order,
      }),
    });
}

export const getOrderApi = async (number: number) => {
  return requestWithRefresh<IGetOrdersResponse>(`orders/${number}`, {
      method: 'GET',
      headers: {
        "Content-Type": "application/json",
        Authorization: localStorage.getItem("accessToken")
      } as TCustomHeaders,
    });
}
