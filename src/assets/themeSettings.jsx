import { tokens } from './tokens';
// Utility function to convert Hex to RGBA
function hexToRgba(hex, alpha = 1) {
  // Expand shorthand form (e.g. "03F") to full form (e.g. "0033FF")
  let shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
  hex = hex.replace(shorthandRegex, function (m, r, g, b) {
    return r + r + g + g + b + b;
  });

  let result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result
    ? `rgba(${parseInt(result[1], 16)}, ${parseInt(result[2], 16)}, ${parseInt(
        result[3],
        16
      )}, ${alpha})`
    : null;
}
export const themeSettings = (mode) => {
  const colors = tokens(mode);

  const backgroundA = {
    darkest: '#2e7c67', // '#70d8bd',
    darker: '#3da58a',
    dark: '#4cceac',
    default: '#70d8bd', // '#4cceac',
    light: '#94e2cd',
    lighter: '#b7ebde',
    lightest: '#dbf5ee',
  };
  const backgroundB = {
    darkest: '#111',
    darker: '#222',
    dark: '#333',
    default: '#444',
    light: '#555',
    lighter: '#666',
    lightest: '#777',
  };

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
        lighter: colors.grey[300],
        default: mode === 'dark' ? '#777' : '#ffffff',
        paper: colors.greenAccent[100],
        disabled: colors.grey[200],
        // paper: mode === 'dark' ? colors.grey[300] : '#ffffff',
      },
      backgroundA: {
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
      },
      backgroundB: {
        darkest: '#111',
        darker: '#222',
        dark: '#333',
        default: '#444',
        light: '#555',
        lighter: '#666',
        lightest: '#777',
        contrastText: '#FBFAF2',
      },
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
      rarity: {
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
      },
      error: {
        main: colors.redAccent[500],
        dark: colors.redAccent[700],
        contrastText: '#fff',
      },
      warning: {
        main: colors.redAccent[500],
      },
      success: {
        light: colors.greenAccent[100],
        lighter: colors.greenAccent[200],
        evenLighter: colors.greenAccent[300],
        lightish: colors.greenAccent[400],
        main: colors.greenAccent[500],
        dark: colors.greenAccent[200],
        darker: colors.greenAccent[600],
        contrastText: '#fff',
        hoverContrastText: '#111',
      },
      info: {
        main: colors.blueAccent[500],
        dark: colors.blueAccent[700],
        light: colors.blueAccent[200],

        contrastText: '#fff',
      },
      text: {
        primary: colors.grey[900],
        secondary: colors.grey[300],
      },
      divider: mode === 'dark' ? colors.grey[800] : colors.grey[200],
      action: {
        hover: mode === 'dark' ? colors.grey[800] : colors.grey[200],
        disabled: colors.grey[200],
      },
    },
    chart: {
      axis: {
        domain: {
          line: {
            stroke: colors.greenAccent[800],
            strokeWidth: 1,
          },
        },
        ticks: {
          line: {
            stroke: colors.greenAccent[700],
            strokeWidth: 1,
          },
          text: {
            fill: colors.greenAccent[900],
            fontSize: 12,
          },
        },
      },
      grid: {
        line: {
          stroke: colors.greenAccent[200],
          strokeWidth: 1,
        },
      },
      legends: {
        text: {
          fill: colors.greenAccent[800],
          fontSize: 12,
        },
      },
      tooltip: {
        container: {
          background: colors.greenAccent[100],
          color: colors.greenAccent[800],
          fontSize: 12,
          borderRadius: 4,
          boxShadow: '0 2px 4px rgba(0,0,0,0.25)',
        },
      },
      points: {
        borderColor: colors.greenAccent[800],
      },
    },
    spacing: (factor) => `${0.25 * factor}rem`,
    shape: {
      borderRadius: 4,
      borderRadiusLarge: 8,
    },
    zIndex: {
      appBar: 1200,
      drawer: 1100,
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
