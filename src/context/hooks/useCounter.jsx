import { useState, useEffect } from 'react';

const useCounter = (card, context, options = {}) => {
  const { min, max } = options;

  // Initialize state with a key for each context
  const [counts, setCounts] = useState({
    [context]: card?.quantity,
  });

  // Update count for the specific context if card.quantity changes externally
  useEffect(() => {
    setCounts((prevCounts) => ({
      ...prevCounts,
      [context]: card?.quantity,
    }));
  }, [card?.quantity, context]);

  const increment = () => {
    setCounts((prevCounts) => ({
      ...prevCounts,
      [context]:
        max !== undefined
          ? Math.min(prevCounts[context] + 1, max)
          : prevCounts[context] + 1,
    }));
  };

  const decrement = () => {
    setCounts((prevCounts) => ({
      ...prevCounts,
      [context]:
        min !== undefined
          ? Math.max(prevCounts[context] - 1, min)
          : prevCounts[context] - 1,
    }));
  };

  const set = (value) => {
    if (
      (min !== undefined && value < min) ||
      (max !== undefined && value > max)
    ) {
      throw new Error('Value is outside the specified limits');
    }
    setCounts((prevCounts) => ({
      ...prevCounts,
      [context]: value,
    }));
  };

  const reset = () => {
    setCounts((prevCounts) => ({
      ...prevCounts,
      [context]: card.quantity,
    }));
  };

  return {
    count: counts[context],
    increment,
    decrement,
    set,
    reset,
  };
};

export default useCounter;
