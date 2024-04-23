// useLocalStorageManager.js
import { useCallback } from 'react';
import useLocalStorage from './useLocalStorage';

export const useLocalStorageManager = (key, defaultValue) => {
  const [data, setData] = useLocalStorage(key, defaultValue);

  const modifyData = useCallback(
    (modifyFn) => {
      setData((prevData) => {
        const updatedData = modifyFn({ ...prevData });
        return updatedData;
      });
    },
    [setData]
  );

  return [data, modifyData];
};
