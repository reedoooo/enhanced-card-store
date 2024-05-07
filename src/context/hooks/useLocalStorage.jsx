import { useState, useEffect, useRef } from 'react';
function safeJsonParse(value) {
  try {
    return value ? JSON.parse(value) : null;
  } catch (e) {
    console.error('Error reading localStorage key:', e);
    return null;
  }
}
function useLocalStorage(key, initialValue) {
  const [storedValue, setStoredValue] = useState(() => {
    if (typeof window === 'undefined') {
      return initialValue;
    }

    try {
      const item = window.localStorage.getItem(key);

      return item ? safeJsonParse(item) : initialValue;
    } catch (error) {
      console.error(`Error reading localStorage key "${key}":`, error);
      return initialValue;
    }
  });

  const isMounted = useRef(false);

  useEffect(() => {
    // Skip the initial effect run on mount
    if (!isMounted.current) {
      isMounted.current = true;
      return;
    }

    try {
      const onStorageChange = (event) => {
        if (event.key === key) {
          setStoredValue(
            event.newValue ? JSON.parse(event.newValue) : initialValue
          );
        }
      };

      window.addEventListener('storage', onStorageChange);
      return () => window.removeEventListener('storage', onStorageChange);
    } catch (error) {
      console.error('Listening for local storage changes failed:', error);
    }
  }, [key, initialValue]);

  // Set value to localStorage and update local state
  const setValue = (value) => {
    if (typeof window == 'undefined') {
      console.warn(
        `Tried setting localStorage key "${key}" even though environment is not a client`
      );
      return;
    }

    try {
      const valueToStore =
        value instanceof Function ? value(storedValue) : value;

      // window.localStorage.setItem(key, JSON.stringify(valueToStore));
      setStoredValue(valueToStore);
      window.localStorage.setItem(key, JSON.stringify(valueToStore));
      const storageEvent = new StorageEvent('storage', {
        key: key,
        newValue: JSON.stringify(valueToStore),
        oldValue: window.localStorage.getItem(key),
        storageArea: localStorage,
        url: window.location.href,
      });
      window.dispatchEvent(storageEvent);
    } catch (error) {
      console.error(`Error setting localStorage key "${key}":`, error);
    }
  };

  return [storedValue, setValue];
}

export default useLocalStorage;
