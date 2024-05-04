import borders from '../../base/borders';
import boxShadows from '../../base/boxShadows';
import colors from '../../base/colors';
import linearGradient from '../../functions/linearGradient';
import pxToRem from '../../functions/pxToRem';

const { success, grey, gradients, transparent } = colors;
const { borderWidth } = borders;
const { md } = boxShadows;

export default {
  styleOverrides: {
    switchBase: {
      color: success.dark,

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
          backgroundColor: `${success.main_light} !important`,
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
      backgroundColor: success.darkest,
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
