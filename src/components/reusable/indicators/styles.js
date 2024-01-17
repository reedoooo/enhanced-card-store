import { makeStyles } from '@mui/material';

export const useStyles = makeStyles((theme) => ({
  paper: {
    padding: theme.spacing(2),
    margin: theme.spacing(2),
    backgroundColor: theme.palette.error.light,
  },
  typography: {
    color: theme.palette.error.dark,
  },
  container: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  icon: {
    marginRight: theme.spacing(1),
    color: theme.palette.error.main,
  },
}));
