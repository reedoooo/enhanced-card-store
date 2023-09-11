import { makeStyles } from '@mui/styles';

export const commonStyles = makeStyles({
  card: {
    display: 'flex',
    flexDirection: 'column',
    margin: '16px',
  },
  media: {
    flex: 0.75,
  },
  content: {
    flex: 0.25,
  },
  button: {
    margin: '4px',
  },
  actionButtons: {
    backgroundColor: '#f5f5f5',
    padding: '12px',
    margin: '8px 0',
    borderRadius: '8px',
  },
});

export const deckCardStyles = makeStyles({
  card: {
    position: 'relative', // Add this
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    width: '100%',
    flexGrow: 1,
  },
  content: {
    flex: '1 1 auto',
    overflow: 'hidden',
    // padding: theme.spacing(1),
  },
  media: {
    width: '100%',
    objectFit: 'contain',
  },
  text: {
    textOverflow: 'ellipsis',
    overflow: 'hidden',
    whiteSpace: 'nowrap',
  },
});

export const productCardStyles = makeStyles({
  card: {
    maxWidth: '100%',
    minHeight: 300,
    padding: '16px',
  },
  largerButton: {
    margin: '0 8px',
    padding: '10px',
    fontSize: '20px',
  },
  actionButtons: {
    padding: '10px',
    margin: '10px 0',
    borderRadius: '4px',
  },
});

// Function to merge common and specific styles
export const mergeStyles = (common, specific) => {
  return {
    ...common,
    ...specific,
    card: {
      ...common.card,
      ...specific.card,
      //   width: '100%', // <- Set width to 100% of parent container
      //   '@media (min-width:600px)': {
      //     // <- Media query example
      //     width: '80%',
      //   },
      // },
    },
    media: {
      ...common.media,
      ...specific.media,
    },
    content: {
      ...common.content,
      ...specific.content,
    },
    button: {
      ...common.button,
      ...specific.button,
    },
    actionButtons: {
      ...common.actionButtons,
      ...specific.actionButtons,
    },
  };
};
