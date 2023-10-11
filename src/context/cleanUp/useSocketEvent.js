// useSocketEvent.js
import { useEffect } from 'react';

const useSocketEvent = (socket, event, handler) => {
  useEffect(() => {
    if (!socket) return;

    socket.on(event, handler);

    return () => {
      socket.off(event, handler);
    };
  }, [socket, event, handler]);
};

export default useSocketEvent;
