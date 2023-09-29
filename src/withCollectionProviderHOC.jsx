// CollectionProviderHOC.js

import { CollectionProvider } from './context/CollectionContext/CollectionContext';

const withCollectionProvider = (Component) => {
  return function WrappedComponent(props) {
    return (
      <CollectionProvider>
        <Component {...props} />
      </CollectionProvider>
    );
  };
};

export default withCollectionProvider;
