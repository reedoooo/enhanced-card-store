import hexToRgba from '../functions/hexToRgba';
import {
  rarityOverlay,
  chartTheme,
  rarity,
  info,
  warning,
  success,
  error,
  text,
  divider,
  action,
  primary,
  secondary,
  grey,
  greenAccent,
  redAccent,
  blueAccent,
  customDarkTheme,
  white,
  black,
  myGradients,
} from './customColorPalettes';
const colors = {
  chartTheme: chartTheme,
  background: {
    default: '#f0f2f5',
    paper: '#fff',
  },
  greenAccent: greenAccent,
  redAccent: redAccent,
  blueAccent: blueAccent,
  customDarkTheme: customDarkTheme,
  // COLORS FOR CARD RARITY OVERLAY
  rarity,
  // CARD RARITY OVERLAYS
  rarityOverlay,
  // TEXT COLORS
  text,
  // DIVIDER COLORS
  divider,
  // ACTION COLORS
  action,
  // INFO COLORS
  info,
  // SUCCESS COLORS
  success,
  // WARNING COLORS
  warning,
  // ERROR COLORS
  error,
  grey,
  white,
  black,
  transparent: {
    main: 'transparent',
  },
  primary,
  secondary,
  light: {
    main: '#f0f2f5',
    focus: '#f0f2f5',
  },
  dark: {
    main: '#344767',
    focus: '#2c3c58',
    state: '#191919',
  },
  gradients: {
    primary: {
      main: '#EC407A',
      state: '#D81B60',
    },

    secondary: {
      main: '#747b8a',
      state: '#495361',
    },

    info: {
      main: '#49a3f1',
      state: '#1A73E8',
    },

    success: {
      main: '#5CDB95',
      state: '#43A047',
    },

    warning: {
      main: '#FFA726',
      state: '#FB8C00',
    },

    error: {
      main: '#EF5350',
      state: '#E53935',
      dark: '#C62828',
      darker: '#D32F2F',
      evenDarker: '#DC143C',
    },

    light: {
      main: '#EBEFF4',
      state: '#CED4DA',
    },

    dark: {
      main: '#42424a',
      state: '#191919',
    },
  },
  socialMediaColors: {
    facebook: {
      main: '#3b5998',
      dark: '#344e86',
    },

    twitter: {
      main: '#55acee',
      dark: '#3ea1ec',
    },

    instagram: {
      main: '#125688',
      dark: '#0e456d',
    },

    linkedin: {
      main: '#0077b5',
      dark: '#00669c',
    },

    pinterest: {
      main: '#cc2127',
      dark: '#b21d22',
    },

    youtube: {
      main: '#e52d27',
      dark: '#d41f1a',
    },

    vimeo: {
      main: '#1ab7ea',
      dark: '#13a3d2',
    },

    slack: {
      main: '#3aaf85',
      dark: '#329874',
    },

    dribbble: {
      main: '#ea4c89',
      dark: '#e73177',
    },

    github: {
      main: '#24292e',
      dark: '#171a1d',
    },

    reddit: {
      main: '#ff4500',
      dark: '#e03d00',
    },

    tumblr: {
      main: '#35465c',
      dark: '#2a3749',
    },
  },
  badgeColors: {
    primary: {
      background: '#f8b3ca',
      text: '#cc084b',
    },

    secondary: {
      background: '#d7d9e1',
      text: '#6c757d',
    },

    info: {
      background: '#aecef7',
      text: '#095bc6',
    },

    success: {
      background: '#bce2be',
      text: '#339537',
    },

    warning: {
      background: '#ffd59f',
      text: '#c87000',
    },

    error: {
      background: '#fcd3d0',
      text: '#f61200',
    },

    light: {
      background: '#ffffff',
      text: '#c7d3de',
    },

    dark: {
      background: '#8097bf',
      text: '#1e2e4a',
    },
  },
  coloredShadows: {
    primary: '#e91e62',
    secondary: '#110e0e',
    info: '#00bbd4',
    success: '#4caf4f',
    warning: '#ff9900',
    error: '#f44336',
    light: '#adb5bd',
    dark: '#404040',
    greenAccent: '#4caf4f',
    redAccent: '#f44336',
    blueAccent: '#2196f3',
  },
  inputBorderColor: '#d2d6da',
  tabs: {
    indicator: { boxShadow: '#ddd' },
  },
  // inputBorderColor: {
  //   main: '#d2d6da',
  //   hover: '#b3b9c2',
  //   active: '#9499a2',
  //   disabled: '#d2d6da',
  //   error: '#f44336',
  //   success: '#4caf4f',
  //   warning: '#ff9900',
  //   info: '#00bbd4',
  //   light: '#adb5bd',
  //   dark: '#404040',
  // },
};

export default colors;
