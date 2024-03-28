import borders from '../../base/borders';
import boxShadows from '../../base/boxShadows';
import colors from '../../base/colors';
import typography from '../../base/typography';
import linearGradient from '../../functions/linearGradient';
import pxToRem from '../../functions/pxToRem';

const {
  text,
  info,
  success,
  error,
  primary,
  common,
  white,
  grey,
  gradients,
  transparent,
} = colors;
const { borderWidth } = borders;
const { md } = boxShadows;

export default {
  defaultProps: {
    disableRipple: false,
  },
  styleOverrides: {
    switchBase: {
      color: gradients.success.state,

      '&:hover': {
        backgroundColor: transparent.main,
      },

      '&.Mui-checked': {
        color: gradients.dark.main,

        '&:hover': {
          backgroundColor: transparent.main,
        },

        '& .MuiSwitch-thumb': {
          borderColor: `${gradients.success.state} !important`,
          backgroundColor: `${gradients.success.main} !important`,
        },

        '& + .MuiSwitch-track': {
          backgroundColor: `${gradients.dark.main} !important`,
          borderColor: `${gradients.dark.main} !important`,
          opacity: 1,
        },
      },

      '&.Mui-disabled + .MuiSwitch-track': {
        opacity: '0.3 !important',
      },

      '&.Mui-focusVisible .MuiSwitch-thumb': {
        backgroundImage: linearGradient(
          gradients.success.main,
          gradients.success.state
        ),
      },
    },
    thumb: {
      backgroundColor: success.main,
      boxShadow: md,
      border: `${borderWidth[1]} solid ${grey.light}`,
    },
    track: {
      width: pxToRem(32),
      height: pxToRem(15),
      backgroundColor: grey.darkest,
      border: `${borderWidth[1]} solid ${grey.light}`,
      opacity: 1,
    },
    checked: {},
  },
};
