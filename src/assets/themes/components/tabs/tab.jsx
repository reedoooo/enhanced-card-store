import typography from 'assets/themes/base/typography';
import borders from 'assets/themes/base/borders';
import colors from 'assets/themes/base/colors';
import pxToRem from 'assets/themes/functions/pxToRem';
import { rgba } from 'assets/themes';

const { size, fontWeightBold } = typography;
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
      fontWeight: fontWeightBold,
      textTransform: 'none',
      lineHeight: 'inherit',
      py: pxToRem(12),
      borderRadius: borderRadius.md,
      color: `${success.darkest} !important`,
      transition: 'background-color 300ms ease, color 300ms ease', // smooth transition for background and color

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
      '&:hover': {
        backgroundColor: `${rgba(success.light, 0.2)} !important`, // change background color on hover
        color: `${dark.main} !important`, // change text color on hover
      },
      '&:selected': {
        color: `${success.main} !important`,
        backgroundColor: rgba(success.main, 0.5),
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
