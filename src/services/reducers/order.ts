import type { TOrderActions } from '../actions/order'

import {
  MAKE_ORDER_REQUEST,
  MAKE_ORDER_ERROR,
  MAKE_ORDER_SUCCESS,
  CLEAR_ORDER,
  GET_ORDER_SUCCESS
} from '../actions/order'

import { TOrder } from '../types/data'

type TOrderState = {
  orderRequest: boolean,
  orderFailed: boolean,
  order: TOrder | null
}

const orderInitialState: TOrderState = {
  orderRequest: false,
  orderFailed: false,
  order: null
}

export const orderReducer = (state = orderInitialState, action: TOrderActions):TOrderState => {
  switch (action.type) {
    case MAKE_ORDER_REQUEST:
      return {
        ...state,
        orderRequest: true,
        orderFailed: false
      }
    case MAKE_ORDER_SUCCESS:
      return {
        ...state,
        orderRequest: false,
        orderFailed: false,
        order: action.order
      }
    case MAKE_ORDER_ERROR: 
      return {
        ...state,
        orderRequest: false,
        orderFailed: true
      }
    case CLEAR_ORDER:
      return {
        ...state,
        order: null
      }
    case GET_ORDER_SUCCESS:
      return {
        ...state,
        orderRequest: false,
        orderFailed: false,
        order: action.order
      }
    default:
      return state
  }
}