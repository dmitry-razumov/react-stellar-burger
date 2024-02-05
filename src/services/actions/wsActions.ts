import { TOrder, TSendOrder } from "../types/data";

export const WS_CONNECTION_START: 'WS_CONNECTION_START' = 'WS_CONNECTION_START';
export const WS_CONNECTION_STOP: 'WS_CONNECTION_STOP' = 'WS_CONNECTION_STOP';
export const WS_CONNECTION_SUCCESS: 'WS_CONNECTION_SUCCESS' = 'WS_CONNECTION_SUCCESS';
export const WS_CONNECTION_ERROR: 'WS_CONNECTION_ERROR' = 'WS_CONNECTION_ERROR';
export const WS_CONNECTION_CLOSED: 'WS_CONNECTION_CLOSED' = 'WS_CONNECTION_CLOSED';
export const WS_GET_MESSAGE: 'WS_GET_MESSAGE' = 'WS_GET_MESSAGE';
export const WS_SEND_MESSAGE: 'WS_SEND_MESSAGE' = 'WS_SEND_MESSAGE';

export const wsUrl = 'wss://norma.nomoreparties.space/orders';

export type TWsSocketMiddlwareActions = {
  readonly wsInit: typeof WS_CONNECTION_START;
  readonly wsStop: typeof WS_CONNECTION_STOP;
  readonly wsSendMessage: typeof WS_SEND_MESSAGE;
  readonly onOpen: typeof WS_CONNECTION_SUCCESS;
  readonly onClose: typeof WS_CONNECTION_CLOSED;
  readonly onError: typeof WS_CONNECTION_ERROR;
  readonly onMessage: typeof WS_GET_MESSAGE;
}

export const wsActions: TWsSocketMiddlwareActions = {
  wsInit: WS_CONNECTION_START,
  wsStop: WS_CONNECTION_STOP,
  wsSendMessage: WS_SEND_MESSAGE,
  onOpen: WS_CONNECTION_SUCCESS,
  onClose: WS_CONNECTION_CLOSED,
  onError: WS_CONNECTION_ERROR,
  onMessage: WS_GET_MESSAGE
};

export interface IStartWSConnect {
  readonly type: typeof WS_CONNECTION_START;
  payload: string;
}

export interface IStopWSConnect {
  readonly type: typeof WS_CONNECTION_STOP;
  payload?: {
    code: number;
    reason: string;
  }
}

export interface IWsConnectionSuccess {
  type: typeof WS_CONNECTION_SUCCESS;
  payload?: Event;
}

export interface IWsConnectionError {
  type: typeof WS_CONNECTION_ERROR;
  payload?: Event;
}

export interface IWsConnectionClosed {
  type: typeof WS_CONNECTION_CLOSED;
  payload?: Event;
}

export interface IWsGetMessage {
  type: typeof WS_GET_MESSAGE;
  payload: {
    orders: ReadonlyArray<TOrder>;
    total: number;
    totalToday: number;
  }
}

export interface IWsSendMessage {
  type: typeof WS_SEND_MESSAGE;
  payload: TSendOrder;
}

export type TWsActions = IStartWSConnect
                      | IStopWSConnect
                      | IWsConnectionSuccess
                      | IWsConnectionError
                      | IWsConnectionClosed
                      | IWsGetMessage  
                      | IWsSendMessage

export const startWsConnect = (endpoint: string):IStartWSConnect => {
  return {
    type: WS_CONNECTION_START,
    payload: endpoint
  }
}

export const stopWsConnect = ():IStopWSConnect => {
  return {
    type: WS_CONNECTION_STOP
  }
}

export const wsConnectionSuccess = ():IWsConnectionSuccess => {
  return {
    type: WS_CONNECTION_SUCCESS
  };
};

export const wsConnectionError = ():IWsConnectionError => {
  return {
    type: WS_CONNECTION_ERROR
  };
};

export const wsConnectionClosed = ():IWsConnectionClosed => {
  return {
    type: WS_CONNECTION_CLOSED
  };
};

export const wsGetMessage = (message: {orders:ReadonlyArray<TOrder>, total:number, totalToday: number}):IWsGetMessage => {
  return {
    type: WS_GET_MESSAGE,
    payload: message
  };
};

export const wsSendMessage = (message: TSendOrder):IWsSendMessage => {
  return {
    type: WS_SEND_MESSAGE,
    payload: message
  };
};
