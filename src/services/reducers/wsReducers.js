import { 
  WS_CONNECTION_CLOSED, 
  WS_CONNECTION_ERROR, 
  WS_CONNECTION_SUCCESS, 
  WS_GET_MESSAGE
} from '../actions/wsActions';

const initialState = {
  wsConnected: false,
  orders: null,
  total: 0,
  totalToday: 0,
  error: ''
}

export const wsReducer = (state = initialState, action) => {
  switch(action.type) {
    case WS_CONNECTION_SUCCESS:
      return {
        ...state,
        error: '',
        wsConnected: true
      };
    case WS_CONNECTION_CLOSED:
      return {
        ...state,
        error: '',
        wsConnected: false
      };
    case WS_CONNECTION_ERROR:
      return {
        ...state,
        error: action.payload,
        wsConnected: false
      }
    case WS_GET_MESSAGE:
      return {
        ...state,
        error: '',
        orders: action.payload.orders.flatMap(order => 
          order.ingredients.some(id => id === null) ? [] : order),
        total: action.payload.total,
        totalToday: action.payload.totalToday
      }

    default:
      return state;
  }
}