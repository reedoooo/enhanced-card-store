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
      color = 'white',
      variant = 'contained',
      size = 'medium',
      circular = false,
      iconOnly = false,
      children,
      withContainer = false, // Default value for withContainer prop
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
        color={color}
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
RCButton.propTypes = {
  size: PropTypes.oneOf(['small', 'medium', 'large']),
  variant: PropTypes.oneOf([
    'text',
    'contained',
    'outlined',
    'gradient',
    'holo',
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
