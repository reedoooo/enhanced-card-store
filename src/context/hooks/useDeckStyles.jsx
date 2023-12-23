// useDeckDisplayStyles.js
import { useTheme } from '@mui/material';
import { useMode } from './colormode';

const useDeckStyles = () => {
  // const theme = useTheme();
  const { theme } = useMode();
  const mainBoxStyles = {
    padding: theme.spacing(3),
    backgroundColor: theme.palette.background.default,
    border: `1px solid ${theme.palette.divider}`,
    borderRadius: theme.shape.borderRadius,
    margin: 'auto',
    maxWidth: '800px', // Max-width for larger screens
  };

  const paperStyles = {
    padding: theme.spacing(2),
    borderRadius: theme.shape.borderRadius,
    boxShadow: theme.shadows[4],
    backgroundColor: theme.palette.background.paper,
    color: theme.palette.text.primary,
    display: 'flex',
    flexDirection: 'column',
  };

  const titleTypographyStyles = {
    fontWeight: 'bold',
    color: theme.palette.text.primary,
    marginBottom: theme.spacing(2),
  };

  const buttonStyles = {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.primary.contrastText,
    '&:hover': {
      backgroundColor: theme.palette.primary.dark,
    },
    display: 'flex',
    alignItems: 'center',
  };

  const switchControlStyles = {
    margin: theme.spacing(2),
  };

  const cardsContainerStyles = {
    display: 'flex',
    flexGrow: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
    border: `1px solid ${theme.palette.divider}`,
    borderRadius: theme.shape.borderRadius,
    padding: theme.spacing(2),
  };

  const noCardsTypographyStyles = {
    marginTop: theme.spacing(2),
    textAlign: 'center',
    fontStyle: 'italic',
  };

  return {
    mainBoxStyles,
    paperStyles,
    titleTypographyStyles,
    buttonStyles,
    switchControlStyles,
    cardsContainerStyles,
    noCardsTypographyStyles,
  };
};

export default useDeckStyles;
