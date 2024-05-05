/* eslint-disable @typescript-eslint/no-empty-function */
import PropTypes from 'prop-types';
import { Box, CircularProgress } from '@mui/material';
import React from 'react';
import RCLoadingButtonRoot from './RCLoadingButtonRoot';
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

const labelContent = (loading, icon, label) =>
  loading ? (
    <Box sx={{ display: 'flex', alignItems: 'center' }}>
      <CircularProgress size={20} />
      <Box sx={{ ml: 2 }}>{label}</Box>
    </Box>
  ) : (
    <Box sx={{ display: 'flex', alignItems: 'center' }}>
      {icon}
      <Box sx={{ ml: 2 }}>{label}</Box>
    </Box>
  );

const RCLoadingButton = React.forwardRef(
  (
    {
      loading = false,
      fullWidth = false,
      withContainer = false, // Default value for withContainer prop
      circular = false, // Default value for circular prop
      label = 'Loading',
      icon = null,
      onClick = () => {},
      style = {},
      sx = {},
      variant = 'contained', // Default value for variant prop
      color = 'success', // Default value for color prop
      children = null, // Default value for children prop
      size = 'large', // Default value for size prop
      ...rest
    },
    ref
  ) => {
    const ButtonContent = (
      <RCLoadingButtonRoot
        {...rest}
        ref={ref}
        color={color}
        variant={variant}
        size={size}
        ownerState={{ color, variant, size, circular, sx }}
        // label={
        //   loading ? (
        //     <Box sx={{ display: 'flex', alignItems: 'center' }}>
        //       <CircularProgress size={20} />
        //       <Box sx={{ ml: 2 }}>{label}</Box>
        //     </Box>
        //   ) : (
        //     <Box sx={{ display: 'flex', alignItems: 'center' }}>
        //       {icon}
        //       <Box sx={{ ml: 2 }}>{label}</Box>
        //     </Box>
        //   )
        // }
      >
        {!children && labelContent(loading, icon, label)}
      </RCLoadingButtonRoot>
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

RCLoadingButton.displayName = 'RCLoadingButton';

RCLoadingButton.propTypes = {
  size: PropTypes.oneOf(['small', 'medium', 'large']),
  variant: PropTypes.oneOf(['contained', 'holo', 'outline']),
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
  children: PropTypes.node,
};

export default RCLoadingButton;
