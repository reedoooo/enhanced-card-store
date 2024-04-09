import { useEffect } from 'react';
import PropTypes from 'prop-types';

const useValidateData = (data, dataType) => {
  useEffect(() => {
    PropTypes.checkPropTypes(
      { data: dataType }, // Expected prop types
      { data }, // Actual data passed
      'data', // Prop name
      'useValidateData' // Hook name for reference
    );
  }, [data]);
};

export { useValidateData };
