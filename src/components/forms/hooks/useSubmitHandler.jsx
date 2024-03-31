import { useCallback } from 'react';
import { useSnackbar } from 'notistack';

function useSubmitHandler(
  onSubmit,
  successTitle,
  successDescription,
  errorDescription
) {
  const { enqueueSnackbar } = useSnackbar();

  return useCallback(
    (data, formType) => {
      onSubmit(data, formType)
        .then(() => {
          // Correctly formatted enqueueSnackbar call for success
          enqueueSnackbar(
            `${successTitle}: ${successDescription.replace('{timeRange}', data?.timeRange)}`,
            {
              variant: 'success',
              anchorOrigin: {
                vertical: 'top',
                horizontal: 'right',
              },
            }
          );
        })
        .catch((error) => {
          // Correctly formatted enqueueSnackbar call for error
          enqueueSnackbar(
            `${errorDescription.replace('{timeRange}', data?.timeRange)}: ${error}`,
            {
              variant: 'error',
              anchorOrigin: {
                vertical: 'top',
                horizontal: 'right',
              },
            }
          );
        });
    },
    [
      onSubmit,
      enqueueSnackbar,
      successTitle,
      successDescription,
      errorDescription,
    ] // Removed showSuccess and showError from dependencies
  );
}

export default useSubmitHandler;
