// // VisibilityContext.js
// import React, { createContext, useContext, useState } from 'react';

// const VisibilityContext = createContext();

// export const useVisibilityContext = () => useContext(VisibilityContext);

// export const VisibilityProvider = ({ children }) => {
//   const [isCollectionVisible, setCollectionVisibility] = useState(false);
//   const [dialogStates, setDialogStates] = useState({
//     isAddCollectionDialogOpen: false,
//     isSelectionErrorDialogOpen: false,
//   });

//   const toggleCollectionVisibility = () => {
//     setCollectionVisibility(!isCollectionVisible);
//   };

//   const toggleDialog = (dialogName) => {
//     setDialogStates((prevState) => ({
//       ...prevState,
//       [dialogName]: !prevState[dialogName],
//     }));
//   };

//   return (
//     <VisibilityContext.Provider
//       value={{
//         isCollectionVisible,
//         toggleCollectionVisibility,
//         dialogStates,
//         toggleDialog,
//       }}
//     >
//       {children}
//     </VisibilityContext.Provider>
//   );
// };
