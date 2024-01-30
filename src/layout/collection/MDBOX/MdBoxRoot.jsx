import Box from '@mui/material/Box';
import { styled } from 'styled-components';
import { useSidebarContext } from '../../../context';

export default styled(Box)(({ theme, ownerState }) => {
  // const { backgroundA, backgroundB, backgroundC, rarity } = theme;
  const { isSidebarOpen } = useSidebarContext();
  const {
    backgroundA,
    backgroundB,
    backgroundC,
    transitions,
    breakpoints,
    functions: { pxToRem },
  } = theme;
  const {
    variant,
    bgColor = 'default', // default value
    color = 'text', // default value
    opacity = 1, // default value
    borderRadius = 'sm', // default value
    shadow = 'none', // default value
  } = ownerState;
  // Define additional styles that DashboardLayout might expect
  const additionalStyles = {
    marginLeft: isSidebarOpen ? pxToRem(250) : pxToRem(0),
    transition: transitions.create(['margin-left', 'margin-right'], {
      easing: transitions.easing.easeInOut,
      duration: transitions.duration.standard,
    }),
    [breakpoints.up('xl')]: {
      // Additional breakpoint-specific styles can be added here
    },
    // Additional common styles can be added here
  };
  // Map background color
  const mapBgColor = () => {
    switch (bgColor) {
      case 'backgroundA':
        return variant === 'gradient'
          ? theme.palette.backgroundA.dark
          : theme.palette.backgroundA.default;
      case 'backgroundB':
        return theme.palette.backgroundB.default;
      case 'backgroundC':
        return theme.palette.backgroundC.default;
      default:
        return theme.palette[bgColor] ? theme.palette[bgColor].main : bgColor;
    }
  };

  // Map color
  const mapColor = () => {
    return theme.palette[color] ? theme.palette[color].main : color;
  };

  // Map border radius
  const mapBorderRadius = () => {
    return theme.shape[borderRadius] || borderRadius;
  };

  // Map box shadow
  const mapBoxShadow = () => {
    return theme.shadows[shadow] || shadow;
  };

  return {
    ...additionalStyles,
    opacity,
    background: mapBgColor(),
    color: mapColor(),
    borderRadius: mapBorderRadius(),
    boxShadow: mapBoxShadow(),
  };
});
