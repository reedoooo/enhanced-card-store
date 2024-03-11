import Typography from '@mui/material/Typography';
import styled from 'styled-components';
import { useMode } from '../../../context';

export default styled(Typography)(({ ownerstate }) => {
  // const { palette, typography, functions } = theme;
  const { theme } = useMode();
  const {
    color,
    textTransform,
    verticalAlign,
    fontWeight,
    opacity,
    textGradient,
    darkMode,
  } = ownerstate;
  const { palette } = theme;
  const { gradients, transparent, white } = palette;
  const {
    fontWeightLight,
    fontWeightRegular,
    fontWeightMedium,
    fontWeightBold,
  } = theme.typography;
  // fontWeight styles
  const fontWeights = {
    light: fontWeightLight,
    regular: fontWeightRegular,
    medium: fontWeightMedium,
    bold: fontWeightBold,
  };

  // styles for the typography with textGradient={true}
  const gradientStyles = () => ({
    backgroundImage:
      color !== 'inherit' &&
      color !== 'text' &&
      color !== 'white' &&
      gradients[color]
        ? theme.functions.linearGradient(
            gradients[color].main,
            gradients[color].state
          )
        : theme.functions.linearGradient(
            gradients.dark.main,
            gradients.dark.state
          ),
    display: 'inline-block',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: transparent.main,
    position: 'relative',
    zIndex: 1,
  });

  // color value
  let colorValue =
    color === 'inherit' || !palette[color] ? 'inherit' : palette[color].main;
  // let colorValue = palette[color] ? palette[color].main : white.main;

  if (darkMode && (color === 'inherit' || !palette[color])) {
    colorValue = 'inherit';
  } else if (darkMode && color === 'dark') colorValue = white.main;

  return {
    opacity,
    textTransform,
    verticalAlign,
    textDecoration: 'none',
    color: colorValue,
    fontWeight: fontWeights[fontWeight] && fontWeights[fontWeight],
    ...(textGradient && gradientStyles()),
  };
});
