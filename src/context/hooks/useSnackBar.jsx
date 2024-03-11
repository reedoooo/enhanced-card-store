import { IconButton } from '@mui/material';
import { useSnackbar } from 'notistack';
import { useState, useCallback, useRef, useEffect } from 'react';
import CloseIcon from '@mui/icons-material/Close';
const useSnackBar = () => {
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const defaultOptions = {
    variant: 'info',
    autoHideDuration: 6000,
  };
  const isMountedRef = useRef(false);

  useEffect(() => {
    isMountedRef.current = true;
    return () => {
      isMountedRef.current = false;
    };
  }, []);
  const handleSnackBar = useCallback(
    (message, options = defaultOptions) => {
      // Enqueue a new snackbar using notistack's enqueueSnackbar function
      // `options` can include severity as `variant` and custom `duration` as `autoHideDuration`
      // const { title, description } = message;
      const { variant, autoHideDuration } = options;
      if (open && message.title) {
        enqueueSnackbar(message, {
          message,
          variant,
          action: (key) => (
            <IconButton size="small" onClick={() => closeSnackbar(key)}>
              <CloseIcon fontSize="inherit" />
            </IconButton>
          ),
        });
      }
    },
    [enqueueSnackbar]
  );

  // const [snackbar, setSnackbar] = useState({
  //   open: false,
  //   message: '',
  //   severity: 'info',
  //   duration: 6000,
  // });
  // const queueRef = useRef([]);

  // const showNextSnackbar = useCallback(() => {
  //   if (queueRef.current.length > 0 && isMountedRef.current) {
  //     const nextSnackbar = queueRef.current.shift();
  //     setSnackbar({ ...nextSnackbar, open: true });
  //   }
  // }, []);

  // const handleSnackBar = useCallback(
  //   (message, severity = 'info', duration = 6000) => {
  //     queueRef.current.push({ message, severity, duration });
  //     if (!snackbar.open && isMountedRef.current) {
  //       showNextSnackbar();
  //     }
  //   },
  //   [snackbar.open, showNextSnackbar]
  // );

  const handleCloseSnackbar = useCallback(() => {
    if (isMountedRef.current) {
      closeSnackbar();
      // setSnackbar((prevSnackbar) => ({
      //   ...prevSnackbar,
      //   open: false,
      // }));
      // showNextSnackbar();
    }
  }, [closeSnackbar]);

  return { handleSnackBar, handleCloseSnackbar };
};

export default useSnackBar;
