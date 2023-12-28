// useSnackBar.js
import { useState, useCallback, useRef } from 'react';

const useSnackBar = () => {
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'info',
    duration: 6000, // default duration
  });
  const queueRef = useRef([]); // Queue to hold the messages

  const showNextSnackbar = () => {
    if (queueRef.current.length > 0) {
      const nextSnackbar = queueRef.current.shift();
      setSnackbar({ ...nextSnackbar, open: true });
    }
  };

  const handleSnackBar = useCallback(
    (message, severity = 'info', duration = 6000) => {
      queueRef.current.push({ message, severity, duration });
      if (!snackbar.open) {
        // If no snackbar is currently being displayed, show it immediately.
        showNextSnackbar();
      }
    },
    [snackbar.open]
  );

  const handleCloseSnackbar = useCallback(
    (event, reason) => {
      if (reason === 'clickaway') {
        return;
      }
      setSnackbar({ ...snackbar, open: false });
      showNextSnackbar(); // Show next snackbar if it's in the queue
    },
    [snackbar]
  );

  // Additional enhancements can be made to support actions, positioning, etc.

  return [snackbar, handleSnackBar, handleCloseSnackbar];
};

export default useSnackBar;
