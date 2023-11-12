import {
  MAKE_ORDER_REQUEST,
  MAKE_ORDER_ERROR,
  MAKE_ORDER_SUCCESS,
  CLEAR_ORDER
} from '../actions/order'

const initialState = {
  orderRequest: false,
  orderFailed: false,
  order: null
}

export const orderReducer = (state = initialState, action) => {
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
    default:
      return state
  }
}