import borders from '../../base/borders';
import palette from '../../base/palette';

const { borderRadius } = borders;

export default {
  styleOverrides: {
    root: {
      transition: 'all 200ms ease-in-out',
      color: palette.primary.dark,
      background: palette.primary.lighter,
    },
    rounded: {
      borderRadius: borderRadius.lg,
    },

    img: {
      height: 'auto',
    },
  },
};
