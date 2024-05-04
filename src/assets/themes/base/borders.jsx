import colors from 'assets/themes/base/colors';
import pxToRem from 'assets/themes/functions/pxToRem';

const { grey } = colors;

const borders = {
  borderColor: grey.light,
  tableCell: {
    border: `${pxToRem(1)} solid ${grey.light}`,
    borderColor: grey.light,
  },
  borderWidth: {
    0: 0,
    1: pxToRem(1),
    2: pxToRem(2),
    3: pxToRem(3),
    4: pxToRem(4),
    5: pxToRem(5),
  },
  borderRadius: {
    xs: pxToRem(1.6),
    sm: pxToRem(2),
    md: pxToRem(6), // px equivalent 6/16 = 0.375rem or
    lg: pxToRem(8), // px equivalent 8/16 = 0.5rem or 50% of 1rem which is 16px
    xl: pxToRem(12), // px equivalent 12/16 = 0.75rem or 75% of 1rem which is 16px
    xxl: pxToRem(16),
    section: pxToRem(160),
  },
};

export default borders;
