import PropTypes from 'prop-types';
import RCTypographyRoot from './RCTypographyRoot';
import React from 'react';

/**
 * A reusable typography component.
 *
 * @component
 * @param {string} color - Options: primary, secondary, tertiary, error, warning, info, success, light, dark, text, white, inherit.
 * @param {boolean} fontWeight - Options: false, regular, medium, bold.
 * @param {string} textTransform - Options: none, capitalize, uppercase, lowercase.
 * @param {string} verticalAlign - Options: unset, baseline, sub, super, text-top, text-bottom, middle, top, bottom.
 * @param {boolean} textGradient - Whether to apply a text gradient to the typography.
 * @param {number} opacity - Options: 0 - 1.
 * @param {ReactNode} children - The content of the typography.
 * @param {object} rest - Additional props to be spread on the root element.
 * @param {React.Ref} ref - The ref to be forwarded to the root element.
 * @returns {JSX.Element} The rendered typography component.
 */
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
