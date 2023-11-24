// eslint-disable-next-line @typescript-eslint/no-var-requires
import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'stretch',
    height: '100%',
    width: '50vw',
    padding: theme.spacing(2),
  },
  button: {
    marginBottom: theme.spacing(2),
  },
  list: {
    flexGrow: 1,
  },
  listItem: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: theme.spacing(2),
    backgroundColor: '#ffffff',
    borderRadius: '8px',
    marginBottom: theme.spacing(2),
    boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',
  },
  listItemText: {
    flex: 1,
    textAlign: 'left',
    marginLeft: theme.spacing(3),
  },
}));
