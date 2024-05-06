import { rgba } from '../functions';
import hexToRgba from '../functions/hexToRgba';
const colorTextForDark = rgba('white', 0.96);
// -------------------------------------------
// --------------- MAIN COLORS ---------------
// -------------------------------------------
const error = {
  light: '#e57373',
  main_light: '#af3f3b',
  main_darkest: '#2c100f',
  main: '#f44336',
  secondary: '#f44336',
  focus: rgba('#f44336' || 'white', 0.15),
  dark: '#d32f2f',
  darkest: '#7f2e2eff',
  contrastText: '#fff',
  hoverContrastText: colorTextForDark,
};
const warning = {
  light: '#ffb74d',
  main: '#ff9800',
  focus: '#ff9800',
  dark: '#f57c00',
  secondary: '#ff5722',
};
const success = {
  light: '#70d8bd',
  main_light: '#4cceac',
  main_lighter: '#b7ebde',
  main_emerald: '#06d6a0ff',
  main: '#18b984',
  secondary: '#5CDB95',
  tertiary: '#5fe7bb',
  focus: rgba('#18b984' || 'white', 0.15),
  secondaryFocus: rgba('#5CDB95' || 'white', 0.15),
  dark: '#3da58a',
  darkest: '#2e7c67', // '#70d8bd',
  contrastText: '#dbf5ee',
  contrastText2: '#ecfdf9',
  hoverContrastText: colorTextForDark,
};
const info = {
  main: '#3781F1',
  secondary: '#3781F1',
  // main: '#2196f3',
  dark: '#1976d2',
  light: '#64b5f6',
  focus: '#64b5f6',
  contrastText: '#fff',
};
const grey = {
  lighterSimpleGrey: '#777',
  simpleGrey: '#333',
  clearGrey: hexToRgba('#444', 0.6),
  black: '#040509',
  blueGrey: '#141b2d',
  lightBlueGrey: '#1F2A40',
  darkest: '#141414',
  darker: '#292929',
  dark: '#3d3d3d',
  default: '#525252',
  light: '#666666',
  lighter: '#858585',
  lightest: '#a3a3a3',
  evenLighter: '#c2c2c2',
  contrastText: '#e0e0e0',
  main: '#e0e0e0',
};
const white = {
  main: '#ffffff',
  focus: '#E8E8E8',
};
const black = {
  darker: '#040509',
  dark: '#0B0C0E',
  darkest: '#141414',
  main: '#1C1C1C',
  light: '#212121',
  focus: '#26242C',
};
// -------------------------------------------
// --------------- RANDOM COLORS -------------
// -------------------------------------------
const primary = {
  darkest: '#040509',
  darker: '#040509',
  dark: '#040509',
  default: '#f2f0f0',
  light: '#141b2d',
  lighter: '#1F2A40',
  lightest: '#727681',
  evenLighter: '#8c8c8c',
  contrastText: '#e0e0e0',
  secondary: '#f2f0f0',
  main: '#141b2d',
  focus: '#141b2d',
  hoverContrastText: colorTextForDark,
};
const secondary = {
  main: '#8c8c8c',
  focus: '#8f93a9',
  hoverContrastText: colorTextForDark,
  contrastText: '#e0e0e0',
  secondary: '#8c8c8c',
};
const rarity = {
  common: '#C0C0C0', // Silver
  uncommon: '#B8860B', // DarkGoldenRod
  rare: '#FFD700', // Gold
  super: '#00BFFF', // DeepSkyBlue
  ultra: '#FF6347', // Tomato
  secret: '#800080', // Purple
  ghost: '#F8F8FF', // GhostWhite
  starlight: '#F0E68C', // Khaki
  prismatic: '#E6E6FA', // Lavender
  collector: '#DAA520', // GoldenRod
  shortPrint: '#778899', // LightSlateGrey
  parallel: '#BA55D3', // MediumOrchid
  qcr: '#FF4500', // OrangeRed
  // Add more rarities as needed
};
const rarityOverlay = {
  common: hexToRgba(rarity.common, 0.5),
  uncommon: hexToRgba(rarity.uncommon, 0.5),
  rare: hexToRgba(rarity.rare, 0.5),
  super: hexToRgba(rarity.super, 0.5),
  ultra: hexToRgba(rarity.ultra, 0.5),
  secret: hexToRgba(rarity.secret, 0.5),
  ghost: hexToRgba(rarity.ghost, 0.5),
  starlight: hexToRgba(rarity.starlight, 0.5),
  prismatic: hexToRgba(rarity.prismatic, 0.5),
  collector: hexToRgba(rarity.collector, 0.5),
  shortPrint: hexToRgba(rarity.shortPrint, 0.5),
  parallel: hexToRgba(rarity.parallel, 0.5),
  qcr: hexToRgba(rarity.qcr, 0.5),
  // Add more rarities as needed
};
const text = {
  primary: '#212121',
  secondary: '#3d3d3d',
  main: '#3d3d3d', // '#424242',
  focus: '#212121',
  dark: '#424242',
  colorText: '#343239',
  colorPrimaryText: rgba('white', 0.96),
  colorLabel: '#A4A3A6',
  contrastText: '#ffffff',
};
const divider = 'white';
const action = {
  hover: '#424242',
  disabled: '#eeeeee',
};
const inputBorderColor = '#d2d6da';
const tabs = {
  indicator: { boxShadow: '#ddd' },
};
const transparent = {
  main: 'transparent',
};
const light = {
  main: '#f0f2f5',
  focus: '#f0f2f5',
};
const dark = {
  main: '#344767',
  focus: '#2c3c58',
  state: '#191919',
};
const background = {
  default: '#f0f2f5',
  paper: '#fff',
};
const colors = {
  rarity,
  rarityOverlay,

  info,
  success,
  warning,
  error,
  grey,

  white,
  black,
  light,
  dark,
  transparent,

  primary,
  secondary,

  tabs,
  inputBorderColor,
  text,
  divider,
  action,

  background,

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
    primary: '#e91e63',
    secondary: '#110e0e',
    info: '#00bbd4',
    success: '#4caf4f',
    warning: '#ff9900',
    error: '#f44336',
    light: '#adb5bd',
    dark: '#404040',
  },
  inputColors: {
    borderColor: { main: '#d2d6da', focus: '#35d1f5' },
    boxShadow: '#81e3f9',
    error: '#fd5c70',
    success: '#66d432',
  },
};

export default colors;
