import rgba from '../functions/rgba';
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
const palette = {
  primary: {
    lighter: '#94e2cd',
    light: '#4cceac',
    main: '#18b984',
    secondary: '#5CDB95',
    tertiary: '#5fe7bb',
    dark: '#2e7c67',
    focus: rgba('#18b984' || 'white', 0.15),
    contrastText: '#dbf5ee',
  },
  secondary: {
    light: '#5c7cfa',
    main: '#3a539b',
    dark: '#293f66',
    focus: rgba('#3a539b' || 'white', 0.15),
    contrastText: '#eef2f6',
  },
  text: {
    primary: '#212121',
    secondary: '#3d3d3d',
    contrastText: '#ffffff',
  },
  grey: {
    50: '#f8fafc',
    100: '#eef2f6',
    200: '#e3e8ef',
    300: '#cdd5df',
    400: '#8993a5', // Assuming you might need a grey400, placed logically in sequence
    500: '#697586',
    600: '#4b5565',
    700: '#364152',
    800: '#232a3b', // Assuming grey800, filled logically between grey700 and grey900
    900: '#121926',
  },
  black: {
    light: '#212121',
    main: '#1C1C1C',
    focus: '#26242C',
    dark: '#0B0C0E',
  },
  white: {
    main: '#ffffff',
    focus: '#E8E8E8',
  },
  info: {
    light: '#90caf9',
    focus: '#64b5f6',
    main: '#49a3f1',
    dark: '#1A73E8',
  },
  success: {
    light: '#b9f6ca',
    focus: '#69f0ae',
    main: '##00e676',
    dark: '#00c853',
  },
  warning: {
    light: '#fff8e1',
    focus: '#ffecb3',
    main: '#ffe57f',
    dark: '#ffc107',
  },
  error: {
    light: '#ef9a9a',
    focus: '#e57373',
    main: '#f44336',
    dark: '#c62828',
  },
  light: {
    main: '#EBEFF4',
    state: '#CED4DA',
  },
  dark: {
    level1: '#29314f',
    level2: '#212946',
    level3: '#1a223f',
    level4: '#111936',
    textTitle: '#dbf5ee',
    textPrimary: '#b7ebde',
    textSecondary: '#94e2cd',
    // textTitle: '#d7dcec',
    // textPrimary: '#bdc8f0',
    // textSecondary: '#8492c4',
  },
  transparent: {
    main: 'transparent',
  },
};

export default palette;
