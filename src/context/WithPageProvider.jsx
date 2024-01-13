import React from 'react';
import { FormProvider, PageProvider } from '.';

// Higher Order Component for PageProvider
const WithPageProvider = (WrappedComponent) => {
  const WithPageProvider = (props) => {
    return (
      <FormProvider>
        <PageProvider>
          <WrappedComponent {...props} />
        </PageProvider>
      </FormProvider>
    );
  };
  return WithPageProvider;
};

export default WithPageProvider;
