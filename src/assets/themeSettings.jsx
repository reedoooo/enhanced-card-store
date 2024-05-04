import {
  boxShadow,
  hexToRgba,
  hexToRgb,
  linearGradient,
  pxToRem,
  rgba,
} from './themes';
import {
  breakpoints,
  colors,
  borders,
  boxShadows,
  typography,
  palette,
} from './themes';
import { Transitions } from './themes';
import components from './themes/components';

export const themeSettings = (mode) => {
  return {
    functions: {
      boxShadow,
      hexToRgb,
      hexToRgba,
      linearGradient,
      pxToRem,
      rgba,
    },
    palette: {
      ...colors,
      mode: mode,
    },
    newPalette: {
      ...palette,
      mode: mode,
    },
    components: {
      ...components,
    },
    breakpoints: breakpoints.values,
    Transitions: Transitions,
    borders: borders,
    boxShadows: boxShadows,
    typography: typography,
    spacing: (factor) => `${0.25 * factor}rem`,
    zIndex: {
      appBar: 1200,
      drawer: 1100,
    },
    // components: {
    //   MuiCssBaseline: components.MuiCssBaseline,
    //   MuiDivider: components.MuiDivider,
    //   MuiTableContainer: components.MuiTableContainer,
    //   MuiTableCell: components.MuiTableCell,
    //   MuiTableHead: components.MuiTableHead,
    //   MuiButton: components.MuiButton,
    //   MuiInput: components.MuiInput,
    //   MuiInputLabel: components.MuiInputLabel,
    //   MuiSlider: components.MuiSlider,
    //   MuiSwitch: components.MuiSwitch,
    //   MuiCard: components.MuiCard,
    //   MuiCardMedia: components.MuiCardMedia,
    //   MuiCardContent: components.MuiCardContent,
    //   MuiTabs: components.MuiTabs,
    //   MuiTab: components.MuiTab,
    // },
  };
};
