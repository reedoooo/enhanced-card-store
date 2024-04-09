// hooks/useDialogState.js
import { useState, useCallback } from 'react';

const useDialogState = (
  initialState = {
    isAddDeckDialogOpen: false,
    isEditDeckDialogOpen: false,
    isAddCollectionDialogOpen: false,
    isEditCollectionDialogOpen: false,
    isAuthDialogOpen: false,
  }
) => {
  const [state, setState] = useState(initialState);

  const toggleDialog = useCallback((dialogName) => {
    setState((prevState) => ({
      ...prevState,
      [dialogName]: !prevState[dialogName],
    }));
  }, []);

  const openDialog = useCallback((dialogName) => {
    setState((prevState) => ({
      ...prevState,
      [dialogName]: true,
    }));
  }, []);

  const closeDialog = useCallback((dialogName) => {
    setState((prevState) => ({
      ...prevState,
      [dialogName]: false,
    }));
  }, []);

  return { dialogState: state, toggleDialog, openDialog, closeDialog };
};

export default useDialogState;
