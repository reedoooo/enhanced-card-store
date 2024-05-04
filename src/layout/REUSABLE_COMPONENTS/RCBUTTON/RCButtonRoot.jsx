import { Button } from '@mui/material';
import styled from 'styled-components';
import { useMode } from 'context';

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
    borderRadius: borderRadius.xl,
  });
  const iconOnlyStyles = () => {
    let sizeValue = pxToRem(38);
    if (size === 'small') {
      sizeValue = pxToRem(25.4);
    } else if (size === 'large') {
      sizeValue = pxToRem(52);
    }
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
      : success.main_light;
    const focusedBackgroundValue = palette[color]
      ? palette[color].focus
      : white.focus;
    const hoveredBackgroundValue = palette[color]
      ? rgba(palette[color].main, 0.15)
      : 'rgba(0, 0, 0, 0.075)';
    const boxShadowValue = `0 0 0 4px ${rgba(palette[color].secondary || 'white', 0.4)}`;
    const hoveredBoxShadowValue = `0 0 0 4px ${rgba(palette[color].secondary || 'white', 0.15)}`;

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
      borderRadius: borderRadius.md,
      transitionProperty: 'color, background, box-shadow',
      transitionDuration: '0.35s',
      // fontSize: pxToRem(14),
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

  return {
    ...(variant === 'contained' && containedStyles()),
    ...(variant === 'outlined' && outlinedStyles()),
    ...(variant === 'gradient' && gradientStyles()),
    ...(variant === 'text' && textStyles()),
    ...(circular && circularStyles()),
    ...(iconOnly && iconOnlyStyles()),
    ...(variant === 'holo' && holoStyles()),
  };
});
