import useLogger from './useLogger';

const useApiResponseHandler = () => {
  const logger = useLogger('ApiResponseHandler');

  const handleApiResponse = (response, functionName) => {
    const { message, data } = response;

    // Log the details using the logger
    logger.logEvent('apiResponse:', {
      message: message,
      data: data,
      source: functionName,
    });

    return data;
  };

  return handleApiResponse;
};

export default useApiResponseHandler;
