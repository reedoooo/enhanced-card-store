import hexToRgba from '../functions/hexToRgba';
const error = {
  main: '#f44336',
  dark: '#d32f2f',
  contrastText: '#fff',
};
const warning = {
  main: '#ff9800',
  dark: '#f57c00',
  light: '#ffb74d',
};
const success = {
  light: '#dcedc8',
  lighter: '#c5e1a5',
  evenLighter: '#aed581',
  lightish: '#9ccc65',
  main: '#8bc34a',
  dark: '#689f38',
  darker: '#558b2f',
  contrastText: '#fff',
  hoverContrastText: '#111',
};
const info = {
  main: '#2196f3',
  dark: '#1976d2',
  light: '#64b5f6',
  contrastText: '#fff',
};
const text = {
  primary: '#212121',
  secondary: '#f5f5f5',
  tertiary: '#ffffff',
};
const divider = 'white';
const action = {
  hover: '#424242',
  disabled: '#eeeeee',
};
const backgroundA = {
  darkest: '#2e7c67', // '#70d8bd',
  darker: '#3da58a',
  dark: '#4cceac',
  default: '#70d8bd', // '#4cceac',
  light: '#94e2cd',
  lighter: '#b7ebde',
  lightest: '#dbf5ee',
  contrastTextA: '#FBFAF2',
  contrastTextB: '#333',
  contrastTextC: '#555',
  contrastTextD: '#000',
  hover: '#4cceac',
};
const backgroundB = {
  darkest: '#111',
  darker: '#222',
  dark: '#333',
  default: '#444',
  light: '#555',
  lighter: '#666',
  lightest: '#777',
  contrastText: '#FBFAF2',
};
const backgroundC = {
  darkest: hexToRgba(backgroundB.darkest, 0.9),
  darker: hexToRgba(backgroundB.darker, 0.8),
  dark: hexToRgba(backgroundB.dark, 0.7),
  default: hexToRgba(backgroundB.default, 0.6),
  light: hexToRgba(backgroundB.light, 0.5),
  lighter: hexToRgba(backgroundB.lighter, 0.4),
  lightest: hexToRgba(backgroundB.lightest, 0.3),
};
const backgroundD = {
  darkest: hexToRgba(backgroundA.darkest, 0.9),
  darker: hexToRgba(backgroundA.darker, 0.7),
  dark: hexToRgba(backgroundA.dark, 0.6),
  default: hexToRgba(backgroundA.default, 0.5),
  light: hexToRgba(backgroundA.light, 0.4),
  lighter: hexToRgba(backgroundA.lighter, 0.3),
  lightest: hexToRgba(backgroundA.lightest, 0.2),
};
const backgroundE = {
  darkest: '#0d5d96',
  darker: '#206d9b',
  dark: '#4e93a6',
  default: '#7cb8b1',
  light: '#8ec7b6',
  lighter: '#b7ebde',
  lightest: '#dbf5ee',
  contrastText: '#FBFAF2',
};
const backgroundF = {
  darkest: hexToRgba(backgroundE.darkest, 0.9),
  darker: hexToRgba(backgroundE.darker, 0.8),
  dark: hexToRgba(backgroundE.dark, 0.7),
  default: hexToRgba(backgroundE.default, 0.6),
  light: hexToRgba(backgroundE.light, 0.5),
  lighter: hexToRgba(backgroundE.lighter, 0.4),
  lightest: hexToRgba(backgroundE.lightest, 0.3),
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

export {
  backgroundA,
  backgroundB,
  backgroundC,
  backgroundD,
  backgroundE,
  backgroundF,
  rarity,
  error,
  warning,
  success,
  info,
  text,
  divider,
  action,
};
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
