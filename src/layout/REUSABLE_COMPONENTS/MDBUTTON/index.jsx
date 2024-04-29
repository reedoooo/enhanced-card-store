import { forwardRef } from 'react';
import PropTypes from 'prop-types';
import MDButtonRoot from './MDButtonRoot';
import { useMode } from 'context';

const MDButton = forwardRef(
  ({ color, variant, size, circular, iconOnly, children, ...rest }, ref) => {
    const { theme } = useMode();

    return (
      <MDButtonRoot
        {...rest}
        ref={ref}
        theme={theme}
        // color={color}
        color="primary"
        variant={variant === 'gradient' ? 'contained' : variant}
        size={size}
        ownerState={{ color, variant, size, circular, iconOnly, theme }}
      >
        {children}
      </MDButtonRoot>
    );
  }
);

MDButton.displayName = 'MDButton';

// Setting default values for the props of MDButton
MDButton.defaultProps = {
  size: 'medium',
  variant: 'contained',
  color: 'white',
  circular: false,
  iconOnly: false,
};

// Typechecking props for the MDButton
MDButton.propTypes = {
  size: PropTypes.oneOf(['small', 'medium', 'large']),
  variant: PropTypes.oneOf([
    'text',
    'contained',
    'outlined',
    'gradient',
    'customContained',
  ]),
  color: PropTypes.oneOf([
    'default',
    'white',
    'primary',
    'secondary',
    'info',
    'success',
    'warning',
    'error',
    'light',
    'dark',
  ]),
  circular: PropTypes.bool,
  iconOnly: PropTypes.bool,
  children: PropTypes.node.isRequired,
};

export default MDButton;
