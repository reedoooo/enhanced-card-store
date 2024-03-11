import { useTheme } from 'styled-components';
import useMode from '../../ColorModeContext/useMode';

export const useGenericActionButtonStyles = () => {
  const { theme } = useMode();
  const theme2 = useTheme();

  return {
    contextText: {
      color: theme.palette.text.primary,
      fontWeight: 'bold',
      fontSize: '0.8rem',
      [theme2.breakpoints.up('sm')]: {
        fontSize: '1rem',
      },
    },
    addButton: {
      color: theme.palette.backgroundA.contrastText,
      flexGrow: 1,
      backgroundColor: theme.palette.backgroundA.darker,
      '&:hover': {
        backgroundColor: theme.palette.backgroundA.light,
      },
      marginRight: theme2.spacing(0.5),
    },
    removeButton: {
      color: theme.palette.error.contrastText,
      flexGrow: 1,

      backgroundColor: theme.palette.error.main,
      '&:hover': {
        backgroundColor: theme.palette.error.dark,
      },
      marginRight: theme2.spacing(0.5),
    },
    actionRow: {
      display: 'flex',
      // justifyContent: 'space-between',
      alignItems: 'center',
      width: '100%',
      flexWrap: 'nowrap', // Prevents wrapping to the new line
    },
    circleButtonContainer: {
      display: 'flex',
      justifyContent: 'space-around',
      alignItems: 'center',
      width: '100%',
      flexGrow: 1,
      padding: theme2.spacing(1),
      gap: theme2.spacing(1),
    },
  };
};
