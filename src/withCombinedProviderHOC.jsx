// CombinedProviderHOC.js

import { CombinedProvider } from './context/CombinedProvider';

const withCombinedProviderHOC = (Component) => {
  return function WrappedComponent(props) {
    return (
      <CombinedProvider>
        <Component {...props} />
      </CombinedProvider>
    );
  };
};

export default withCombinedProviderHOC;
