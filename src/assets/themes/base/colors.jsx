import hexToRgba from '../functions/hexToRgba';
import {
  backgroundA,
  backgroundB,
  backgroundE,
  rarity,
} from './customColorPalettes';
const colors = {
  // transparent: 'transparent',
  // PRIMARY COLORS
  backgroundA,
  backgroundD: {
    darkest: hexToRgba(backgroundA.darkest, 0.9),
    darker: hexToRgba(backgroundA.darker, 0.7),
    dark: hexToRgba(backgroundA.dark, 0.6),
    default: hexToRgba(backgroundA.default, 0.5),
    light: hexToRgba(backgroundA.light, 0.4),
    lighter: hexToRgba(backgroundA.lighter, 0.3),
    lightest: hexToRgba(backgroundA.lightest, 0.2),
    contrastText: '#FBFAF2',
  },
  // SECONDARY COLORS
  backgroundB,
  backgroundC: {
    darkest: hexToRgba(backgroundB.darkest, 0.9),
    darker: hexToRgba(backgroundB.darker, 0.8),
    dark: hexToRgba(backgroundB.dark, 0.7),
    default: hexToRgba(backgroundB.default, 0.6),
    light: hexToRgba(backgroundB.light, 0.5),
    lighter: hexToRgba(backgroundB.lighter, 0.4),
    lightest: hexToRgba(backgroundB.lightest, 0.3),
    contrastText: '#FBFAF2',
  },
  // TERTIARY COLORS
  backgroundE,
  // COLORS FOR CARD RARITY OVERLAY
  rarity,
  // CARD RARITY OVERLAYS
  rarityOverlay: {
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
  },
  background: {
    default: '#f0f2f5',
  },
  // OTHER COLORS
  text: {
    main: '#7b809a',
    focus: '#7b809a',
  },

  transparent: {
    main: 'transparent',
  },

  white: {
    main: '#ffffff',
    focus: '#ffffff',
  },

  black: {
    light: '#000000',
    main: '#000000',
    focus: '#000000',
  },

  primary: {
    main: '#e91e63',
    focus: '#e91e63',
  },

  secondary: {
    main: '#7b809a',
    focus: '#8f93a9',
  },
  light: {
    main: '#f0f2f5',
    focus: '#f0f2f5',
  },

  dark: {
    main: '#344767',
    focus: '#2c3c58',
  },

  grey: {
    100: '#f8f9fa',
    200: '#f0f2f5',
    300: '#dee2e6',
    400: '#ced4da',
    500: '#adb5bd',
    600: '#6c757d',
    700: '#495057',
    800: '#343a40',
    900: '#212529',
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
      main: '#66BB6A',
      state: '#43A047',
    },

    warning: {
      main: '#FFA726',
      state: '#FB8C00',
    },

    error: {
      main: '#EF5350',
      state: '#E53935',
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
  },

  inputBorderColor: '#d2d6da',

  tabs: {
    indicator: { boxShadow: '#ddd' },
  },
  // info: {
  //   main: '#1A73E8',
  //   focus: '#1662C4',
  // },

  // success: {
  //   main: '#4CAF50',
  //   focus: '#67bb6a',
  // },

  // warning: {
  //   main: '#fb8c00',
  //   focus: '#fc9d26',
  // },

  // error: {
  //   main: '#F44335',
  //   focus: '#f65f53',
  // },
};

export default colors;
