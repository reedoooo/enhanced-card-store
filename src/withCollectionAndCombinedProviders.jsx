import React from 'react';
import { CollectionProvider } from './context/CollectionContext/CollectionContext';
import {
  CombinedProvider,
  useCombinedContext,
} from './context/CombinedProvider';
import { useCollectionStore } from './context/hooks/collection';
import withCollectionProviderHOC from './withCollectionProviderHOC';

const withCollectionAndCombinedProviders = (WrappedComponent) => {
  const ComponentWithProviders = (props) => {
    const EnhancedComponent = withCollectionProviderHOC(WrappedComponent);

    return (
      <EnhancedComponent {...props}>
        <CombinedProvider
          useCollectionStore={useCollectionStore}
          useCombinedContext={useCombinedContext}
        >
          <CollectionProvider
            useCombinedContext={useCombinedContext}
            useCollectionStore={useCollectionStore}
          >
            <WrappedComponent {...props} />
          </CollectionProvider>
        </CombinedProvider>
      </EnhancedComponent>
    );
  };
  ComponentWithProviders.displayName = `withCollectionAndCombinedProviders(${
    WrappedComponent.displayName || WrappedComponent.name || 'Component'
  })`;
  return ComponentWithProviders;
};

export default withCollectionAndCombinedProviders;
