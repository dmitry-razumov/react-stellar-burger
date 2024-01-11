export const WS_CONNECTION_START = 'WS_CONNECTION_START';
export const WS_CONNECTION_STOP = 'WS_CONNECTION_STOP';
export const WS_CONNECTION_SUCCESS = 'WS_CONNECTION_SUCCESS';
export const WS_CONNECTION_ERROR = 'WS_CONNECTION_ERROR';
export const WS_CONNECTION_CLOSED = 'WS_CONNECTION_CLOSED';
export const WS_GET_MESSAGE = 'WS_GET_MESSAGE';
export const WS_SEND_MESSAGE = 'WS_SEND_MESSAGE';

export const wsUrl = 'wss://norma.nomoreparties.space/orders';

export const wsActions = {
  wsInit: WS_CONNECTION_START,
  wsStop: WS_CONNECTION_STOP,
  wsSendMessage: WS_SEND_MESSAGE,
  onOpen: WS_CONNECTION_SUCCESS,
  onClose: WS_CONNECTION_CLOSED,
  onError: WS_CONNECTION_ERROR,
  onMessage: WS_GET_MESSAGE
};

export const startWsConnect = (endpoint) => {
  return {
    type: WS_CONNECTION_START,
    payload: endpoint
  }
}

export const stopWsConnect = () => {
  return {
    type: WS_CONNECTION_STOP
  }
}

export const wsConnectionSuccess = () => {
  return {
    type: WS_CONNECTION_SUCCESS
  };
};

export const wsConnectionError = () => {
  return {
    type: WS_CONNECTION_ERROR
  };
};

export const wsConnectionClosed = () => {
  return {
    type: WS_CONNECTION_CLOSED
  };
};

export const wsGetMessage = message => {
  return {
    type: WS_GET_MESSAGE,
    payload: message
  };
};

export const wsSendMessage = message => {
  return {
    type: WS_SEND_MESSAGE,
    payload: message
  };
};
