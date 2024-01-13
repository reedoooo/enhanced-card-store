import { useState, useCallback, useEffect } from 'react';

const useDialog = (handleSnackBar) => {
  const [isLoginDialogOpen, setLoginDialogOpen] = useState(false);
  const [dialogStatus, setDialogStatus] = useState({
    isOpen: false,
    event: '',
  });
  const [dialogs, setDialogs] = useState({});

  // Function to open a dialog
  const openDialog = useCallback(
    (dialogName, action) => {
      setDialogs((prevDialogs) => ({
        ...prevDialogs,
        [dialogName]: true,
      }));
      setLoginDialogOpen(true);
      console.log(`${dialogName} Dialog attempting ${action}`);
      handleSnackBar(`${dialogName} Dialog attempting ${action}`, 'info', 6000);
      // console.log(`${dialogName} Dialog Status: Open`);
    },
    [handleSnackBar]
  );

  // Function to close a dialog
  const closeDialog = useCallback(
    (dialogName, action, reason) => {
      if (reason === 'backdropClick' || reason === 'escapeKeyDown') {
        handleSnackBar(
          'Operation cancelled, no changes were made.',
          'warning',
          6000
        );
      } else {
        setLoginDialogOpen(false);
        console.log(`${dialogName} Dialog attempting ${action}`);
        handleSnackBar(
          `${dialogName} Dialog attempting ${action}`,
          'info',
          6000
        );
        // console.log(`${dialogName} Dialog Status: Closed`);
      }
      setDialogs((prevDialogs) => ({
        ...prevDialogs,
        [dialogName]: false,
      }));
    },
    [handleSnackBar]
  );

  // Track dialog status changes
  useEffect(() => {
    Object.entries(dialogs).forEach(([dialogName, isOpen]) => {
      console.log(`${dialogName} Dialog Status: ${isOpen ? 'Open' : 'Closed'}`);
    });
  }, [dialogs]);

  return {
    isLoginDialogOpen,
    openLoginDialog: () => openDialog('Login', 'Open'),
    closeLoginDialog: (event, reason) => closeDialog('Login', 'Close', reason),
  };
};

export default useDialog;
// // console.log('isLoggedIn:', isLoggedIn);
// console.log('isLoginDialogOpen:', isLoginDialogOpen);
// // console.log('handleSnackBar:', handleSnackBar);
// // useEffect(() => {
// //   if (!isLoggedIn && isLoginDialogOpen) {
// //     handleSnackBar('Please log in to continue', 'info');
// //   }
// // }, [isLoggedIn, isLoginDialogOpen, handleSnackBar]);

// // const handleToggleLoginDialog = useCallback(
// //   (event) => {
// //     if (event === 'Open') {
// //       setLoginDialogOpen(true);
// //       handleSnackBar('Opening login dialog...', 'info');
// //     } else if (event === 'Close') {
// //       setLoginDialogOpen(false);
// //       handleSnackBar('Closing login dialog...', 'info');
// //     } else {
// //       // Handle backdrop click or escape key down, or toggle dialog for other cases
// //       if (event === 'backdropClick' || event === 'escapeKeyDown') {
// //         handleSnackBar(
// //           'Operation cancelled, no changes were made.',
// //           'warning'
// //         );
// //       } else {
// //         setLoginDialogOpen((prev) => {
// //           const newStatus = !prev;
// //           handleSnackBar(
// //             newStatus ? 'Dialog opened' : 'Dialog closed',
// //             'info'
// //           );
// //           return newStatus;
// //         });
// //       }
// //     }
// //   },
// //   [handleSnackBar]
// // );
// const openLoginDialog = useCallback(() => {
//   setLoginDialogOpen(true);
//   handleSnackBar('Login Dialog opened', 'info', 6000); // Notify on dialog open
// }, [handleSnackBar]);

// const closeLoginDialog = useCallback(
//   (event, reason) => {
//     if (
//       reason &&
//       (reason === 'backdropClick' || reason === 'escapeKeyDown')
//     ) {
//       handleSnackBar(
//         'Operation cancelled, no changes were made.',
//         'warning',
//         6000
//       );
//     } else {
//       handleSnackBar('Login Dialog closed', 'info', 6000); // Notify on dialog close
//     }
//     setLoginDialogOpen(false);
//   },
//   [handleSnackBar]
// );

// useEffect(() => {
//   if (isLoginDialogOpen) {
//     setDialogStatus({ isOpen: true, event: 'Open' });
//     console.log('Dialog Successfully Opened');
//   }
//   if (!isLoginDialogOpen) {
//     setDialogStatus({ isOpen: false, event: 'Close' });
//     console.log('Dialog Successfully Closed');
//   }

//   if (dialogStatus.event === 'Open') {
//     handleSnackBar('Login Dialog opened', 'info', 6000); // Notify on dialog open
//   }
//   if (dialogStatus.event === 'Close') {
//     handleSnackBar('Login Dialog closed', 'info', 6000); // Notify on dialog close
//   }
// });
// const [isOpen, setIsOpen] = useState(false);

// const openDialog = useCallback(() => {
//   setIsOpen(true);
// }, []);

// const closeDialog = useCallback(() => {
//   setIsOpen(false);
//   onClose?.();
// }, [onClose]);

// const openLoginDialog = useCallback(() => {
//   setLoginDialogOpen(true);
// }, []);

// const closeLoginDialog = useCallback(() => {
//   setLoginDialogOpen(false);
// }, []);

// toggleLoginDialog combines openLoginDialog and closeLoginDialog
// const handleCloseDialog = useCallback(
//   (event, reason) => {
//     if (
//       reason &&
//       (reason === 'backdropClick' || reason === 'escapeKeyDown')
//     ) {
//       handleSnackBar('Operation cancelled, no changes were made.');
//     }
//     closeDialog();
//   },
//   [closeDialog, handleSnackBar]
// );

// example usage of handleToggleLoginDialog:
// <LoginDialog
//   open={isLoginDialogOpen}
//   onClose={handleToggleLoginDialog}
//   onLogin={handleToggleLoginDialog}
// />
// const handleCloseLoginDialog = useCallback(
//   (event, reason) => {
//     if (
//       reason &&
//       (reason === 'backdropClick' || reason === 'escapeKeyDown')
//     ) {
//       handleSnackBar('Operation cancelled, no changes were made.');
//     }
//     toggleLoginDialog();
//   },
//   [toggleLoginDialog, handleSnackBar]
// );
