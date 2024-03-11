import { useEffect, useRef, useState } from 'react';

const useLogger = (componentName, options = {}) => {
  const mountedRef = useRef(false);
  const [state, setState] = useState({});
  const specialEvents = ['apiResponse', 'stateChange'];

  // Function to log custom events
  const logEvent = (eventName, additionalData = {}) => {
    // Check if the event is special
    if (specialEvents.includes(eventName)) {
      // Handle special event
      if (eventName === 'apiResponse') {
        const { message, data, source } = additionalData;
        console.log(
          `[${componentName}] API Response:`,
          `Message: ${message}`,
          `Data: ${data}`,
          `Source: ${source || 'Unknown'}`
        );
      }
      // Add additional special event handling here if needed
    } else {
      // Log general events
      console.log(
        `[${componentName}] Event: ${eventName}`,
        // field ? `[${field}]` : '',
        additionalData
      );
    }
  };

  // Function to log errors
  const logError = (error) => {
    console.error(`[${componentName}] Error:`, error);
  };

  useEffect(() => {
    console.log(`[${componentName}] Mounted`, options);
    mountedRef.current = true;

    return () => {
      console.log(`[${componentName}] Unmounted`, options);
      mountedRef.current = false;
    };
  }, []);

  useEffect(() => {
    if (mountedRef.current) {
      console.log(`[${componentName}] Updated`, state);
    }
  }, [state]);

  const setStateAndLog = (newState) => {
    setState(newState);
    logEvent('State Change', newState);
  };

  return { logEvent, setStateAndLog, logError };
};

export default useLogger;
