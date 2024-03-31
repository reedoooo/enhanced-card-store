import { forwardRef } from 'react';
import PropTypes from 'prop-types';
import RCButtonRoot from './RCButtonRoot';
import { Box } from '@mui/material';
// Wrapper component for when you need a container around the button
const ButtonContainer = ({ children, withContainer }) => (
  <Box
    sx={{
      flex: 1,
      display: 'flex',
      justifyContent: 'flex-end',
      maxWidth: withContainer ? '50%' : '100%',
    }}
  >
    {children}
  </Box>
);
const RCButton = forwardRef(
  (
    {
      color,
      variant,
      size,
      circular,
      iconOnly,
      children,
      withContainer,
      // isPrimary,
      // isAccent,
      // isDefault,
      // isDisabled,
      // isError,
      // customColor,
      // customTextColor,
      // customSize,
      ...rest
    },
    ref
  ) => {
    const ButtonContent = (
      <RCButtonRoot
        {...rest}
        ref={ref}
        color="success"
        variant={variant === 'gradient' ? 'contained' : variant}
        size={size}
        ownerState={{ color, variant, size, circular, iconOnly }}
      >
        {children}
      </RCButtonRoot>
    );

    if (withContainer) {
      return (
        <ButtonContainer withContainer={withContainer}>
          {ButtonContent}
        </ButtonContainer>
      );
    }
    return ButtonContent;
  }
);

RCButton.displayName = 'RCButton';
RCButton.defaultProps = {
  size: 'medium',
  variant: 'contained',
  color: 'white',
  circular: false,
  iconOnly: false,
  withContainer: false, // Default value for withContainer prop
};
RCButton.propTypes = {
  size: PropTypes.oneOf(['small', 'medium', 'large']),
  variant: PropTypes.oneOf([
    'text',
    'contained',
    'outlined',
    'gradient',
    'holo',
    // 'primary',
    // 'accent',
    // 'default',
    // 'disabled',
    // 'error',
  ]),
  color: PropTypes.oneOf([
    'default',
    'white',
    'greenAccent',
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
  withContainer: PropTypes.bool, // Add withContainer to the prop types
  children: PropTypes.node.isRequired,
};

export default RCButton;
