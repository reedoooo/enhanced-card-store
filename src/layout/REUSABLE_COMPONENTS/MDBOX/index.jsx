import PropTypes from 'prop-types';
import React from 'react';
import MDBoxRoot from './MDBoxRoot';

const MDBox = React.forwardRef(
  (
    {
      variant = 'contained',
      bgColor = 'default',
      color = 'text',
      opacity = 1,
      borderRadius = 'md',
      shadow = 'none',
      coloredShadow = 'none',
      ...rest
    },
    ref
  ) => (
    <MDBoxRoot
      {...rest}
      ref={ref}
      ownerstate={{
        variant,
        bgColor,
        color,
        opacity,
        borderRadius,
        shadow,
        coloredShadow,
      }}
    />
  )
);

MDBox.displayName = 'MDBox';

// Typechecking props for the MDBox
MDBox.propTypes = {
  variant: PropTypes.oneOf(['contained', 'gradient']),
  borderWidth: PropTypes.number,
  bgColor: PropTypes.string,
  color: PropTypes.string,
  opacity: PropTypes.number,
  borderRadius: PropTypes.string,
  shadow: PropTypes.string,
  coloredShadow: PropTypes.oneOf([
    'primary',
    'secondary',
    'info',
    'success',
    'warning',
    'error',
    'light',
    'dark',
    'none',
  ]),
};

export default MDBox;
