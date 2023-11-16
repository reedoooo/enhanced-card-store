import { makeStyles } from '@mui/styles';
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
}));
