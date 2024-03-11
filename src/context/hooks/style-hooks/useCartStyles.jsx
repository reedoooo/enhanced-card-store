// useCartStyles.js
import useMode from '../../UTILITIES_CONTEXT/ColorModeContext/useMode';

const useCartStyles = () => {
  const { theme } = useMode();
  // const theme2 = useTheme();

  const cartContainerStyles = {
    width: '100%',
    flexGrow: 1,
    backgroundColor: theme.palette.backgroundB.lightest,
    borderRadius: '5px',
    padding: '0.5rem',
    overflowY: 'auto',
    [theme.breakpoints.up('sm')]: {
      padding: '1rem',
    },
    [theme.breakpoints.up('md')]: {
      padding: '1.5rem',
    },
  };

  const cartTitleStyles = {
    fontWeight: 'bold',
    marginBottom: '1rem',
    color: theme.palette.text.primary,
    [theme.breakpoints.down('sm')]: {
      fontSize: '1.75rem',
    },
  };

  return { cartContainerStyles, cartTitleStyles };
};

export default useCartStyles;
