import colors from './base/colors';
import components from './components/index';
import borders from './base/borders';
import boxShadows from './base/boxShadows';
import typography from './base/typography';
import boxShadow from './functions/boxShadow';
import hexToRgb from './functions/hexToRgb';
import linearGradient from './functions/linearGradient';
import pxToRem from './functions/pxToRem';
import rgba from './functions/rgba';
import breakpoints from './base/breakpoints';
import Transitions from './Transitions';
import palette from './base/palette';

export const themeSettings = (mode) => {
  return {
    functions: {
      boxShadow,
      hexToRgb,
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
    breakpoints: breakpoints.values,
    Transitions: Transitions,
    borders: borders,
    boxShadows: boxShadows,
    typography: typography,
    spacing: (factor) => `${0.25 * factor}rem`,
    // shape: {
    //   borderRadius: 4,
    //   borderRadiusLarge: 8,
    //   borderRadiusExtraLarge: 16,
    // },
    zIndex: {
      appBar: 1200,
      drawer: 1100,
    },
    components: {
      MuiCssBaseline: components.MuiCssBaseline,
      MuiDivider: components.MuiDivider,
      MuiTableContainer: components.MuiTableContainer,
      MuiTableCell: components.MuiTableCell,
      MuiTableHead: components.MuiTableHead,
      MuiButton: components.MuiButton,
      MuiInput: components.MuiInput,
      MuiInputLabel: components.MuiInputLabel,
      MuiSlider: components.MuiSlider,
      MuiSwitch: components.MuiSwitch,
      MuiCard: components.MuiCard,
      MuiCardMedia: components.MuiCardMedia,
      MuiCardContent: components.MuiCardContent,
      MuiTabs: components.MuiTabs,
      MuiTab: components.MuiTab,
    },
  };
};
