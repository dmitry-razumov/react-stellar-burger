import { makeOrderApi, getOrderApi } from '../../utils/burger-api';
import { CLEAR_CONSTRUCTOR } from './burger'

export const MAKE_ORDER_REQUEST = 'MAKE_ORDER_REQUEST';
export const MAKE_ORDER_ERROR = 'MAKE_ORDER_ERROR';
export const MAKE_ORDER_SUCCESS = 'MAKE_ORDER_SUCCESS';
export const CLEAR_ORDER = 'CLEAR_ORDER';
export const GET_ORDER_SUCCESS = 'GET_ORDER_SUCCESS';

export function makeOrder(order) {
  return function(dispatch) {
    dispatch({
      type: MAKE_ORDER_REQUEST
    })

    makeOrderApi(order)
    .then(res => {
      if (res && res.success) {
        dispatch({
          type: MAKE_ORDER_SUCCESS,
          order: res.order
        })
      } else {
        dispatch({
          type: MAKE_ORDER_ERROR
        })
      }})
    .then(() => {
      dispatch({
        type: CLEAR_CONSTRUCTOR
      })
    })
    .catch(() => {
      dispatch({
        type: MAKE_ORDER_ERROR
      })
    })
  }
}

export function clearOrder() {
  return function(dispatch) {
    dispatch({
      type: CLEAR_ORDER
    })
  }
}

export function getOrder(number) {
  return function(dispatch) {
    dispatch({
      type: MAKE_ORDER_REQUEST
    })

    getOrderApi(number)
    .then(res => {
      if (res && res.success) {
        dispatch({
          type: GET_ORDER_SUCCESS,
          order: res.orders[0]
        })
      } else {
        dispatch({
          type: MAKE_ORDER_ERROR
        })
      }})
    .catch(() => {
      dispatch({
        type: MAKE_ORDER_ERROR
      })
    })
  }
}