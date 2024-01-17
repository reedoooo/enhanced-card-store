import { makeStyles } from '@mui/material';
export const useStyles = makeStyles((theme) => ({
  cardContainer: {
    display: 'flex',
    justifyContent: 'center',
    maxHeight: '300px', // or any desired max height
    minHeight: '300px', // make sure it matches max height
    overflow: 'hidden', // ensures content doesn't spill out
  },
  card: {
    width: '100%',
    // transform: 'scale(0.9)', // scales down to 90% of the original size
  },
  loading: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
  },
  root: { backgroundColor: '#f4f6f8' },
  paper: {
    padding: theme.spacing(3),
    borderRadius: '10px',
    boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
  },
  deckEditPanel: {
    padding: theme.spacing(2),
    backgroundColor: '#ffffff',
    border: '1px solid #ddd',
    borderRadius: theme.spacing(1),
    boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
    transition: 'opacity 0.5s ease-in-out',
  },
  noCardsText: {
    color: '#666',
    fontStyle: 'italic',
  },
}));

export const useDeckStyles = makeStyles((theme) => ({
  card: {
    position: 'relative', // Add this
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    width: '100%',
    flexGrow: 1,
  },
  media: {
    width: '100%',
    objectFit: 'contain',
  },
  content: {
    flex: '1 1 auto',
    overflow: 'hidden',
    // padding: theme.spacing(1),
  },
  text: {
    textOverflow: 'ellipsis',
    overflow: 'hidden',
    whiteSpace: 'nowrap',
  },
  actionButtons: {
    backgroundColor: '#f5f5f5',
    // padding: theme.spacing(1),
    margin: theme.spacing(1, 0),
    borderRadius: '4px',
    overflow: 'auto',
  },
  dialog: {
    position: 'absolute', // Add this
    top: 0,
    right: 0,
    zIndex: 1000, // High z-index value
  },
}));

export const useDeckButtonListStyles = makeStyles((theme) => ({
  grid: {
    marginBottom: theme?.spacing(2),
  },
  // deckButton: {
  //   width: '100%',
  //   padding: '6px 0',
  //   borderRadius: '5px',
  //   transition: '0.3s',
  //   '&:hover': {
  //     backgroundColor: 'rgba(0, 0, 0, 0.04)',
  //   },
  //   margin: theme?.spacing(1),
  //   [theme?.breakpoints?.down('xs')]: {
  //     fontSize: '0.7rem',
  //     padding: '5px 8px',
  //   },
  //   [theme?.breakpoints?.up('sm')]: {
  //     fontSize: '0.8rem',
  //   },
  //   [theme?.breakpoints?.up('md')]: {
  //     fontSize: '1rem',
  //   },
  // },
  // icon: {
  //   fontSize: '16px',
  // },
  // text: {
  //   fontSize: '12px',
  //   fontWeight: '600',
  // },
  root: {
    [theme?.breakpoints?.up('md')]: {
      backgroundColor: 'blue',
    },
    [theme?.breakpoints?.down('sm')]: {
      backgroundColor: 'red',
    },
    [theme?.breakpoints?.between('sm', 'md')]: {
      backgroundColor: 'green',
    },
  },
  deckButton: {
    padding: theme.spacing(1),
    border: '1px solid',
    borderColor: theme.palette.backgroundA.dark,
    background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
    boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
    '&:hover': {
      backgroundColor: theme.palette.backgroundA.darker,
      borderColor: theme.palette.backgroundA.lighter,
    },
    '&.selected': {
      borderColor: theme.palette.backgroundA.lighter,
      boxShadow: '0 3px 5px 2px rgba(0, 200, 200, .3)',
    },
  },
  icon: {
    color: theme.palette.backgroundA.lighter,
    marginRight: theme.spacing(1),
  },
  text: {
    color: theme.palette.common.white,
    fontWeight: 'bold',
  },
}));
