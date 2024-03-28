import { useState, useCallback } from 'react';

const useObjectState = (initialState = {}) => {
  const [state, setState] = useState(initialState);

  const setNestedState = useCallback((path, value) => {
    // path is the value of the path prop passed to the function and usually looks like this:
    // if updating all of the state, path = ''
    if (typeof path !== 'string') {
      console.error('Path must be a string');
      return;
    }

    setState((prevState) => {
      // Function to recursively update the state
      const updateNestedState = (prev, pathArray, value) => {
        if (pathArray.length === 1) {
          return { ...prev, [pathArray[0]]: value };
        }

        return {
          ...prev,
          [pathArray[0]]: updateNestedState(
            prev[pathArray[0]] || {},
            pathArray.slice(1),
            value
          ),
        };
      };

      return updateNestedState(prevState, path.split('.'), value);
    });
  }, []);

  const handleUpdate = useCallback((update) => {
    setState((prevState) => {
      // If update is a function, use it to derive the new state
      if (typeof update === 'function') {
        return { ...prevState, ...update(prevState) };
      }
      // Otherwise, directly merge the update object into the current state
      return { ...prevState, ...update };
    });
  }, []);

  return [state, handleUpdate, setNestedState];
};

export default useObjectState;
