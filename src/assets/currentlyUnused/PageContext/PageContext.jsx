// import React, {
//   createContext,
//   useState,
//   useContext,
//   useEffect,
//   useMemo,
// } from 'react';
// import LoadingIndicator from '../../../layout/LoadingIndicator';
// import ErrorIndicator from '../../../layout/ErrorIndicator';
// import SplashPage2 from '../../../layout/REUSABLE_COMPONENTS/SplashPage2';
// // import useSnackBar from '../../hooks/useSnackBar';
// import { defaultContextValue } from '../../constants';
// import { useLoading } from '../../hooks/useLoading';

// const PageContext = createContext(defaultContextValue.PAGE_CONTEXT);

// export const PageProvider = ({ children }) => {
//   const {
//     isLoading,
//     isAnyLoading,
//     startLoading,
//     stopLoading,
//     setError,
//     error,
//     clearLoading,
//   } = useLoading();
//   const returnDisplay = () => {
//     if (error) {
//       return <ErrorIndicator error={error} />;
//     }
//     if (isLoading('isPageLoading')) {
//       return <SplashPage2 />;
//     } else if (isAnyLoading()) {
//       return <LoadingIndicator />;
//     }
//     return null;
//   };
//   const contextValue = useMemo(
//     () => ({
//       startLoading,
//       stopLoading,
//       setError,
//       error,
//       isLoading,
//       clearLoading,
//       returnDisplay,
//       // You can expose any additional functionalities from useLoading as needed.
//     }),
//     [
//       startLoading,
//       stopLoading,
//       setError,
//       error,
//       isLoading,
//       clearLoading,
//       returnDisplay,
//     ]
//   );

//   return (
//     <PageContext.Provider value={contextValue}>
//       {children}{' '}
//     </PageContext.Provider>
//   );
// };

// export const usePageContext = () => useContext(PageContext);
