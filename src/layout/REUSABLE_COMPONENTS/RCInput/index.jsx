import { forwardRef } from 'react';

// prop-types is a library for typechecking of props
import PropTypes from 'prop-types';

// Custom styles for RCInput
import RCInputRoot from './RCInputRoot';

const RCInput = forwardRef(({ error, success, disabled, ...rest }, ref) => (
  <RCInputRoot {...rest} ref={ref} ownerState={{ error, success, disabled }} />
));

RCInput.displayName = 'RCInput';

// Setting default values for the props of RCInput
RCInput.defaultProps = {
  error: false,
  success: false,
  disabled: false,
};

// Typechecking props for the RCInput
RCInput.propTypes = {
  error: PropTypes.bool,
  success: PropTypes.bool,
  disabled: PropTypes.bool,
};

export default RCInput;
