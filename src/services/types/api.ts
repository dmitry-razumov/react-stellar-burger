import { TIngredient, TOrder, TUser } from "./data";

export interface IResponse extends Response {
  success: boolean;
  refreshToken: string;
  accessToken: string;
  message: string;
}

export type TCustomHeaders = HeadersInit & {
  authorization?: string | null;
}

export interface IOptions extends RequestInit {
  headers: TCustomHeaders;
}

export interface IError extends Error {
  message: string;
}

export interface IUserResponse extends IResponse {
  user: TUser;
}

export interface IIngredientResponse extends IResponse {
  data: Array<TIngredient>
}

export interface IMakeOrderResponse extends IResponse {
  order: TOrder
}

export interface IGetOrdersResponse extends IResponse {
  orders: Array<TOrder>
}
