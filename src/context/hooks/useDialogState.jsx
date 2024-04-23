// hooks/useDialogState.js
import { useState, useCallback } from 'react';

const useDialogState = () => {
  const [state, setState] = useState({
    isAddDeckDialogOpen: false,
    isEditDeckDialogOpen: false,
    isAddCollectionDialogOpen: false,
    isEditCollectionDialogOpen: false,
    isAuthDialogOpen: false,
    isDetailsDialogOpen: false,
    isCardDialogOpen: false,
  });
  const openDialog = useCallback((dialogName) => {
    setState((prevStates) => ({
      ...prevStates,
      [dialogName]: true,
    }));
  }, []);
  const closeDialog = useCallback((dialogName) => {
    setState((prevStates) => ({
      ...prevStates,
      [dialogName]: false,
    }));
  }, []);
  const toggleDialog = useCallback((dialogName) => {
    setState((prevState) => ({
      ...prevState,
      [dialogName]: !prevState[dialogName],
    }));
  }, []);

  return {
    dialogState: state,
    toggleDialog,
    openDialog,
    closeDialog,
    open,
    // openDialogWithData,
    // data,
  };
};

export default useDialogState;
