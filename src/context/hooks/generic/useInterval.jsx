import { useEffect, useRef } from 'react';

/**
 * useInterval - A custom hook for setting up an interval.
 *
 * @param {Function} callback - The callback function to be executed on each interval.
 * @param {number|null} delay - The interval delay in milliseconds. If null, the interval will be paused.
 */
function useInterval(callback, delay) {
  const savedCallback = useRef();

  // Remember the latest callback.
  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  // Set up the interval.
  useEffect(() => {
    function tick() {
      savedCallback.current();
    }

    if (delay !== null) {
      let id = setInterval(tick, delay);
      return () => clearInterval(id);
    }
  }, [delay]);
}

export default useInterval;
