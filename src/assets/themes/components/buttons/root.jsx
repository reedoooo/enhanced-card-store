import borders from '../../base/borders';
import typography from '../../base/typography';
import pxToRem from '../../functions/pxToRem';

const { fontWeightBold, size } = typography;
const { borderRadius } = borders;

export default {
  display: 'inline-flex',
  justifyContent: 'center',
  alignItems: 'center',
  fontSize: size.xs,
  fontWeight: fontWeightBold,
  borderRadius: borderRadius.lg,
  padding: `${pxToRem(6.302)} ${pxToRem(16.604)}`,
  lineHeight: 1.4,
  textAlign: 'center',
  textTransform: 'uppercase',
  userSelect: 'none',
  backgroundSize: '150% !important',
  backgroundPositionX: '25% !important',
  transition: 'all 150ms ease-in',
  background: '#5CDB95',
  '&:hover': {
    backgroundColor: '#3da58a',
  },
  '@media (max-width:600px)': {
    fontSize: '0.875rem',
  },
  '&:disabled': {
    pointerEvent: 'none',
    opacity: 0.65,
  },
  '& .material-icons': {
    fontSize: pxToRem(15),
    marginTop: pxToRem(-2),
  },
};
