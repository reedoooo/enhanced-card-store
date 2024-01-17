import { tokens } from './tokens';
import themeTypography from './themes/typography/typography';
import themeColors from './scss/_theme-vars.modules.scss';

// TODO: TEST BOTH HEAX CONVERSION FUNCTIONS
// Utility function to convert Hex to RGBA
const hexToRgba = (hex, alpha = 1) => {
  let shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
  hex = hex.replace(shorthandRegex, (m, r, g, b) => r + r + g + g + b + b);
  let result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result
    ? `rgba(${parseInt(result[1], 16)}, ${parseInt(result[2], 16)}, ${parseInt(
        result[3],
        16
      )}, ${alpha})`
    : null;
};
function convertHexToRGBA(hex, alpha) {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);

  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}
export const themeSettings = (mode) => {
  const colors = tokens(mode);
  const color = themeColors;

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

  return {
    // width: '100vw',
    components: {
      MuiCssBaseline: {
        styleOverrides: {
          // body: {
          //   backgroundColor: mode === 'dark' ? '#333' : '#ffffff',
          // },
        },
      },
      MuiButton: {
        styleOverrides: {
          root: {
            borderRadius: 4,
            padding: '0.5rem 1rem',
            textTransform: 'none', // Disable uppercase text
            backgroundColor: colors.greenAccent[500],
            '&:hover': {
              backgroundColor: colors.greenAccent[600],
            },
            '@media (max-width:600px)': {
              // Responsive styles
              fontSize: '0.875rem',
            },
          },
        },
      },
    },
    MuiListItemButton: {
      styleOverrides: {
        root: {
          color: colors.greenAccent[500],
          paddingTop: '10px',
          paddingBottom: '10px',
          '&.Mui-selected': {
            color: colors.greenAccent[200],
            backgroundColor: colors.greenAccent[300],
            '&:hover': {
              backgroundColor: colors.greenAccent[700],
            },
            '& .MuiListItemIcon-root': {
              color: colors.greenAccent[400],
            },
          },
          '&:hover': {
            backgroundColor: colors.greenAccent[400],
            color: colors.greenAccent[200],
            '& .MuiListItemIcon-root': {
              color: colors.greenAccent[400],
            },
          },
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          background: backgroundA.default,
          borderRadius: `${themeColors?.borderRadius}px`,
          '& .MuiOutlinedInput-notchedOutline': {
            borderColor: themeColors.colors?.grey400,
          },
          '&:hover $notchedOutline': {
            borderColor: themeColors?.primaryLight,
          },
          '&.MuiInputBase-multiline': {
            padding: 1,
          },
        },
        input: {
          fontWeight: 500,
          background: backgroundA.default,
          padding: '15.5px 14px',
          borderRadius: `${themeColors?.borderRadius}px`,
          '&.MuiInputBase-inputSizeSmall': {
            padding: '10px 14px',
            '&.MuiInputBase-inputAdornedStart': {
              paddingLeft: 0,
            },
          },
        },
        inputAdornedStart: {
          paddingLeft: 4,
        },
        notchedOutline: {
          borderRadius: `${themeColors?.customization?.borderRadius}px`,
        },
      },
    },
    palette: {
      mode: mode,
      // PRIMARY COLORS
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
        contrastTextD: '#000',
        hover: '#4cceac',
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
      // SECONDARY COLORS
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
      // COLORS FOR CARD RARITY OVERLAY
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
      error: {
        main: colors.redAccent[500],
        dark: colors.redAccent[700],
        contrastText: '#fff',
      },
      warning: {
        main: colors.redAccent[500],
        dark: colors.redAccent[700],
        light: colors.redAccent[200],
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
    spacing: (factor) => `${0.25 * factor}rem`,
    shape: {
      borderRadius: 4,
      borderRadiusLarge: 8,
    },
    zIndex: {
      appBar: 1200,
      drawer: 1100,
    },
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
    typography: themeTypography(color),
    // typography: {
    //   fontFamily: ['Source Sans Pro', 'sans-serif'].join(','),
    //   fontSize: 14,
    //   h1: { fontSize: '2.5rem' },
    //   h2: { fontSize: '2rem' },
    //   h3: { fontSize: '1.75rem' },
    //   h4: { fontSize: '1.5rem' },
    //   h5: { fontSize: '1.25rem' },
    //   h6: { fontSize: '1rem' },
    //   body1: { fontSize: '1rem' },
    //   body2: { fontSize: '0.875rem' },
    //   button: { fontSize: '0.875rem' },
    //   caption: { fontSize: '0.75rem' },
    //   body3: { fontSize: '0.625rem' },
    //   body4: { fontSize: '0.5rem' },
    // },
  };
};
// chart: {
//   axis: {
//     domain: {
//       line: {
//         stroke: colors.greenAccent[800],
//         strokeWidth: 1,
//       },
//     },
//     ticks: {
//       line: {
//         stroke: colors.greenAccent[700],
//         strokeWidth: 1,
//       },
//       text: {
//         fill: colors.greenAccent[900],
//         fontSize: 12,
//       },
//     },
//   },
//   grid: {
//     line: {
//       stroke: colors.greenAccent[200],
//       strokeWidth: 1,
//     },
//   },
//   legends: {
//     text: {
//       fill: colors.greenAccent[800],
//       fontSize: 12,
//     },
//   },
//   tooltip: {
//     container: {
//       background: colors.greenAccent[100],
//       color: colors.greenAccent[800],
//       fontSize: 12,
//       borderRadius: 4,
//       boxShadow: '0 2px 4px rgba(0,0,0,0.25)',
//     },
//   },
//   points: {
//     borderColor: colors.greenAccent[800],
//   },
// },
