import { makeOrderApi } from '../../utils/burger-api';

export const MAKE_ORDER_REQUEST = 'MAKE_ORDER_REQUEST';
export const MAKE_ORDER_ERROR = 'MAKE_ORDER_ERROR';
export const MAKE_ORDER_SUCCESS = 'MAKE_ORDER_SUCCESS';
export const CLEAR_ORDER = 'CLEAR_ORDER';

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
          order: res.order.number
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

export function clearOrder() {
  return function(dispatch) {
    dispatch({
      type: CLEAR_ORDER
    })
  }
}