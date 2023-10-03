import { useEffect } from 'react';

export const useSocketManager = (socket, eventHandlers) => {
  useEffect(() => {
    eventHandlers.forEach(({ event, handler }) => {
      socket.on(event, handler);
    });

    return () => {
      eventHandlers.forEach(({ event, handler }) => {
        socket.off(event, handler);
      });
      socket.disconnect();
    };
  }, [socket, eventHandlers]);
};
