import { makeOrderApi, getOrderApi } from '../../utils/burger-api';
import { AppDispatch, AppThunk } from '../types';
import { TOrder } from '../types/data';
import { CLEAR_CONSTRUCTOR, IClearConstructor } from './burger'

export const MAKE_ORDER_REQUEST: 'MAKE_ORDER_REQUEST' = 'MAKE_ORDER_REQUEST';
export const MAKE_ORDER_ERROR: 'MAKE_ORDER_ERROR' = 'MAKE_ORDER_ERROR';
export const MAKE_ORDER_SUCCESS: 'MAKE_ORDER_SUCCESS' = 'MAKE_ORDER_SUCCESS';
export const CLEAR_ORDER: 'CLEAR_ORDER' = 'CLEAR_ORDER';
export const GET_ORDER_SUCCESS: 'GET_ORDER_SUCCESS' = 'GET_ORDER_SUCCESS';

export interface IMakeOrderAction {
  readonly type: typeof MAKE_ORDER_REQUEST;
}

export interface IMakeOrderFailedAction {
  readonly type: typeof MAKE_ORDER_ERROR; 
}

export interface IMakeOrderSuccesAction {
  readonly type: typeof MAKE_ORDER_SUCCESS,
  readonly order: TOrder
}

export interface IClearOrderAction {
  readonly type: typeof CLEAR_ORDER;
}

export interface IGetOrderSuccessAction {
  readonly type: typeof GET_ORDER_SUCCESS,
  readonly order: TOrder
}

export type TOrderActions = IMakeOrderAction | IMakeOrderFailedAction | IMakeOrderSuccesAction | IClearOrderAction | IGetOrderSuccessAction;

export const makeOrderAction = ():IMakeOrderAction => ({
  type: MAKE_ORDER_REQUEST
});

export const makeOrderFailedAction = ():IMakeOrderFailedAction => ({
  type: MAKE_ORDER_ERROR
});

export const makeOrderSuccessAction = (order:TOrder):IMakeOrderSuccesAction => ({
  type: MAKE_ORDER_SUCCESS,
  order
});

export const clearConstructor = ():IClearConstructor => ({
  type: CLEAR_CONSTRUCTOR
})

export const makeOrder: AppThunk = (order:ReadonlyArray<string>) => (dispatch: AppDispatch) => {
  dispatch(makeOrderAction());
  makeOrderApi(order)
  .then(res => {
    if (res && res.success) {
      dispatch(makeOrderSuccessAction(res.order));
    } else {
      dispatch(makeOrderFailedAction());
    }
  })
  .then(() => {
    dispatch(clearConstructor())
  })
  .catch(() => dispatch(makeOrderFailedAction()))
};

export const clearOrderAction = ():IClearOrderAction => ({
  type: CLEAR_ORDER
});

export const clearOrder: AppThunk = () => (dispatch: AppDispatch) => {
  dispatch(clearOrderAction());
}

export const getOrderSuccessAction = (order:TOrder):IGetOrderSuccessAction => ({
  type: GET_ORDER_SUCCESS,
  order
});

export const getOrder: AppThunk = (orderNumber:number) => (dispatch: AppDispatch) => {
  dispatch(makeOrderAction());
  getOrderApi(orderNumber)
  .then(res => {
    if (res && res.success) {
      dispatch(getOrderSuccessAction(res.orders[0]));
    } else {
      dispatch(makeOrderFailedAction());
    }
  })
  .catch(() => dispatch(makeOrderFailedAction()))
};
