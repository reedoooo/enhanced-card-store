import { makeStyles } from '@mui/styles';

export const useStyles = makeStyles((theme) => ({
  actionButtons: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    gap: '1.5rem',
  },
  media: {
    objectFit: 'cover',
    borderRadius: '4px',
    boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
  },
  details: {
    display: 'flex',
    alignItems: 'center',
    gap: '1.5rem',
    marginBottom: '1.5rem',
  },
  dialogTitle: {
    fontSize: '1.5rem',
    fontWeight: 600,
    color: theme.palette.primary.dark,
  },
  dialogContent: {
    padding: '2rem',
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
