import PropTypes from 'prop-types';
import RCTypographyRoot from './RCTypographyRoot';
import React from 'react';

const RCTypography = React.forwardRef(
  (
    {
      color = 'primary',
      fontWeight = false,
      textTransform = 'none',
      verticalAlign = 'unset',
      textGradient = false,
      opacity = 1,
      children,
      ...rest
    },
    ref
  ) => {
    return (
      <RCTypographyRoot
        {...rest}
        ref={ref}
        ownerstate={{
          color,
          textTransform,
          verticalAlign,
          fontWeight,
          opacity,
          textGradient,
        }}
      >
        {children}
      </RCTypographyRoot>
    );
  }
);

RCTypography.displayName = 'RCTypography';

// Typechecking props for the RCTypography
RCTypography.propTypes = {
  color: PropTypes.oneOf([
    'inherit',
    'primary',
    'secondary',
    'info',
    'success',
    'warning',
    'error',
    'light',
    'dark',
    'text',
    'white',
  ]),
  fontWeight: PropTypes.oneOf([false, 'light', 'regular', 'medium', 'bold']),
  textTransform: PropTypes.oneOf([
    'none',
    'capitalize',
    'uppercase',
    'lowercase',
  ]),
  verticalAlign: PropTypes.oneOf([
    'unset',
    'baseline',
    'sub',
    'super',
    'text-top',
    'text-bottom',
    'middle',
    'top',
    'bottom',
  ]),
  textGradient: PropTypes.bool,
  children: PropTypes.node.isRequired,
  opacity: PropTypes.number,
};

export default RCTypography;
