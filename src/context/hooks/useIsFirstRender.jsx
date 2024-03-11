// useIsFirstRender.js
import { useRef, useEffect } from 'react';

/**
 * Custom hook to determine if the current render is the first one.
 *
 * @returns {boolean} True for the first render, false otherwise.
 */
export function useIsFirstRender() {
  // Use useRef to hold a mutable object that persists for the lifetime of the component
  const isFirstRender = useRef(true);

  // useEffect with an empty dependency array to run only once after the initial render
  useEffect(() => {
    // After the first render, set isFirstRender to false
    isFirstRender.current = false;
  }, []); // Empty dependency array means this effect runs once after the initial render

  // Return the current value (true on first render, false afterwards)
  return isFirstRender.current;
}
