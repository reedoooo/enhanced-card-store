import { makeStyles } from '@mui/styles';

export const useStyles = makeStyles({
  mediaContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    cursor: 'pointer',
    '&:hover': {
      opacity: 0.7,
    },
  },
  media: {
    width: '100%',
    flexGrow: 1, // Allow the media part to fill the space
    // paddingTop: '140%', // Aspect ratio 7:10 (height 10, width 7)
    // backgroundSize: 'cover',
  },
});
