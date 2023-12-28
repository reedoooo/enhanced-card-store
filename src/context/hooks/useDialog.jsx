// useDialog.js
import { useState, useCallback } from 'react';

const useDialog = (handleSnackBar, onClose) => {
  const [isOpen, setIsOpen] = useState(false);

  const openDialog = useCallback(() => {
    setIsOpen(true);
  }, []);

  const closeDialog = useCallback(() => {
    setIsOpen(false);
    onClose?.();
  }, [onClose]);

  const handleCloseDialog = useCallback(
    (event, reason) => {
      if (
        reason &&
        (reason === 'backdropClick' || reason === 'escapeKeyDown')
      ) {
        handleSnackBar('Operation cancelled, no changes were made.');
      }
      closeDialog();
    },
    [closeDialog, handleSnackBar]
  );

  return { isOpen, openDialog, handleCloseDialog, closeDialog };
};

export default useDialog;
