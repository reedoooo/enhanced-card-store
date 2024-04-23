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
  light: '#70d8bd', // '#4cceac',
  main: '#18b984',
  secondary: '#5CDB95',
  focus: rgba('#18b984' || 'white', 0.15),
  secondaryFocus: rgba('#5CDB95' || 'white', 0.15),
  dark: '#3da58a',
  darkest: '#2e7c67', // '#70d8bd',
  contrastText: '#fff',
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
  white: '#f2f0f0',
  blueGrey: '#141b2d',
  lightBlueGrey: '#1F2A40',
  darkest: '#141414',
  darker: '#292929',
  dark: '#3d3d3d',
  default: '#525252',
  light: '#666666',
  lighter: '#858585',
  lighter2: '#8c8c8c',
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
  light: '#212121',
  main: '#1C1C1C',
  focus: '#26242C',
  dark: '#0B0C0E',
};
const greenAccent = {
  crystalGreen: hexToRgba('#4cceac', 0.6),
  darkCerulean: hexToRgba('#0d5d96', 0.9),
  greyGreen: '#A5C8D2',
  greenBlue: hexToRgba('#4e93a6', 0.8),
  pureGreenBlue: '#4e93a6',
  emerald: '#06d6a0ff',
  lighterSeaGreen: '#8ec7b6',
  lightSeaGreen: '#0cb0a9ff',
  darkest: '#0f2922', // Assuming this is the darkest
  darker: '#1e5245', // Next darker shade
  dark: '#2e7c67', // Next dark shade
  default: '#3da58a', // Default considered here as the mid-point
  main: '#18b984',
  focus: rgba('#18b984' || 'white', 0.15),
  light: '#4cceac', // Light shade
  lighter: '#70d8bd', // Lighter shade
  lightest: '#94e2cd', // Lightest shade
  evenLighter: '#b7ebde', // Even lighter than the lightest
  contrastText: '#dbf5ee', // Most contrasting or lightest, could be adjusted
  secondary: '#5CDB95',
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
  greenAccent,
  redAccent,
  blueAccent,
};
const customDarkTheme = {
  text: {
    light: '#e0e0e0',
    dark: '#141414',
    default: '#3d3d3d',
    contrastText: '#fff',
    color: '#70d8bd',
  },
  background: {
    grey: {
      darkest: '#141414',
      darker: '#292929',
      dark: '#3d3d3d',
      default: '#525252',
      light: '#666666',
      lighter: '#858585',
      lightest: '#a3a3a3',
      evenLighter: '#c2c2c2',
      contrastText: '#e0e0e0',
    },
    primary: {
      darkest: '#040509',
      darker: '#040509',
      dark: '#040509',
      default: '#f2f0f0',
      light: '#141b2d',
      lighter: '#1F2A40',
      lightest: '#727681',
      evenLighter: '#8c8c8c',
      contrastText: '#e0e0e0',
    },
    secondary: {},
    greenAccent: {
      darkest: '#0f2922', // Assuming this is the darkest
      darker: '#1e5245', // Next darker shade
      dark: '#2e7c67', // Next dark shade
      default: '#3da58a', // Default considered here as the mid-point
      light: '#4cceac', // Light shade
      lighter: '#70d8bd', // Lighter shade
      lightest: '#94e2cd', // Lightest shade
      evenLighter: '#b7ebde', // Even lighter than the lightest
      contrastText: '#dbf5ee', // Most contrasting or lightest, could be adjusted
    },
    redAccent: {
      darkest: '#2c100f',
      darker: '#58201e',
      dark: '#832f2c',
      default: '#af3f3b',
      light: '#db4f4a',
      lighter: '#e2726e',
      lightest: '#e99592',
      evenLighter: '#f1b9b7',
      contrastText: '#f8dcdb',
    },
    blueAccent: {
      darkest: '#151632',
      darker: '#2a2d64',
      dark: '#3e4396',
      default: '#535ac8',
      light: '#6870fa',
      lighter: '#868dfb',
      lightest: '#a4a9fc',
      evenLighter: '#c3c6fd',
      contrastText: '#e1e2fe',
    },
  },
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
  // main: '#212121',
  main: '#3d3d3d', // '#424242',
  focus: '#212121',
  dark: '#424242',
  primary: '#212121',
  secondary: '#f5f5f5',
  tertiary: '#ffffff',
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
  customDarkTheme,
  grey,
  greenAccent,
  redAccent,
  blueAccent,
  myGradients,
  white,
  black,
};
// const backgroundA = {
//   darkest: '#2e7c67', // '#70d8bd',
//   darker: '#3da58a',
//   dark: '#4cceac',
//   default: '#70d8bd', // '#4cceac',
//   light: '#94e2cd',
//   lighter: '#b7ebde',
//   lightest: '#dbf5ee',
//   contrastTextA: '#FBFAF2',
//   contrastTextB: '#333',
//   contrastTextC: '#555',
//   contrastTextD: '#000',
//   hover: '#4cceac',
// };
// main: '#4caf50',
// dark: '#388e3c',
// main: '#4cceac',
// focus: '#4cceac',
// contrastText: colorTextForDark,
// hoverContrastText: '#111',
// error: {
//   main: colorsA.redAccent[500],
//   dark: colorsA.redAccent[700],
//   contrastText: '#fff',
// },
// warning: {
//   main: colorsA.redAccent[500],
//   dark: colorsA.redAccent[700],
//   light: colorsA.redAccent[200],
// },
// success: {
//   light: colorsA.greenAccent[100],
//   lighter: colorsA.greenAccent[200],
//   evenLighter: colorsA.greenAccent[300],
//   lightish: colorsA.greenAccent[400],
//   main: colorsA.greenAccent[500],
//   dark: colorsA.greenAccent[200],
//   darker: colorsA.greenAccent[600],
//   contrastText: '#fff',
//   hoverContrastText: '#111',
// },
// info: {
//   main: colorsA.blueAccent[500],
//   dark: colorsA.blueAccent[700],
//   light: colorsA.blueAccent[200],
//   contrastText: '#fff',
// },
// text: {
//   primary: colorsA.grey[900],
//   secondary: colorsA.grey[300],
//   tertiary: colorsA.grey[100],
// },
// divider: 'white',
// action: {
//   hover: colorsA.grey[800],
//   disabled: colorsA.grey[200],
// },
// const backgroundB = {
//   darkest: '#111',
//   darker: '#222',
//   dark: '#333',
//   default: '#444',
//   light: '#555',
//   lighter: '#666',
//   lightest: '#777',
//   contrastText: '#FBFAF2',
// };
// const backgroundG = {
//   darkest: '#073b4cff', // --midnight-green--
//   darker: '#0c637fff', // --cerulean--
//   dark: '#118ab2ff', // --blue-ncs--
//   default: '#0cb0a9ff', // --light-sea-green--
//   light: '#06d6a0ff', // --emerald--
//   lighter: '#91dacbff', // --tiffany-blue--
//   lightest: '#c8ede5ff', // --mint-green--
//   contrastText: '#fff',
// };
// const backgroundGSecondary = {
//   darkest: '#7f2e2eff', // --persian-plum--
//   darker: '#a63c3cff', // --pomegranate--
//   dark: '#cc4a4aff', // --flamingo--
//   default: '#e55e5eff', // --sunset-orange--
//   light: '#f4755fff', // --bittersweet--
//   lighter: '#f89a7dff', // --rajah--
//   lightest: '#facbb0ff', // --navajo-white--
//   contrastText: '#fff',
// };
// const backgroundC = {
//   darkest: hexToRgba(backgroundB.darkest, 0.9),
//   darker: hexToRgba(backgroundB.darker, 0.8),
//   dark: hexToRgba(backgroundB.dark, 0.7),
//   default: hexToRgba(backgroundB.default, 0.6),
//   light: hexToRgba(backgroundB.light, 0.5),
//   lighter: hexToRgba(backgroundB.lighter, 0.4),
//   lightest: hexToRgba(backgroundB.lightest, 0.3),
// };
// const backgroundD = {
//   darkest: hexToRgba(greenAccent.dark, 0.9),
//   darker: hexToRgba(greenAccent.default, 0.7),
//   dark: hexToRgba('#4cceac', 0.6),
//   default: hexToRgba(greenAccent.lighter, 0.5),
//   light: hexToRgba(greenAccent.lightest, 0.4),
//   lighter: hexToRgba(backgroundA.lighter, 0.3),
//   lightest: hexToRgba(greenAccent.contrastText, 0.2),
// };
// const backgroundF = {
//   darkest: hexToRgba(backgroundE.darkest, 0.9),
//   darker: hexToRgba(backgroundE.darker, 0.8),
//   dark: hexToRgba(backgroundE.dark, 0.7),
//   default: hexToRgba(backgroundE.default, 0.6),
//   main: hexToRgba(backgroundE.main, 0.5),
//   focus: hexToRgba(backgroundE.focus, 0.4),
//   light: hexToRgba(backgroundE.light, 0.5),
//   lighter: hexToRgba(backgroundE.lighter, 0.4),
//   lightest: hexToRgba(backgroundE.lightest, 0.3),
// };
// const backgroundE = {
//   darkest: '#0d5d96', // - colorname: 'dark-cerulean' - hex: '#0d5d96' - rgb: 'rgb(13, 93, 150)' - hsl: 'hsl(209, 84%, 32%)'
//   darker: '#206d9b', // - colorname: 'dark-blue' - hex: '#206d9b
//   dark: '#4e93a6', // - colorname: 'blue' - hex: '#4e93a6' - rgb: 'rgb(78, 147, 166)' - hsl: 'hsl(194, 35%, 47%)'
//   default: '#7cb8b1',
//   main: '#7cb8b1',
//   focus: '#7cb8b1',
//   light: '#8ec7b6',
//   lightBlue: '#57909F',
//   lighter: '#b7ebde',
//   lighterBlue: '#7EACB9',
//   lightest: '#dbf5ee',
//   lightestBlue: '#A5C8D2',
//   contrastText: '#FBFAF2',
// };
