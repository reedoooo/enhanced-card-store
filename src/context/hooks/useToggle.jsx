import { useState, useCallback } from 'react';

const useToggle = (initialValue = false) => {
  const [value, setValue] = useState(initialValue);

  const toggle = useCallback(() => {
    setValue((currentValue) => !currentValue);
  }, []);

  return [value, toggle];
};

export default useToggle;
