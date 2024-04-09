import { useState, useCallback, useEffect } from 'react';

const useSelectedContext = () => {
  const [selectedContext, setSelectedContext] = useState(null);
  const [isContextSelected, setIsContextSelected] = useState(false);

  const setContext = useCallback((newContext) => {
    console.log('Context selected:', newContext);
    setSelectedContext(newContext);
  }, []);

  // Method to clear the context
  const clearContext = useCallback(() => {
    setSelectedContext(null);
  }, []);

  return {
    selectedContext,
    setContext,
    isContextSelected,
    setIsContextSelected,
    clearContext,
  };
};

export default useSelectedContext;
