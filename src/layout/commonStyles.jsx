import { makeStyles } from '@mui/styles';

export const useCommonStyles = makeStyles((theme) => ({
  paperBackground: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: theme.palette.background.paper,
    zIndex: -1,
  },
  // Add other common styles here
}));
