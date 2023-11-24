// customHooks/useAppContext.js
import { useContext } from 'react';
import { AppContext } from '../AppContext/AppContextProvider';

const useAppContext = () => {
  const context = useContext(AppContext);

  if (!context) {
    console.error("The component isn't wrapped with AppContextProvider");
    return {}; // return an empty object
  }

  return context; // return context as an object
};

export default useAppContext;
