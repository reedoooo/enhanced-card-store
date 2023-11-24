// import { useEffect } from 'react';
// import { useLocation } from 'react-router-dom';
// import useAppContext from './useAppContext';

// const useUpdateAppContext = () => {
//   const location = useLocation();
//   const { setContext } = useAppContext(); // Destructuring from object

//   useEffect(() => {
//     switch (location.pathname) {
//       case '/deckbuilder':
//         setContext('Deck');
//         break;
//       case '/collection':
//         setContext('Collection');
//         break;
//       case '/cart':
//         setContext('Cart');
//         break;
//       default:
//         setContext('Home');
//         break;
//     }
//   }, [location, setContext]);

//   return null;
// };

// export default useUpdateAppContext;
