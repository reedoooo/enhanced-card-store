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
    shape: {
      borderRadius: 4,
      borderRadiusLarge: 8,
      borderRadiusExtraLarge: 16,
    },
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
    },
    skeletonLayouts: {
      tertiaryContent: {
        xs: 12,
        sm: 12,
        md: 12,
        gap: 3,
        baseSkeletons: [
          { variant: 'rectangular', height: 60 },
          { variant: 'text', width: '80%' },
          { variant: 'text', width: '70%' },
          { variant: 'text', width: '60%' },
        ],
      },
      secondaryContent: {
        xs: 12,
        sm: 6,
        md: 6,
        gap: 2,
        baseSkeleton: { variant: 'rectangular', height: 200 },
      },
      mainContentFeatureCard: {
        xs: 12,
        sm: 12,
        md: 4,
        gap: 2,
        baseSkeletons: [
          { variant: 'rectangular', height: 180 },
          { variant: 'text' },
          { variant: 'text' },
          { variant: 'text' },
        ],
      },
    },
  };
};
