import colors from 'assets/themes/base/colors';
import borders from 'assets/themes/base/borders';
import boxShadows from 'assets/themes/base/boxShadows';
import pxToRem from 'assets/themes/functions/pxToRem';

const { grey, white, success } = colors;
const { borderRadius } = borders;
const { tabsBoxShadow } = boxShadows;

export default {
  styleOverrides: {
    root: {
      position: 'relative',
      // backgroundColor: grey.default,
      borderRadius: borderRadius.xl,
      minHeight: 'unset',
      padding: pxToRem(4),
    },

    flexContainer: {
      height: '100%',
      position: 'relative',
      zIndex: 10,
    },

    fixed: {
      overflow: 'unset !important',
      overflowX: 'unset !important',
    },

    vertical: {
      '& .MuiTabs-indicator': {
        width: '100%',
        // color: `${success.main} !important`,
      },
    },

    indicator: {
      height: '100%',
      borderRadius: borderRadius.lg,
      // backgroundColor: success.dark,
      backgroundColor: success.main, // Ensure this is not commented out
      boxShadow: tabsBoxShadow.indicator,
      transition: 'all 500ms ease',
      color: `${success.main} !important`,
    },

    label: {
      color: `${success.main} !important`,
    },

    labelIcon: {
      color: `${success.main} !important`,
    },
  },
};
