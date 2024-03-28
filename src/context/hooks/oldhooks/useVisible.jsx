import { useState, useCallback } from 'react';

/**
 * Custom hook to manage visibility states for various components or sections.
 * Allows setting visibility individually for named elements.
 * @returns {
 *   isVisible: Function - Function to check if a named element is visible.
 *   show: Function - Function to show a named element.
 *   hide: Function - Function to hide a named element.
 *   toggle: Function - Function to toggle the visibility of a named element.
 * }
 */
export const useVisible = () => {
  const [visibleStates, setVisibleStates] = useState({});
  const isVisible = useCallback(
    (name) => !!visibleStates[name],
    [visibleStates]
  );

  const show = useCallback((name) => {
    setVisibleStates((prevStates) => ({ ...prevStates, [name]: true }));
  }, []);

  const hide = useCallback((name) => {
    setVisibleStates((prevStates) => ({ ...prevStates, [name]: false }));
  }, []);

  const toggleVisible = useCallback((name) => {
    setVisibleStates((prevStates) => ({
      ...prevStates,
      [name]: !prevStates[name],
    }));
  }, []);

  return { isVisible, show, hide, toggleVisible };
};

// export default useVisible;
