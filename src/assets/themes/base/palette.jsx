import rgba from '../functions/rgba';
const palette = {
  primary: {
    lighter: '#94e2cd',
    light: '#4cceac',
    main: '#18b984',
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
  greyPalette: {
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
