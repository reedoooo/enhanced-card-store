import React from 'react';
import RCWrappedIconRoot from './RCWrappedIconRoot';
import MDBox from '../MDBOX';
import PropTypes from 'prop-types';

// ==============================|| WRAPPED ICON ||============================== //

/**
 * A reusable component that wraps an icon.
 *
 * @component
 * @param {string} size - Options:
 * @param {string} bgColor - Options:
 * @param {React.Ref} ref - The ref object for the component.
 * @returns {React.Element} The rendered RCWrappedIcon component.
 */
const RCWrappedIcon = React.forwardRef(
  (
    {
      // iconColor = 'white',
      size = 'medium',
      bgColor = 'success',
      children,
      ...rest
    },
    ref
  ) => {
    return (
      <MDBox
        sx={{
          border: 'none',
        }}
      >
        <RCWrappedIconRoot
          ref={ref}
          ownerstate={{
            size,
            bgColor,
          }}
          {...rest}
        >
          {children}
        </RCWrappedIconRoot>
      </MDBox>
    );
  }
);

RCWrappedIcon.displayName = 'RCWrappedIcon';

RCWrappedIcon.propTypes = {
  size: PropTypes.oneOf(['small', 'medium', 'large']),
  children: PropTypes.node.isRequired,
  bgColor: PropTypes.oneOf([
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
};

export default RCWrappedIcon;
