import React from 'react';
import { PageProvider } from '.';

// Higher Order Component for PageProvider
const WithPageProvider = (WrappedComponent) => {
  const WithPageProvider = (props) => {
    return (
      <PageProvider>
        <WrappedComponent {...props} />
      </PageProvider>
    );
  };
  return WithPageProvider;
};

export default WithPageProvider;
