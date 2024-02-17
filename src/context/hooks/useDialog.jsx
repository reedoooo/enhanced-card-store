import { useState, useCallback } from 'react';
import useSnackBar from './useSnackBar';

const useDialog = () => {
  const [dialogOpenStates, setDialogOpenStates] = useState({});
  const { handleSnackBar } = useSnackBar(); // Destructure handleSnackBar from useSnackBar hook

  // Toggle the state of the dialog and display snack bar message
  const toggleDialogState = useCallback(
    (dialogName, isOpen) => {
      setDialogOpenStates((prevStates) => ({
        ...prevStates,
        [dialogName]: isOpen,
      }));
      const action = isOpen ? 'opened' : 'closed';
      handleSnackBar(`${dialogName} Dialog ${action}`, {
        variant: 'info',
        duration: 6000,
      }); // Use enqueueSnackbar to show a snackbar
    },
    [handleSnackBar]
  );

  const openDialog = useCallback(
    (dialogName) => {
      toggleDialogState(dialogName, true);
    },
    [toggleDialogState]
  );

  const closeDialog = useCallback(
    (dialogName) => {
      toggleDialogState(dialogName, false);
    },
    [toggleDialogState]
  );

  // Function to check if a specific dialog is open
  const isDialogOpen = (dialogName) => !!dialogOpenStates[dialogName];

  return { openDialog, closeDialog, isDialogOpen };
};

export default useDialog;
