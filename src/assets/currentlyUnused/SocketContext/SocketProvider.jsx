// import React, {
//   createContext,
//   useContext,
//   useEffect,
//   useMemo,
//   useState,
// } from 'react';
// import io from 'socket.io-client';

// const SocketContext = createContext();

// export const SocketProvider = ({ children }) => {
//   const [socket, setSocket] = useState(null);

//   useEffect(() => {
//     const socketInstance = io(
//       process.env.REACT_APP_SERVER || 'ws://localhost:3001',
//       {
//         transports: ['websocket'],
//       }
//     );
//     setSocket(socketInstance);

//     return () => {
//       socketInstance.disconnect();
//     };
//   }, []);

//   return (
//     <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>
//   );
// };

// export const useSocketContext = () => {
//   const context = useContext(SocketContext);
//   if (context === undefined) {
//     throw new Error('useSocketContext must be used within a SocketProvider');
//   }
//   return context;
// };
