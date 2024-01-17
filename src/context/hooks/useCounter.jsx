import { useState } from 'react';

const useCounter = (initialValue = 0, options = {}) => {
  const { min, max } = options;

  // Throw an error if initialValue is outside the specified limits
  if (
    (min !== undefined && initialValue < min) ||
    (max !== undefined && initialValue > max)
  ) {
    throw new Error('Initial value is outside the specified limits');
  }

  const [count, setCount] = useState(initialValue);

  const increment = () => {
    setCount((prevCount) =>
      max !== undefined ? Math.min(prevCount + 1, max) : prevCount + 1
    );
  };

  const decrement = () => {
    setCount((prevCount) =>
      min !== undefined ? Math.max(prevCount - 1, min) : prevCount - 1
    );
  };

  const set = (value) => {
    if (
      (min !== undefined && value < min) ||
      (max !== undefined && value > max)
    ) {
      throw new Error('Value is outside the specified limits');
    }
    setCount(value);
  };

  const reset = () => {
    setCount(initialValue);
  };

  return { count, increment, decrement, set, reset };
};

export default useCounter;
