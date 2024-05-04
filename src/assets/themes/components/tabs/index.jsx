import colors from 'assets/themes/base/colors';
import borders from 'assets/themes/base/borders';
import boxShadows from 'assets/themes/base/boxShadows';
import pxToRem from 'assets/themes/functions/pxToRem';

const { grey, white, success, text } = colors;
const { borderRadius } = borders;
const { tabsBoxShadow } = boxShadows;

export default {
  styleOverrides: {
    root: {
      position: 'relative',
      backgroundColor: '#f8f9fa',
      borderRadius: borderRadius.lg,
      minHeight: 'unset',
      padding: pxToRem(12),

      '&.MuiTabs-indicator': {
        color: `${text.main} !important`,
        backgroundColor: `${success.main} !important`,
        boxShadow: tabsBoxShadow.indicator,
        transition: 'all 500ms ease',
      },
      'span.MuiTabs-indicator': {
        color: `${text.main} !important`,
        backgroundColor: `${success.main} !important`,
        boxShadow: tabsBoxShadow.indicator,
        transition: 'all 500ms ease',
      },
      'span.label.MuiTabs-selected': {
        color: `${text.main} !important`,
        backgroundColor: `${success.main} !important`,
        boxShadow: tabsBoxShadow.indicator,
        transition: 'all 500ms ease',
      },
      // '&.MuiTabs-selected': {
      //   color: `${text.main} !important`,
      //   backgroundColor: `${success.main} !important`,
      //   boxShadow: tabsBoxShadow.indicator,
      //   transition: 'all 500ms ease',
      // },
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
      },
    },

    indicator: {
      height: '100%',
      borderRadius: borderRadius.md,
      color: `${text.main} !important`,
      backgroundColor: `${success.main} !important`,
      boxShadow: tabsBoxShadow.indicator,
      transition: 'all 500ms ease',
    },
  },
};
