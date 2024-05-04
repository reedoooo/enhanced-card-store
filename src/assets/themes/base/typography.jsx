import pxToRem from '../functions/pxToRem';
import colors from './colors';

const { dark } = colors;

// const baseProperties = {
//   fontFamily: 'Poppins, sans-serif',
//   fontWeightLighter: 100,
//   fontWeightLight: 300,
//   fontWeightRegular: 400,
//   fontWeightMedium: 600,
//   fontWeightBold: 700,

//   fontSize3XS: () => `clamp(${pxToRem(6)}, 1vw, ${pxToRem(8)})`,
//   fontSize2XS: () => `clamp(${pxToRem(8)}, 1vw, ${pxToRem(10)})`,
//   fontSizeXS: () => `clamp(${pxToRem(10)}, 1.25vw, ${pxToRem(12)})`,
//   fontSizeSM: () => `clamp(${pxToRem(12)}, 1.5vw, ${pxToRem(14)})`,
//   fontSizeMD: () => `clamp(${pxToRem(14)}, 1.75vw, ${pxToRem(16)})`,
//   fontSizeLG: () => `clamp(${pxToRem(16)}, 2vw, ${pxToRem(18)})`,
//   fontSizeXL: () => `clamp(${pxToRem(18)}, 2.25vw, ${pxToRem(20)})`,
//   fontSize2XL: () => `clamp(${pxToRem(20)}, 2.5vw, ${pxToRem(24)})`,
//   fontSize3XL: () => `clamp(${pxToRem(24)}, 2.75vw, ${pxToRem(30)})`,
//   fontSize4XL: () => `clamp(${pxToRem(30)}, 3vw, ${pxToRem(36)})`,
//   fontSize5XL: () => `clamp(${pxToRem(36)}, 3.25vw, ${pxToRem(42)})`,
//   fontSize6XL: () => `clamp(${pxToRem(42)}, 3.5vw, ${pxToRem(48)})`,
// };
const baseProperties = {
  fontFamily: 'Poppins, sans-serif',
  fontWeightLight: 300,
  fontWeightRegular: 400,
  fontWeightMedium: 500,
  fontWeightBold: 700,
  fontSizeXXS: pxToRem(10.4),
  fontSizeXS: pxToRem(12),
  fontSizeSM: pxToRem(14),
  fontSizeMD: pxToRem(16),
  fontSizeLG: pxToRem(18),
  fontSizeXL: pxToRem(20),
  fontSize2XL: pxToRem(24),
  fontSize3XL: pxToRem(30),
  fontSize4XL: pxToRem(36),
  fontSize5XL: pxToRem(42),
  fontSize6XL: pxToRem(48),
};
const baseHeadingProperties = {
  fontFamily: baseProperties.fontFamily,
  color: dark.main,
  fontWeight: baseProperties.fontWeightBold,
  fontSize: baseProperties.fontSizeXL,
  '@media (max-width:600px)': {
    fontSize: baseProperties.fontSizeMD, // Adjust size for smaller screens
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
  commonAvatar: {
    cursor: 'pointer',
    borderRadius: '8px',
  },
  smallAvatar: {
    width: '22px',
    height: '22px',
    fontSize: '1rem',
  },
  mediumAvatar: {
    width: '34px',
    height: '34px',
    fontSize: '1.2rem',
  },
  largeAvatar: {
    width: '44px',
    height: '44px',
    fontSize: '1.5rem',
  },
  h1: {
    fontSize: pxToRem(48),
    lineHeight: 1.25,
    ...baseHeadingProperties,
  },

  h2: {
    fontSize: pxToRem(36),
    lineHeight: 1.3,
    ...baseHeadingProperties,
  },

  h3: {
    fontSize: pxToRem(30),
    lineHeight: 1.375,
    ...baseHeadingProperties,
  },

  h4: {
    fontSize: pxToRem(24),
    lineHeight: 1.375,
    ...baseHeadingProperties,
  },

  h5: {
    fontSize: pxToRem(20),
    lineHeight: 1.375,
    ...baseHeadingProperties,
  },

  h6: {
    fontSize: pxToRem(16),
    lineHeight: 1.625,
    ...baseHeadingProperties,
  },
  // h1: {
  //   ...baseHeadingProperties,
  //   fontSize: baseProperties.fontSize6XL,
  //   '@media (max-width:900px)': {
  //     fontSize: baseProperties.fontSize5XL,
  //   },
  // },
  // h2: {
  //   ...baseHeadingProperties,
  //   fontSize: baseProperties.fontSize5XL(),
  //   '@media (max-width:900px)': {
  //     fontSize: baseProperties.fontSize4XL(),
  //   },
  // },
  // h3: {
  //   ...baseHeadingProperties,
  //   fontSize: baseProperties.fontSize4XL(),
  //   '@media (max-width:600px)': {
  //     fontSize: baseProperties.fontSize3XL(),
  //   },
  // },
  // h4: {
  //   ...baseHeadingProperties,
  //   fontSize: baseProperties.fontSize3XL(),
  //   '@media (max-width:600px)': {
  //     fontSize: baseProperties.fontSize2XL(),
  //   },
  // },
  // h5: {
  //   ...baseHeadingProperties,
  //   fontSize: baseProperties.fontSize2XL(),
  //   '@media (max-width:600px)': {
  //     fontSize: baseProperties.fontSizeXL(),
  //   },
  // },
  // h6: {
  //   ...baseHeadingProperties,
  //   fontSize: baseProperties.fontSizeXL(),
  //   '@media (max-width:600px)': {
  //     fontSize: baseProperties.fontSizeLG(),
  //   },
  // },

  // p1: {
  //   fontFamily: baseProperties.fontFamily,
  //   fontWeight: baseProperties.fontWeightLight,
  //   fontSize: baseProperties.fontSizeSM(),
  //   lineHeight: 1.5,
  //   '@media (max-width:600px)': {
  //     fontSize: baseProperties.fontSizeXS(),
  //   },
  //   '@media (max-width:900px)': {
  //     fontSize: baseProperties.fontSizeSM(),
  //   },
  // },

  // p2: {
  //   fontFamily: baseProperties.fontFamily,
  //   fontWeight: baseProperties.fontWeightLight,
  //   fontSize: baseProperties.fontSizeSM(),
  //   lineHeight: 1.5,
  //   '@media (max-width:600px)': {
  //     fontSize: baseProperties.fontSizeXS(),
  //   },
  //   '@media (max-width:900px)': {
  //     fontSize: baseProperties.fontSizeSM(),
  //   },
  // },

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

  // size: {
  //   // xxs: baseProperties.fontSizeXXS,
  //   xs: baseProperties.fontSizeXS,
  //   sm: baseProperties.fontSizeSM,
  //   md: baseProperties.fontSizeMD,
  //   lg: baseProperties.fontSizeLG,
  //   xl: baseProperties.fontSizeXL,
  //   '2xl': baseProperties.fontSize2XL,
  //   '3xl': baseProperties.fontSize3XL,
  // },
  size: {
    xxs: baseProperties.fontSizeXXS,
    xs: baseProperties.fontSizeXS,
    sm: baseProperties.fontSizeSM,
    md: baseProperties.fontSizeMD,
    lg: baseProperties.fontSizeLG,
    xl: baseProperties.fontSizeXL,
    xxl: baseProperties.fontSize2XL,
    xxxl: baseProperties.fontSize3XL,
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
