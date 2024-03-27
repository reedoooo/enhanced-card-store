import { useCallback } from 'react';
import useSnackbarManager from '../../../context/hooks/useSnackbarManager';

function useSubmitHandler(
  onSubmit,
  successTitle,
  successDescription,
  errorDescription
) {
  const { showSuccess, showError } = useSnackbarManager();

  return useCallback(
    (data, formType) => {
      onSubmit(data, formType)
        .then(() => {
          // Using showSuccess for positive feedback
          showSuccess(
            `${successTitle}: ${successDescription.replace('{timeRange}', data?.timeRange)}`
          );
        })
        .catch((error) => {
          // Using showError for negative feedback
          showError(
            `${errorDescription.replace('{timeRange}', data?.timeRange)}: ${error}`
          );
        });
    },
    [
      onSubmit,
      showSuccess,
      showError,
      successTitle,
      successDescription,
      errorDescription,
    ]
  );
}

export default useSubmitHandler;
