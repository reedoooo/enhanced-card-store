import { Button } from '@mui/material';
import styled from 'styled-components';
import { useMode } from '../../../context';
// const calculateStyles = (size) => {
//   switch (size) {
//     case 'small':
//       return {
//         width: '75px',
//         // p: '1rem',
//         p: '0.5rem 0.75rem',
//         // m: '0.5rem',
//         fontSize: '0.875rem',
//       };
//     case 'medium':
//       return {
//         width: '100px',
//         padding: '0.75rem 1rem',
//         fontSize: '1rem',
//       };
//     case 'large':
//       return {
//         width: '125px',
//         padding: '1rem 1.5rem',
//         fontSize: '1.25rem',
//       };
//     default:
//       return {
//         width: '140px',
//         padding: '1rem 1.25rem',
//         fontSize: '1.125rem',
//       };
//   }
// };
export default styled(Button)(({ ownerState }) => {
  const { theme } = useMode();
  const { palette, functions, borders, boxShadows } = theme;
  const { color, variant, size, circular, iconOnly } = ownerState;
  const {
    white,
    text,
    transparent,
    gradients,
    dark,
    greenAccent,
    grey,
    success,
    error,
  } = palette;
  const { boxShadow, linearGradient, pxToRem, rgba } = functions;
  const { borderRadius } = borders;
  const { colored } = boxShadows;
  const containedStyles = () => {
    const backgroundValue = palette[color] ? palette[color].main : white.main;
    const focusedBackgroundValue = palette[color]
      ? palette[color].focus
      : white.focus;

    // boxShadow value
    const boxShadowValue = colored[color]
      ? `${boxShadow([0, 3], [3, 0], palette[color].main, 0.15)}, ${boxShadow(
          [0, 3],
          [1, -2],
          palette[color].main,
          0.2
        )}, ${boxShadow([0, 1], [5, 0], palette[color].main, 0.15)}`
      : 'none';

    // boxShadow value when button is hovered
    const hoveredBoxShadowValue = colored[color]
      ? `${boxShadow([0, 14], [26, -12], palette[color].main, 0.4)}, ${boxShadow(
          [0, 4],
          [23, 0],
          palette[color].main,
          0.15
        )}, ${boxShadow([0, 8], [10, -5], palette[color].main, 0.2)}`
      : 'none';

    // color value
    let colorValue = white.main;

    if (color === 'default' || !palette[color]) {
      colorValue = text.main;
    } else if (color === 'white' || color === 'light') {
      colorValue = dark.main;
    }

    // color value when button is focused
    let focusedColorValue = white.main;

    if (color === 'default') {
      focusedColorValue = text.main;
    } else if (color === 'white') {
      focusedColorValue = dark.main;
    } else if (color === 'primary' || color === 'error' || color === 'dark') {
      focusedColorValue = white.main;
    }

    return {
      background: backgroundValue,
      color: colorValue,
      boxShadow: boxShadowValue,

      '&:hover': {
        backgroundColor: backgroundValue,
        boxShadow: hoveredBoxShadowValue,
      },

      '&:focus:not(:hover)': {
        backgroundColor: focusedBackgroundValue,
        boxShadow: palette[color]
          ? boxShadow([0, 0], [0, 3.2], palette[color].main, 0.5)
          : boxShadow([0, 0], [0, 3.2], white.main, 0.5),
      },

      '&:disabled': {
        backgroundColor: backgroundValue,
        color: focusedColorValue,
      },
    };
  };
  const outlinedStyles = () => {
    // background color value
    const backgroundValue =
      color === 'white' ? rgba(white.main, 0.1) : transparent.main;

    // color value
    const colorValue = palette[color] ? palette[color].main : white.main;

    // boxShadow value
    const boxShadowValue = palette[color]
      ? boxShadow([0, 0], [0, 3.2], palette[color].main, 0.5)
      : boxShadow([0, 0], [0, 3.2], white.main, 0.5);

    // border color value
    let borderColorValue = palette[color]
      ? palette[color].main
      : rgba(white.main, 0.75);

    if (color === 'white') {
      borderColorValue = rgba(white.main, 0.75);
    }

    return {
      background: backgroundValue,
      color: colorValue,
      borderColor: borderColorValue,

      '&:hover': {
        background: transparent.main,
        borderColor: colorValue,
      },

      '&:focus:not(:hover)': {
        background: transparent.main,
        boxShadow: boxShadowValue,
      },

      '&:active:not(:hover)': {
        backgroundColor: colorValue,
        color: white.main,
        opacity: 0.85,
      },

      '&:disabled': {
        color: colorValue,
        borderColor: colorValue,
      },
    };
  };
  const gradientStyles = () => {
    const backgroundValue =
      color === 'white' || !gradients[color]
        ? white.main
        : linearGradient(gradients[color].main, gradients[color].state);
    const boxShadowValue = colored[color]
      ? `${boxShadow([0, 3], [3, 0], palette[color].main, 0.15)}, ${boxShadow(
          [0, 3],
          [1, -2],
          palette[color].main,
          0.2
        )}, ${boxShadow([0, 1], [5, 0], palette[color].main, 0.15)}`
      : 'none';
    const hoveredBoxShadowValue = colored[color]
      ? `${boxShadow([0, 14], [26, -12], palette[color].main, 0.4)}, ${boxShadow(
          [0, 4],
          [23, 0],
          palette[color].main,
          0.15
        )}, ${boxShadow([0, 8], [10, -5], palette[color].main, 0.2)}`
      : 'none';
    let colorValue = white.main;
    if (color === 'white') {
      colorValue = text.main;
    } else if (color === 'light') {
      colorValue = gradients.dark.state;
    }

    return {
      background: backgroundValue,
      color: colorValue,
      boxShadow: boxShadowValue,

      '&:hover': {
        backgroundColor: white.main,
        boxShadow: hoveredBoxShadowValue,
      },

      '&:focus:not(:hover)': {
        boxShadow: boxShadowValue,
      },

      '&:disabled': {
        background: backgroundValue,
        color: colorValue,
      },
    };
  };
  const textStyles = () => {
    const colorValue = palette[color] ? palette[color].main : white.main;
    const focusedColorValue = palette[color]
      ? palette[color].focus
      : white.focus;

    return {
      color: colorValue,

      '&:hover': {
        color: focusedColorValue,
      },

      '&:focus:not(:hover)': {
        color: focusedColorValue,
      },
    };
  };
  const circularStyles = () => ({
    borderRadius: borderRadius.section,
  });
  const iconOnlyStyles = () => {
    let sizeValue = pxToRem(38);
    if (size === 'small') {
      sizeValue = pxToRem(25.4);
    } else if (size === 'large') {
      sizeValue = pxToRem(52);
    }

    // padding value
    let paddingValue = `${pxToRem(11)} ${pxToRem(11)} ${pxToRem(10)}`;

    if (size === 'small') {
      paddingValue = pxToRem(4.5);
    } else if (size === 'large') {
      paddingValue = pxToRem(16);
    }

    return {
      width: sizeValue,
      minWidth: sizeValue,
      height: sizeValue,
      minHeight: sizeValue,
      padding: paddingValue,

      '& .material-icons': {
        marginTop: 0,
      },

      '&:hover, &:focus, &:active': {
        transform: 'none',
      },
    };
  };
  const holoStyles = () => {
    const backgroundValue = palette[color]
      ? palette[color].main
      : greenAccent.light;
    const focusedBackgroundValue = palette[color]
      ? palette[color].focus
      : white.focus;
    const hoveredBackgroundValue = palette[color]
      ? rgba(palette[color].main, 0.15)
      : 'rgba(0, 0, 0, 0.075)';
    const boxShadowValue = `0 0 0 4px ${rgba(palette[color].secondary || 'white', 0.4)}`;
    const hoveredBoxShadowValue = `0 0 0 4px ${rgba(palette[color].secondary || 'white', 0.15)}`;
    // const boxShadowValue = colored[color]
    //   ? `${boxShadow([0, 3], [3, 0], palette[color].main, 0.15)}, ${boxShadow(
    //       [0, 3],
    //       [1, -2],
    //       palette[color].main,
    //       0.2
    //     )}, ${boxShadow([0, 1], [5, 0], palette[color].main, 0.15)}`
    //   : 'none';
    // const hoveredBoxShadowValue = colored[color]
    //   ? `${boxShadow([0, 14], [26, -12], palette[color].main, 0.4)}, ${boxShadow(
    //       [0, 4],
    //       [23, 0],
    //       palette[color].main,
    //       0.15
    //     )}, ${boxShadow([0, 8], [10, -5], palette[color].main, 0.2)}`
    //   : 'none';
    let colorValue = white.main;
    if (color === 'default' || !palette[color]) {
      colorValue = text.main;
    } else if (color === 'white' || color === 'light') {
      colorValue = dark.main;
    } else if (
      color === 'primary' ||
      color === 'error' ||
      color === 'dark' ||
      color === 'success'
    ) {
      colorValue = white.main;
    }
    let focusedColorValue = white.main;

    if (color === 'default') {
      focusedColorValue = text.main;
    } else if (color === 'white') {
      focusedColorValue = dark.main;
    } else if (
      color === 'primary' ||
      color === 'error' ||
      color === 'dark' ||
      color === 'secondary' ||
      color === 'success' ||
      color === 'info' ||
      color === 'warning' ||
      color === 'greenAccent'
    ) {
      focusedColorValue = white.main;
    }

    return {
      position: 'relative',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      width: '100%',
      borderRadius: theme.borderRadius,
      transitionProperty: 'color, background, box-shadow',
      transitionDuration: '0.35s',
      fontSize: pxToRem(14),
      background: `${backgroundValue} !important`, // Use !important to override any later conflicting styles
      color: `${colorValue} !important`, // Use !important to override any later conflicting styles

      // color: colorValue,
      boxShadow: boxShadowValue,

      '&:hover': {
        backgroundColor: backgroundValue,
        boxShadow: hoveredBoxShadowValue,
      },

      '&:focus:not(:hover)': {
        backgroundColor: focusedBackgroundValue,
        boxShadow: palette[color]
          ? boxShadow([0, 0], [0, 3.2], palette[color].main, 0.5)
          : boxShadow([0, 0], [0, 3.2], white.main, 0.5),
      },

      '&:disabled': {
        backgroundColor: backgroundValue,
        color: focusedColorValue,
      },
    };
  };

  // const baseStyle = {
  //   // position: 'relative',
  //   // display: 'flex',
  //   // alignItems: 'center',
  //   // justifyContent: 'center',
  //   // width: '100%',
  //   // minWidth: calculateStyles(size).width,
  //   // padding: calculateStyles(size).padding,
  //   // minWidth: customSize === 'md' ? 100 : customSize === 'sm' ? 75 : 140,
  //   // padding: `1.035rem ${theme.lenMd1}`,
  //   // borderRadius: theme.borderRadius,
  //   // fontSize: calculateStyles(size).fontSize,
  //   // transitionProperty: 'color, background, box-shadow',
  //   // transitionDuration: '0.35s',
  //   // background: !color ? greenAccent.light : palette[color].main,
  //   // color: !customTextColor ? grey.blueGrey : 'white',
  //   // boxShadow: isDefault
  //   //   ? `0 0 0 4px ${rgba(theme.colorDefaultBackground || 'white', 0.74)}`
  //   //   : 'none',
  //   // ...(isPrimary && {
  //   //   background: theme.colorPrimary,
  //   //   color: theme.colorPrimaryText,
  //   //   boxShadow: `0 0 0 4px ${rgba(theme.colorPrimary || 'white', 0.4)}`,
  //   // }),
  //   // ...(isError && {
  //   //   background: themeSettings.palette.error.main,
  //   //   color: theme.colorPrimaryText,
  //   //   boxShadow: `0 0 0 4px ${rgba(themeSettings.palette.error.main || 'white', 0.4)}`,
  //   // }),
  //   // ...(isAccent && {
  //   //   background: theme.colorAccent,
  //   //   color: theme.colorAccentText,
  //   //   boxShadow: `0 0 0 4px ${rgba(theme.colorAccent || 'white', 0.4)}`,
  //   // }),
  //   // ...(isDisabled && {
  //   //   background: theme.colorDisabledBackground,
  //   //   color: theme.colorDisabledText,
  //   //   cursor: 'not-allowed',
  //   // }),
  // };
  // // const buttonHoverStyle = {
  // //   position: 'absolute',
  // //   zIndex: 1,
  // //   top: 0,
  // //   left: 0,
  // //   width: '100%',
  // //   height: '100%',
  // //   borderRadius: theme.borderRadius,
  // //   opacity: 0,
  // //   pointerEvents: 'none',
  // //   transition: 'opacity 0.35s',
  // //   background: customColor
  // //     ? rgba(customColor, 0.15) // Lighter shade of customColor if provided
  // //     : 'rgba(0, 0, 0, 0.075)',

  // //   ...(isPrimary && {
  // //     background: rgba(theme.colorPrimary || 'white', 0.15),
  // //   }),
  // //   ...(isError && {
  // //     background: rgba(themeSettings.palette.error.main || 'white', 0.15),
  // //   }),
  // //   ...(isAccent && {
  // //     background: rgba(theme.colorAccent || 'white', 0.15),
  // //   }),
  // //   ...(isDisabled && {
  // //     background: rgba(theme.colorDisabledBackground || 'white', 0.15),
  // //   }),
  // // };
  // // const buttonTextStyle = {
  // //   position: 'relative',
  // //   zIndex: 2,
  // // };
  // // const getPrimaryStyle = (theme, isPrimary) => ({
  // //   background: isPrimary ? theme.colorPrimary : undefined,
  // //   color: isPrimary ? theme.colorPrimaryText : undefined,
  // // });

  return {
    ...(variant === 'contained' && containedStyles()),
    ...(variant === 'outlined' && outlinedStyles()),
    ...(variant === 'gradient' && gradientStyles()),
    ...(variant === 'text' && textStyles()),
    ...(circular && circularStyles()),
    ...(iconOnly && iconOnlyStyles()),
    ...(variant === 'holo' && holoStyles()),
    // ...(variant === 'accent' && accentStyles(theme, true)),
    // ...(variant === 'default' && defaultStyles(theme, true)),
    // ...(variant === 'disabled' && disabledStyles(theme, true)),
    // ...(variant === 'error' && errorStyles(theme, true)),
    // ...(variant === 'success' && successStyles(theme, true)),
  };
});
