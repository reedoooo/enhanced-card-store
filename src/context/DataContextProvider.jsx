import React, {
  createContext,
  useContext,
  useRef,
  useEffect,
  useState,
} from 'react';

const StoreContext = createContext(null);

const useData = () => {
  const store = useRef({});
  const subscribers = useRef(new Set());

  const set = (value) => {
    store.current = { ...store.current, ...value };
    subscribers.current.forEach((subscriber) => {
      const { callback, selector } = subscriber;
      const selectedValue = selector(store.current);
      callback(selectedValue);
    });
  };

  const subscribe = (callback, selector) => {
    const subscriber = { callback, selector };
    const selectedValue = selector(store.current);
    subscribers.current.add(subscriber);
    callback(selectedValue); // Initialize the subscriber with the current selected value

    return () => subscribers.current.delete(subscriber);
  };

  return { set, subscribe };
};

export const DataProvider = ({ children }) => {
  const store = useData();

  return (
    <StoreContext.Provider value={store}>{children}</StoreContext.Provider>
  );
};

export const useDataContext = () => {
  return useContext(StoreContext);
};
export const useStore = (selector) => {
  const { subscribe, set } = useContext(StoreContext);
  if (!subscribe || !set) {
    throw new Error('useStore must be used within a StoreProvider');
  }

  // Initial state is now fetched from the subscribe function inside a useEffect hook
  // to ensure it uses the most up-to-date store reference
  const [selectedState, setSelectedState] = useState();

  useEffect(() => {
    const callback = (newSelectedState) => {
      setSelectedState(newSelectedState);
    };
    // Subscribe and get unsubscribe function for cleanup
    const unsubscribe = subscribe(callback, selector);

    // Cleanup function to unsubscribe
    return unsubscribe;
  }, [subscribe, selector]);

  return [selectedState, set];
};
