// import React, { useEffect } from 'react';
// import useCounter from './path/to/useCounter';

// const CardQuantityHandler = ({ card, onQuantityChange }) => {
//   const { count, increment, decrement } = useCounter(card?.quantity || 0);

//   // Call the onQuantityChange callback whenever count changes
//   useEffect(() => {
//     onQuantityChange(card, count);
//   }, [count, card, onQuantityChange]);

//   return (
//     <div>
//       <p>Quantity: {count}</p>
//       <button onClick={increment}>+</button>
//       <button onClick={decrement}>-</button>
//     </div>
//   );
// };

// export default CardQuantityHandler;
