// customHooks/useAppContext.js
import { useContext } from 'react';
import { AppContext } from '../AppContextProvider';

const useAppContext = () => {
  const context = useContext(AppContext);

  if (!context) {
    console.error("The component isn't wrapped with AppContextProvider");
    return [null, false];
  }

  return [context, true];
};

export default useAppContext;
