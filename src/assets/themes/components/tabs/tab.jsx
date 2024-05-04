import typography from 'assets/themes/base/typography';
import borders from 'assets/themes/base/borders';
import colors from 'assets/themes/base/colors';
import pxToRem from 'assets/themes/functions/pxToRem';

const { size, fontWeightMedium } = typography;
const { borderRadius } = borders;
const { dark, grey, success, text } = colors;

export default {
  styleOverrides: {
    root: {
      display: 'flex',
      alignItems: 'center',
      flexDirection: 'row',
      flex: '1 1 auto',
      textAlign: 'center',
      maxWidth: 'unset !important',
      minWidth: 'unset !important',
      minHeight: 'unset !important',
      height: 'auto',
      fontSize: size.lg,
      fontWeight: fontWeightMedium,
      textTransform: 'none',
      lineHeight: 'inherit',
      padding: pxToRem(4),
      borderRadius: borderRadius.md,
      color: `${text.primary} !important`,

      // color: `${dark.main} !important`,
      opacity: '1 !important',
      '& .material-icons, .material-icons-round': {
        marginBottom: '0 !important',
        marginRight: pxToRem(4),
      },
      '& svg': {
        marginBottom: '0 !important',
        marginRight: pxToRem(6),
      },
      '&:selected': {
        color: `${success.main} !important`,
      },
      'span.MuiTab-wrapper': {
        color: `${success.main} !important`,
      },
      'span.label.MuiTab-notSelected': {
        color: `${text.main} !important`,
        backgroundColor: `${success.main} !important`,
        transition: 'all 500ms ease',
      },

      labelIcon: {
        paddingTop: pxToRem(4),
      },
    },
  },
};
