import Box from '@mui/material/Box';
import { styled } from 'styled-components';
import { useMode, useSidebarContext } from '../../../context';

export default styled(Box)(({ ownerstate }) => {
  // const { backgroundA, backgroundB, backgroundC, rarity } = theme;
  const { isSidebarOpen } = useSidebarContext();
  const { theme } = useMode();
  const { palette, functions, borders, boxShadows, transitions, breakpoints } =
    theme;
  const {
    variant,
    bgColor = 'default', // default value
    color = 'text', // default value
    opacity = 1, // default value
    borderRadius = 'sm', // default value
    shadow = 'none', // default value
    coloredShadow,
  } = ownerstate;
  const { gradients, grey, white } = palette;
  const { linearGradient } = functions;
  const { borderRadius: radius } = borders;
  const { colored } = boxShadows;
  const greyColors = {
    'grey-100': grey[100],
    'grey-200': grey[200],
    'grey-300': grey[300],
    'grey-400': grey[400],
    'grey-500': grey[500],
    'grey-600': grey[600],
    'grey-700': grey[700],
    'grey-800': grey[800],
    'grey-900': grey[900],
  };

  const validGradients = [
    'primary',
    'secondary',
    'info',
    'success',
    'warning',
    'error',
    'dark',
    'light',
  ];

  const validColors = [
    'transparent',
    'white',
    'black',
    'primary',
    'secondary',
    'info',
    'success',
    'warning',
    'error',
    'light',
    'dark',
    'text',
    'grey-100',
    'grey-200',
    'grey-300',
    'grey-400',
    'grey-500',
    'grey-600',
    'grey-700',
    'grey-800',
    'grey-900',
  ];

  const validBorderRadius = ['xs', 'sm', 'md', 'lg', 'xl', 'xxl', 'section'];
  const validBoxShadows = ['xs', 'sm', 'md', 'lg', 'xl', 'xxl', 'inset'];
  // background value
  let backgroundValue = bgColor;

  if (variant === 'gradient') {
    backgroundValue = validGradients.find((el) => el === bgColor)
      ? linearGradient(gradients[bgColor].main, gradients[bgColor].state)
      : white.main;
  } else if (validColors.find((el) => el === bgColor)) {
    backgroundValue = palette[bgColor]
      ? palette[bgColor].main
      : greyColors[bgColor];
  } else {
    backgroundValue = bgColor;
  }

  // color value
  let colorValue = color;

  if (validColors.find((el) => el === color)) {
    colorValue = palette[color] ? palette[color].main : greyColors[color];
  }

  // borderRadius value
  let borderRadiusValue = borderRadius;

  if (validBorderRadius.find((el) => el === borderRadius)) {
    borderRadiusValue = radius[borderRadius];
  }

  // boxShadow value
  let boxShadowValue = 'none';

  if (validBoxShadows.find((el) => el === shadow)) {
    boxShadowValue = boxShadows[shadow];
  } else if (coloredShadow) {
    boxShadowValue = colored[coloredShadow] ? colored[coloredShadow] : 'none';
  }

  // Define additional styles that DashboardLayout might expect
  const additionalStyles = {
    marginLeft: isSidebarOpen ? functions.pxToRem(250) : functions.pxToRem(0),
    borderWidth: functions.pxToRem(1),
    borderStyle: 'solid',
    justifyContent: 'center',
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
