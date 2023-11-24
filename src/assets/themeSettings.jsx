import { tokens } from './tokens';

export const themeSettings = (mode) => {
  const colors = tokens(mode);

  return {
    width: '100vw',
    palette: {
      mode: mode,
      primary: {
        // main: mode === 'dark' ? colors.primary[500] : colors.primary[100],
        main: colors.greenAccent[500],
        light: colors.greenAccent[200],
        dark: colors.greenAccent[600],
        default: colors.grey[700],
        // contrastText: '#fff',
        contrastText: mode === 'dark' ? '#ffffff' : '#000000',

        // main: colors.greenAccent[500],
      },

      chartColors: [
        colors.greenAccent[500],
        colors.greenAccent[400],
        colors.greenAccent[300],
        colors.greenAccent[200],
        colors.greenAccent[100],
      ],
      primaryLight: {
        main: colors.primary[300],
      },
      primaryDark: {
        main: colors.primary[900],
      },
      common: {
        white: colors.grey[100],
        black: colors.grey[900],
      },
      secondary: {
        // main: colors.greenAccent[500],
        main: colors.greenAccent[200],
        light: colors.greenAccent[100],
        dark: colors.greenAccent[400],
        contrastText: '#000',
      },
      neutral: {
        dark: colors.grey[700],
        main: colors.primary[300],
        light: colors.grey[100],
      },
      background: {
        main: '#333',
        dark: '#222',
        secondary: '#444',
        tertiary: '#555',
        quaternary: '#666',
        quinternary: '#999',
        default: mode === 'dark' ? '#777' : '#ffffff',
        paper: colors.greenAccent[100],
        // paper: mode === 'dark' ? colors.grey[300] : '#ffffff',
      },
      error: {
        main: colors.redAccent[500],
        dark: colors.redAccent[700],
      },
      warning: {
        main: colors.redAccent[500],
      },
      success: {
        light: colors.greenAccent[100],
        main: colors.greenAccent[500],
        dark: colors.greenAccent[200],
      },
      info: {
        main: colors.blueAccent[500],
      },
      text: {
        primary: colors.grey[900],
        secondary: colors.grey[300],
      },
      divider: mode === 'dark' ? colors.grey[800] : colors.grey[200],
      action: {
        hover: mode === 'dark' ? colors.grey[800] : colors.grey[200],
      },
    },
    // chart: {
    //   palette: {
    //     primary: {
    //       main: colors.greenAccent[500],
    //       light: colors.greenAccent[300],
    //       dark: colors.greenAccent[700],
    //       contrastText: '#fff',
    //     },
    //     secondary: {
    //       main: colors.greenAccent[200],
    //       light: colors.greenAccent[100],
    //       dark: colors.greenAccent[400],
    //       contrastText: '#000',
    //     },
    //     background: {
    //       paper: colors.greenAccent[100],
    //       default: colors.greenAccent[200],
    //     },
    //     text: {
    //       primary: colors.greenAccent[800],
    //       secondary: colors.greenAccent[600],
    //     },
    //     chartColors: [
    //       colors.greenAccent[500],
    //       colors.greenAccent[400],
    //       colors.greenAccent[300],
    //       colors.greenAccent[200],
    //       colors.greenAccent[100],
    //     ],
    //   },
    //   typography: {
    //     // Define typography styles if needed
    //   },
    // },

    spacing: (factor) => `${0.25 * factor}rem`,
    shape: {
      borderRadius: 4,
    },
    action: {
      hover: mode === 'dark' ? colors.grey[800] : colors.grey[200],
    },
    // You need to decide what to return here...
    shadows: [
      'none',
      '0px 2px 1px -1px rgba(0,0,0,0.1),0px 1px 1px 0px rgba(0,0,0,0.06),0px 1px 3px 0px rgba(0,0,0,0.04)', // example for theme.shadows[1]
      '0px 3px 1px -2px rgba(0,0,0,0.1),0px 2px 2px 0px rgba(0,0,0,0.06),0px 1px 5px 0px rgba(0,0,0,0.04)', // example for theme.shadows[2]
      '0px 3px 3px -2px rgba(0,0,0,0.1),0px 3px 4px 0px rgba(0,0,0,0.06),0px 1px 8px 0px rgba(0,0,0,0.04)', // example for theme.shadows[3]
      '0px 2px 4px -1px rgba(0,0,0,0.1),0px 4px 5px 0px rgba(0,0,0,0.06),0px 1px 10px 0px rgba(0,0,0,0.04)', // example for theme.shadows[4]
      '0px 3px 5px -1px rgba(0,0,0,0.1),0px 5px 8px 0px rgba(0,0,0,0.06),0px 1px 14px 0px rgba(0,0,0,0.04)', // example for theme.shadows[5]
      '0px 3px 5px -1px rgba(0,0,0,0.1),0px 6px 10px 0px rgba(0,0,0,0.06),0px 1px 18px 0px rgba(0,0,0,0.04)', // example for theme.shadows[6]
      '0px 4px 5px -2px rgba(0,0,0,0.1),0px 7px 10px 1px rgba(0,0,0,0.06),0px 2px 16px 1px rgba(0,0,0,0.04)', // example for theme.shadows[7]
      '0px 5px 5px -3px rgba(0,0,0,0.1),0px 8px 10px 1px rgba(0,0,0,0.06),0px 3px 14px 2px rgba(0,0,0,0.04)', // example for theme.shadows[8]
      '0px 5px 6px -3px rgba(0,0,0,0.1),0px 9px 12px 1px rgba(0,0,0,0.06),0px 3px 16px 2px rgba(0,0,0,0.04)', // example for theme.shadows[9]
      '0px 5px 15px rgba(0,0,0,0.1)', // example for theme.shadows[10]
    ],
    typography: {
      fontFamily: ['Source Sans Pro', 'sans-serif'].join(','),
      fontSize: 12,
      h1: {
        fontFamily: ['Source Sans Pro', 'sans-serif'].join(','),
        fontSize: 40,
      },
      h2: {
        fontFamily: ['Source Sans Pro', 'sans-serif'].join(','),
        fontSize: 32,
      },
      h3: {
        fontFamily: ['Source Sans Pro', 'sans-serif'].join(','),
        fontSize: 24,
      },
      h4: {
        fontFamily: ['Source Sans Pro', 'sans-serif'].join(','),
        fontSize: 20,
      },
      h5: {
        fontFamily: ['Source Sans Pro', 'sans-serif'].join(','),
        fontSize: 16,
      },
      h6: {
        fontFamily: ['Source Sans Pro', 'sans-serif'].join(','),
        fontSize: 14,
      },
    },
  };
};
