import { useEffect, useMemo, useState } from 'react';
import io from 'socket.io-client';

const getSocketURL = () =>
  process.env.REACT_APP_SERVER || 'ws://localhost:3001';

const useSocket = (eventListeners = []) => {
  const [socket, setSocket] = useState(null);

  const socketInstance = useMemo(
    () => io(getSocketURL(), { transports: ['websocket'] }),
    []
  );

  useEffect(() => {
    setSocket(socketInstance);
    return () => {
      socketInstance.disconnect();
    };
  }, [socketInstance]);

  useEffect(() => {
    if (!socket) return;

    eventListeners.forEach(({ event, handler }) => {
      socket.on(event, handler);
    });

    return () => {
      eventListeners.forEach(({ event, handler }) => {
        socket.off(event, handler);
      });
    };
  }, [socket, eventListeners]);

  return socket;
};

export default useSocket;
