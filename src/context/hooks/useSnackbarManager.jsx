// useSnackbarManager.js
import { useSnackbar } from 'notistack';

export default function useSnackbarManager() {
  const { enqueueSnackbar } = useSnackbar();

  const showSuccess = (message) => {
    enqueueSnackbar(message, {
      variant: 'success',
      anchorOrigin: {
        vertical: 'top',
        horizontal: 'right',
      },
    });
  };

  const showInfo = (message) => {
    enqueueSnackbar(message, {
      variant: 'info',
      anchorOrigin: {
        vertical: 'top',
        horizontal: 'right',
      },
    });
  };

  const showWarning = (message) => {
    enqueueSnackbar(message, {
      variant: 'warning',
      anchorOrigin: {
        vertical: 'top',
        horizontal: 'right',
      },
    });
  };

  const showError = (message) => {
    enqueueSnackbar(message, {
      variant: 'error',
      anchorOrigin: {
        vertical: 'top',
        horizontal: 'right',
      },
    });
  };

  // More examples:
  const showCustom = (message, variant = 'default') => {
    enqueueSnackbar(message, {
      variant: variant, // could be default, error, success, warning, info, etc.
      anchorOrigin: {
        vertical: 'bottom',
        horizontal: 'left',
      },
    });
  };

  return { showSuccess, showInfo, showWarning, showError, showCustom };
}
