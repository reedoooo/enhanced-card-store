import { forwardRef } from 'react';
import PropTypes from 'prop-types';
import RCBadgeRoot from './RCBadgeRoot';

const RCBadge = forwardRef(
  (
    {
      color,
      variant,
      size,
      circular,
      indicator,
      border,
      container,
      children,
      ...rest
    },
    ref
  ) => (
    <RCBadgeRoot
      {...rest}
      ownerState={{
        color,
        variant,
        size,
        circular,
        indicator,
        border,
        container,
        children,
      }}
      ref={ref}
      color="default"
    >
      {children}
    </RCBadgeRoot>
  )
);

RCBadge.displayName = 'RCBadge';
RCBadge.defaultProps = {
  color: 'info',
  variant: 'gradient',
  size: 'sm',
  circular: false,
  indicator: false,
  border: false,
  children: false,
  container: false,
};
RCBadge.propTypes = {
  color: PropTypes.oneOf([
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
  variant: PropTypes.oneOf(['gradient', 'contained']),
  size: PropTypes.oneOf(['xs', 'sm', 'md', 'lg']),
  circular: PropTypes.bool,
  indicator: PropTypes.bool,
  border: PropTypes.bool,
  children: PropTypes.node,
  container: PropTypes.bool,
};

export default RCBadge;
