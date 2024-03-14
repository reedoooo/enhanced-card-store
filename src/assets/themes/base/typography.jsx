import pxToRem from '../functions/pxToRem';
import colors from './colors';

// Material Dashboard 2 React Helper Functions

const { dark } = colors;

const baseProperties = {
  fontFamily: 'Poppins, sans-serif',
  fontWeightLighter: 100,
  fontWeightLight: 300,
  fontWeightRegular: 400,
  fontWeightMedium: 600,
  fontWeightBold: 700,

  fontSize3XS: () => `clamp(${pxToRem(6)}, 1vw, ${pxToRem(8)})`,
  fontSize2XS: () => `clamp(${pxToRem(8)}, 1vw, ${pxToRem(10)})`,
  fontSizeXS: () => `clamp(${pxToRem(10)}, 1.25vw, ${pxToRem(12)})`,
  fontSizeSM: () => `clamp(${pxToRem(12)}, 1.5vw, ${pxToRem(14)})`,
  fontSizeMD: () => `clamp(${pxToRem(14)}, 1.75vw, ${pxToRem(16)})`,
  fontSizeLG: () => `clamp(${pxToRem(16)}, 2vw, ${pxToRem(18)})`,
  fontSizeXL: () => `clamp(${pxToRem(18)}, 2.25vw, ${pxToRem(20)})`,
  fontSize2XL: () => `clamp(${pxToRem(20)}, 2.5vw, ${pxToRem(24)})`,
  fontSize3XL: () => `clamp(${pxToRem(24)}, 2.75vw, ${pxToRem(30)})`,
  fontSize4XL: () => `clamp(${pxToRem(30)}, 3vw, ${pxToRem(36)})`,
  fontSize5XL: () => `clamp(${pxToRem(36)}, 3.25vw, ${pxToRem(42)})`,
  fontSize6XL: () => `clamp(${pxToRem(42)}, 3.5vw, ${pxToRem(48)})`,
};

const baseHeadingProperties = {
  fontFamily: baseProperties.fontFamily,
  color: dark.main,
  fontWeight: baseProperties.fontWeightBold,
  fontSize: baseProperties.fontSizeXL(), // Call the function for default size
  '@media (max-width:600px)': {
    fontSize: baseProperties.fontSizeMD(), // Adjust size for smaller screens
  },
};

const baseDisplayProperties = {
  fontFamily: baseProperties.fontFamily,
  color: dark.main,
  fontWeight: baseProperties.fontWeightLight,
  lineHeight: 1.2,
};

const typography = {
  fontFamily: baseProperties.fontFamily,
  fontWeightLighter: baseProperties.fontWeightLighter,
  fontWeightLight: baseProperties.fontWeightLight,
  fontWeightRegular: baseProperties.fontWeightRegular,
  fontWeightMedium: baseProperties.fontWeightMedium,
  fontWeightBold: baseProperties.fontWeightBold,

  h1: {
    ...baseHeadingProperties,
    fontSize: baseProperties.fontSize6XL(),
    '@media (max-width:900px)': {
      fontSize: baseProperties.fontSize5XL(),
    },
  },

  h2: {
    ...baseHeadingProperties,
    fontSize: baseProperties.fontSize5XL(),
    '@media (max-width:900px)': {
      fontSize: baseProperties.fontSize4XL(),
    },
  },

  h3: {
    ...baseHeadingProperties,
    fontSize: baseProperties.fontSize4XL(),
    '@media (max-width:600px)': {
      fontSize: baseProperties.fontSize3XL(),
    },
  },

  h4: {
    ...baseHeadingProperties,
    fontSize: baseProperties.fontSize3XL(),
    '@media (max-width:600px)': {
      fontSize: baseProperties.fontSize2XL(),
    },
  },

  h5: {
    ...baseHeadingProperties,
    fontSize: baseProperties.fontSize2XL(),
    '@media (max-width:600px)': {
      fontSize: baseProperties.fontSizeXL(),
    },
  },

  h6: {
    ...baseHeadingProperties,
    fontSize: baseProperties.fontSizeXL(),
    '@media (max-width:600px)': {
      fontSize: baseProperties.fontSizeLG(),
    },
  },

  p1: {
    fontFamily: baseProperties.fontFamily,
    fontWeight: baseProperties.fontWeightLight,
    fontSize: baseProperties.fontSizeSM(),
    lineHeight: 1.5,
    '@media (max-width:600px)': {
      fontSize: baseProperties.fontSizeXS(),
    },
    '@media (max-width:900px)': {
      fontSize: baseProperties.fontSizeSM(),
    },
  },

  p2: {
    fontFamily: baseProperties.fontFamily,
    fontWeight: baseProperties.fontWeightLight,
    fontSize: baseProperties.fontSizeSM(),
    lineHeight: 1.5,
    '@media (max-width:600px)': {
      fontSize: baseProperties.fontSizeXS(),
    },
    '@media (max-width:900px)': {
      fontSize: baseProperties.fontSizeSM(),
    },
  },

  subtitle1: {
    fontFamily: baseProperties.fontFamily,
    fontSize: baseProperties.fontSizeXL,
    fontWeight: baseProperties.fontWeightLight,
    lineHeight: 1.625,
  },

  subtitle2: {
    fontFamily: baseProperties.fontFamily,
    fontSize: baseProperties.fontSizeMD,
    fontWeight: baseProperties.fontWeightLight,
    lineHeight: 1.6,
  },

  body1: {
    fontFamily: baseProperties.fontFamily,
    fontSize: baseProperties.fontSizeXL, // or directly use 'clamp()' if different sizes needed
    fontWeight: baseProperties.fontWeightRegular,
    lineHeight: 1.625,
  },

  body2: {
    fontFamily: baseProperties.fontFamily,
    fontSize: baseProperties.fontSizeMD,
    fontWeight: baseProperties.fontWeightLight,
    lineHeight: 1.6,
  },

  button: {
    fontFamily: baseProperties.fontFamily,
    fontSize: baseProperties.fontSizeSM,
    fontWeight: baseProperties.fontWeightLight,
    lineHeight: 1.5,
    textTransform: 'uppercase',
  },

  caption: {
    fontFamily: baseProperties.fontFamily,
    fontSize: baseProperties.fontSizeXS,
    fontWeight: baseProperties.fontWeightLight,
    lineHeight: 1.25,
  },

  overline: {
    fontFamily: baseProperties.fontFamily,
  },

  d1: {
    fontSize: pxToRem(80),
    ...baseDisplayProperties,
  },

  d2: {
    fontSize: pxToRem(72),
    ...baseDisplayProperties,
  },

  d3: {
    fontSize: pxToRem(64),
    ...baseDisplayProperties,
  },

  d4: {
    fontSize: pxToRem(56),
    ...baseDisplayProperties,
  },

  d5: {
    fontSize: pxToRem(48),
    ...baseDisplayProperties,
  },

  d6: {
    fontSize: pxToRem(40),
    ...baseDisplayProperties,
  },

  size: {
    xxs: baseProperties.fontSizeXXS,
    xs: baseProperties.fontSizeXS,
    sm: baseProperties.fontSizeSM,
    md: baseProperties.fontSizeMD,
    lg: baseProperties.fontSizeLG,
    xl: baseProperties.fontSizeXL,
    '2xl': baseProperties.fontSize2XL,
    '3xl': baseProperties.fontSize3XL,
  },

  lineHeight: {
    xs: 1.25,
    sm: 1.5,
    md: 1.75,
    lg: 2,
    xl: 2,
  },
};

export default typography;

// /**
//  * Typography used in theme
//  * @param {JsonObject} theme theme customization object
//  */

// export default function themeTypography(theme) {
//   return {
//     fontFamily: theme?.customization?.fontFamily,
//     h6: {
//       fontWeight: 500,
//       color: theme.heading,
//       fontSize: '0.75rem',
//     },
//     h5: {
//       fontSize: '0.875rem',
//       color: theme.heading,
//       fontWeight: 500,
//     },
//     h4: {
//       fontSize: '1rem',
//       color: theme.heading,
//       fontWeight: 600,
//     },
//     h3: {
//       fontSize: '1.25rem',
//       color: theme.heading,
//       fontWeight: 600,
//     },
//     h2: {
//       fontSize: '1.5rem',
//       color: theme.heading,
//       fontWeight: 700,
//     },
//     h1: {
//       fontSize: '2.125rem',
//       color: theme.heading,
//       fontWeight: 700,
//     },
//     subtitle1: {
//       fontSize: '0.875rem',
//       fontWeight: 500,
//       color: theme.textDark,
//     },
//     subtitle2: {
//       fontSize: '0.75rem',
//       fontWeight: 400,
//       color: theme.darkTextSecondary,
//     },
//     caption: {
//       fontSize: '0.75rem',
//       color: theme.darkTextSecondary,
//       fontWeight: 400,
//     },
//     body1: {
//       fontSize: '0.875rem',
//       fontWeight: 400,
//       lineHeight: '1.334em',
//     },
//     body2: {
//       letterSpacing: '0em',
//       fontWeight: 400,
//       lineHeight: '1.5em',
//       color: theme.darkTextPrimary,
//     },
//     button: {
//       textTransform: 'capitalize',
//     },
//     customInput: {
//       marginTop: 1,
//       marginBottom: 1,
//       '& > label': {
//         top: 23,
//         left: 0,
//         color: theme.grey500,
//         '&[data-shrink="false"]': {
//           top: 5,
//         },
//       },
//       '& > div > input': {
//         padding: '30.5px 14px 11.5px !important',
//       },
//       '& legend': {
//         display: 'none',
//       },
//       '& fieldset': {
//         top: 0,
//       },
//     },
//     mainContent: {
//       backgroundColor: theme.background,
//       width: '100%',
//       minHeight: 'calc(100vh - 88px)',
//       flexGrow: 1,
//       padding: '20px',
//       marginTop: '88px',
//       marginRight: '20px',
//       borderRadius: `${theme?.customization?.borderRadius}px`,
//     },
//     menuCaption: {
//       fontSize: '0.875rem',
//       fontWeight: 500,
//       color: theme.heading,
//       padding: '6px',
//       textTransform: 'capitalize',
//       marginTop: '10px',
//     },
//     subMenuCaption: {
//       fontSize: '0.6875rem',
//       fontWeight: 500,
//       color: theme.darkTextSecondary,
//       textTransform: 'capitalize',
//     },
//     commonAvatar: {
//       cursor: 'pointer',
//       borderRadius: '8px',
//     },
//     smallAvatar: {
//       width: '22px',
//       height: '22px',
//       fontSize: '1rem',
//     },
//     mediumAvatar: {
//       width: '34px',
//       height: '34px',
//       fontSize: '1.2rem',
//     },
//     largeAvatar: {
//       width: '44px',
//       height: '44px',
//       fontSize: '1.5rem',
//     },
//   };
// }
