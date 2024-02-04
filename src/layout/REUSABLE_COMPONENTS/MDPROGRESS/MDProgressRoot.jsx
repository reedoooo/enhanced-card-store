/**
=========================================================
* Material Dashboard 2 React - v2.2.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-dashboard-react
* Copyright 2023 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

// @mui material components
import { styled } from '@mui/material/styles';
import LinearProgress from '@mui/material/LinearProgress';

export default styled(LinearProgress)(({ theme, ownerstate }) => {
  const { palette, functions } = theme;
  const { color, value, variant } = ownerstate;

  const { text, gradients } = palette;

  // background value
  let backgroundValue;

  if (variant === 'gradient') {
    backgroundValue = gradients[color]
      ? theme.functions.linearGradient(
          gradients[color].main,
          gradients[color].state
        )
      : theme.functions.linearGradient(
          gradients.info.main,
          gradients.info.state
        );
  } else {
    backgroundValue = palette[color] ? palette[color].main : palette.info.main;
  }

  return {
    '& .MuiLinearProgress-bar': {
      background: backgroundValue,
      width: `${value}%`,
      color: text.main,
    },
  };
});
