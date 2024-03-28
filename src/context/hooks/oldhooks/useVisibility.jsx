import { useState, useCallback } from 'react';

export const useVisibility = () => {
  const [isCollectionVisible, setCollectionVisibility] = useState(false);
  const [dialogStates, setDialogStates] = useState({
    isAddCollectionDialogOpen: false,
    isSelectionErrorDialogOpen: false,
  });

  const toggleCollectionVisibility = useCallback(() => {
    setCollectionVisibility((isVisible) => !!isVisible);
  }, []);

  const toggleDialog = useCallback((dialogName) => {
    setDialogStates((prevState) => ({
      ...prevState,
      [dialogName]: !prevState[dialogName],
    }));
  }, []);

  return {
    isCollectionVisible,
    toggleCollectionVisibility,
    dialogStates,
    toggleDialog,
  };
};
