export const socketMiddleware = (wsUrl, wsActions) => {
  return store => {
    let socket = null;

    return next => action => {
      const { dispatch } = store;
      const { type, payload } = action;
      const { wsInit, wsSendMessage, wsStop, onOpen, onClose, onError, onMessage } = wsActions;
      
      if (type === wsInit) {
        socket = new WebSocket(`${wsUrl}${payload}`)
      }

      if (socket) {
        socket.onopen = event => {
          dispatch({ type: onOpen, payload: event });
        };

        socket.onerror = event => {
          dispatch({ type: onError, payload: event });
        };

        socket.onmessage = event => {
          const { data } = event;
          const parsedData = JSON.parse(data);
          const { success, ...restParsedData } = parsedData;

          dispatch({ type: onMessage,
             payload: restParsedData });
        };

        socket.onclose = event => {
          dispatch({ type: onClose, payload: event });
        };

        if (type === wsSendMessage) {
          const message = { ...payload};
          socket.send(JSON.stringify(message));
        }

        if (type === wsStop && socket.readyState === 1) {
          socket.close(1000, "работа закончена по умолчанию - нормальное закрытие");
          socket = null;
        }
      }

      next(action);
    };
  };
};