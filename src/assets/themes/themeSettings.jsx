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
      // MuiContainer: components.MuiContainer,
    },
    // shadows: [
    //   'none',
    //   '0px 2px 1px -1px rgba(0,0,0,0.1),0px 1px 1px 0px rgba(0,0,0,0.06),0px 1px 3px 0px rgba(0,0,0,0.04)', // example for theme.shadows[1]
    //   '0px 3px 1px -2px rgba(0,0,0,0.1),0px 2px 2px 0px rgba(0,0,0,0.06),0px 1px 5px 0px rgba(0,0,0,0.04)', // example for theme.shadows[2]
    //   '0px 3px 3px -2px rgba(0,0,0,0.1),0px 3px 4px 0px rgba(0,0,0,0.06),0px 1px 8px 0px rgba(0,0,0,0.04)', // example for theme.shadows[3]
    //   '0px 2px 4px -1px rgba(0,0,0,0.1),0px 4px 5px 0px rgba(0,0,0,0.06),0px 1px 10px 0px rgba(0,0,0,0.04)', // example for theme.shadows[4]
    //   '0px 3px 5px -1px rgba(0,0,0,0.1),0px 5px 8px 0px rgba(0,0,0,0.06),0px 1px 14px 0px rgba(0,0,0,0.04)', // example for theme.shadows[5]
    //   '0px 3px 5px -1px rgba(0,0,0,0.1),0px 6px 10px 0px rgba(0,0,0,0.06),0px 1px 18px 0px rgba(0,0,0,0.04)', // example for theme.shadows[6]
    //   '0px 4px 5px -2px rgba(0,0,0,0.1),0px 7px 10px 1px rgba(0,0,0,0.06),0px 2px 16px 1px rgba(0,0,0,0.04)', // example for theme.shadows[7]
    //   '0px 5px 5px -3px rgba(0,0,0,0.1),0px 8px 10px 1px rgba(0,0,0,0.06),0px 3px 14px 2px rgba(0,0,0,0.04)', // example for theme.shadows[8]
    //   '0px 5px 6px -3px rgba(0,0,0,0.1),0px 9px 12px 1px rgba(0,0,0,0.06),0px 3px 16px 2px rgba(0,0,0,0.04)', // example for theme.shadows[9]
    //   '0px 5px 15px rgba(0,0,0,0.1)', // example for theme.shadows[10]
    // ],
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
// specialBreakpoints: specialBreakpoints,
// const colorsA = tokens(mode);
// const specialBreakpoints = {
//   isSmUp: (breakpoints) => breakpoints.up('sm'),
//   isMdUp: (breakpoints) => breakpoints.up('md'),
//   isLgUp: (breakpoints) => breakpoints.up('lg'),
//   isXlUp: (breakpoints) => breakpoints.up('xl'),
//   isSmDown: (breakpoints) => breakpoints.down('sm'),
//   isMdDown: (breakpoints) => breakpoints.down('md'),
//   isLgDown: (breakpoints) => breakpoints.down('lg'),
//   isXlDown: (breakpoints) => breakpoints.down('xl'),

//   isXSmall: (breakpoints) => breakpoints.down('xs'),
//   isSmall: (breakpoints) => breakpoints.down('sm'),
//   isSmallMedium: (breakpoints) => breakpoints.up('sm'),
//   isMedium: (breakpoints) => breakpoints.down('md'),
//   isMediumLarge: (breakpoints) => breakpoints.up('md'),
//   isLarge: (breakpoints) => breakpoints.up('lg'),
//   isXLarge: (breakpoints) => breakpoints.up('xl'),
// };
