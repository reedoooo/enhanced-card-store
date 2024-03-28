import { useState, useCallback } from 'react';

const useSet = (initialValues = []) => {
  const [set, setSet] = useState(new Set(initialValues));

  const add = useCallback((value) => {
    setSet((prevSet) => new Set(prevSet).add(value));
  }, []);

  const clear = useCallback(() => {
    setSet(new Set());
  }, []);

  const remove = useCallback((value) => {
    setSet((prevSet) => {
      const newSet = new Set(prevSet);
      newSet.delete(value);
      return newSet;
    });
  }, []);

  return { set, add, clear, remove };
};

export default useSet;
