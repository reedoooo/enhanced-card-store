import { useCallback } from 'react';
import useCustomSnackbar from '../../../context/hooks/useCustomSnackbar';

function useSubmitHandler(
  onSubmit,
  successTitle,
  successDescription,
  errorDescription
) {
  const showSnackbar = useCustomSnackbar();

  return useCallback(
    (data, formType) => {
      onSubmit(data, formType)
        .then(() => {
          showSnackbar(
            successTitle,
            successDescription.replace('{timeRange}', data?.timeRange),
            { variant: 'success' }
          );
        })
        .catch((error) => {
          showSnackbar(
            'Error',
            errorDescription.replace('{timeRange}', data?.timeRange) +
              `: ${error}`,
            { variant: 'error' }
          );
        });
    },
    // `showSnackbar` is now a dependency of useCallback
    [onSubmit, showSnackbar, successTitle, successDescription, errorDescription]
  );
}

export default useSubmitHandler;
