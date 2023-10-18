import React from 'react';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import { makeStyles } from '@mui/styles';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import Container from '@mui/material/Container';
import { Alert, AlertTitle } from '@mui/material';

const useStyles = makeStyles((theme) => ({
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

const ErrorIndicator = ({ error }) => {
  const classes = useStyles();

  return (
    <Container className={classes.container}>
      <Paper elevation={3} className={classes.paper}>
        <Typography variant="h6" className={classes.typography}>
          <ErrorOutlineIcon className={classes.icon} />
          <Alert severity="error">
            <AlertTitle>Error</AlertTitle>
            This is an error alert — <strong> Error: {error}</strong>
          </Alert>
        </Typography>
      </Paper>
    </Container>
  );
};

export default ErrorIndicator;
