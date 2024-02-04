import hexToRgba from '../functions/hexToRgba';

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
  rarity,
};
