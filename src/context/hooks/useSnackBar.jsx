import { useState, useCallback, useRef, useEffect } from 'react';

const useSnackBar = () => {
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'info',
    duration: 6000,
  });
  const queueRef = useRef([]);
  const isMountedRef = useRef(false);

  useEffect(() => {
    isMountedRef.current = true;
    return () => {
      isMountedRef.current = false;
    };
  }, []);

  const showNextSnackbar = useCallback(() => {
    if (queueRef.current.length > 0 && isMountedRef.current) {
      const nextSnackbar = queueRef.current.shift();
      setSnackbar({ ...nextSnackbar, open: true });
    }
  }, []);

  const handleSnackBar = useCallback(
    (message, severity = 'info', duration = 6000) => {
      queueRef.current.push({ message, severity, duration });
      if (!snackbar.open && isMountedRef.current) {
        showNextSnackbar();
      }
    },
    [snackbar.open, showNextSnackbar]
  );

  const handleCloseSnackbar = useCallback(
    (event, reason) => {
      if (reason === 'clickaway') {
        return;
      }
      if (isMountedRef.current) {
        setSnackbar({ ...snackbar, open: false });
        showNextSnackbar();
      }
    },
    [snackbar, showNextSnackbar]
  );

  return [snackbar, handleSnackBar, handleCloseSnackbar];
};

export default useSnackBar;
