import { useState, useEffect, useRef } from 'react';
// This function tries to parse JSON and provides a fallback if parsing fails
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
      // React to external changes in local storage
      const onStorageChange = (event) => {
        if (event.key === key) {
          setStoredValue(JSON.parse(event.newValue));
        }
      };

      window.addEventListener('storage', onStorageChange);
      return () => window.removeEventListener('storage', onStorageChange);
    } catch (error) {
      console.error('Listening for local storage changes failed:', error);
    }
  }, [key]);

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

      // Optionally, for cross-tab communication, you might want to trigger a storage event manually
      window.dispatchEvent(
        new Event('storage', { key, newValue: JSON.stringify(valueToStore) })
      );
    } catch (error) {
      console.error(`Error setting localStorage key "${key}":`, error);
    }
  };

  return [storedValue, setValue];
}

export default useLocalStorage;
