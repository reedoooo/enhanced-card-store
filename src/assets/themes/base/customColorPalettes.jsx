import hexToRgba from '../functions/hexToRgba';
import rgba from '../functions/rgba';
const colorTextForDark = rgba('white', 0.96);
// -------------------------------------------
// --------------- MAIN COLORS ---------------
// -------------------------------------------
const error = {
  light: '#e57373',
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
const greenPalette = {
  50: '#b7ebde', // Even lighter than the lightest
  100: '#94e2cd', // Lightest shade
  200: '#70d8bd', // Lighter shade
  300: '#4cceac', // Light shade, also 'crystalGreen' with opacity adjusted for full hex
  400: '#3da58a', // Default, mid-light
  500: '#18b984', // Main green used in the primary color
  600: '#159b76', // Slightly darker and less saturated than 500
  700: '#12875f', // Darker and more muted green
  800: '#0f7348', // Dark, rich green
  900: '#2e7c67', // Darkest shade, used for the deepest contrast
  contrastText: '#dbf5ee', // Lightest contrast text
  main: '#18b984', // Primary main color
  focus: 'rgba(24, 185, 132, 0.15)', // Focus state with opacity
  hoverContrastText: 'white', // Text color for hover states
};
const redPalette = {
  50: '#f8dcdb', // Even lighter than the lightest
  100: '#f1b9b7', // Lightest
  200: '#e99592', // Lighter
  300: '#e2726e', // Light shade
  400: '#db4f4a', // Default, main used color
  500: '#af3f3b', // Mid-dark, more saturation
  600: '#832f2c', // Darker and more intense
  700: '#58201e', // Even darker, rich depth
  800: '#2c100f', // Darkest shade, for deep contrast
  contrastText: '#f8dcdb', // Lightest contrast text
  main: '#db4f4a', // Primary main color
  focus: 'rgba(219, 79, 74, 0.15)', // Focus state with opacity
  hoverContrastText: 'white', // Text color for hover states
};
const bluePalette = {
  50: '#e1e2fe', // Even lighter than the lightest
  100: '#c3c6fd', // Lightest
  200: '#a4a9fc', // Lighter
  300: '#868dfb', // Light shade
  400: '#6870fa', // Default, main used color
  500: '#535ac8', // Mid-dark, more saturation
  600: '#3e4396', // Darker and more intense
  700: '#2a2d64', // Even darker, rich depth
  800: '#151632', // Darkest shade, for deep contrast
  contrastText: '#e1e2fe', // Lightest contrast text
  main: '#6870fa', // Primary main color
  focus: 'rgba(104, 112, 250, 0.15)', // Focus state with opacity
  hoverContrastText: 'white', // Text color for hover states
};

const redAccent = {
  darkest: '#2c100f',
  darker: '#58201e',
  dark: '#832f2c',
  default: '#af3f3b',
  light: '#db4f4a',
  lighter: '#e2726e',
  lightest: '#e99592',
  evenLighter: '#f1b9b7',
  contrastText: '#f8dcdb',
  secondary: '#f1b9b7',
  main: '#db4f4a',
  focus: rgba('#db4f4a' || 'white', 0.15),
  hoverContrastText: colorTextForDark,
};
const blueAccent = {
  darkest: '#151632',
  darker: '#2a2d64',
  dark: '#3e4396',
  default: '#535ac8',
  light: '#6870fa',
  lighter: '#868dfb',
  lightest: '#a4a9fc',
  evenLighter: '#c3c6fd',
  contrastText: '#e1e2fe',
  secondary: '#c3c6fd',
  main: '#6870fa',
  focus: rgba('#6870fa' || 'white', 0.15),
  hoverContrastText: colorTextForDark,
};
const myGradients = {
  primary: {
    main: '#0172AF',
    state: '#74FEBD',
    value: 'linear-gradient(180deg, #0172AF 0%, #74FEBD 100%)',
  },
  secondary: {
    main: '#FF8473',
    state: '#FFF9d2',
    value: 'linear-gradient(180deg, #FF8473 0%, #FFF9d2 100%)',
  },
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
const chartTheme = {
  primary,
  grey,
  redAccent,
  blueAccent,
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
export {
  chartTheme,
  rarityOverlay,
  rarity,
  error,
  warning,
  success,
  info,
  text,
  divider,
  action,
  primary,
  secondary,
  grey,
  redAccent,
  blueAccent,
  myGradients,
  white,
  black,
};
