import { makeStyles } from '@mui/styles';

export const commonStyles = makeStyles((theme) => ({
  card: {
    display: 'flex',
    flexDirection: 'column',
    margin: '16px',
    // Enhanced responsiveness:
    // Use percentage widths and media queries to better adjust card size on various screens
    width: '100%',
    [theme?.breakpoints?.up('sm')]: {
      width: '80%',
    },
    [theme?.breakpoints?.up('md')]: {
      width: '60%',
    },
  },
  media: {
    flex: 1,
    objectFit: 'cover',
  },
  content: {
    flex: 1,
    overflow: 'auto',
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
  tooltip: {
    display: 'none',
    position: 'absolute',
    top: 0,
    left: '100%',
    zIndex: 999,
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    color: 'white',
    padding: '10px',
    borderRadius: '5px',
    width: '40vw',
    height: 'auto',
    maxHeight: '40vh',
    overflowY: 'auto',
    '&.show': {
      display: 'block',
    },
    span: {
      display: 'block',
      marginBottom: '4px',
      lineHeight: 1.2,
      '&:last-child': {
        marginBottom: 0,
      },
    },
    strong: {
      fontWeight: 'bold',
    },
    tooltipTitle: {
      fontWeight: 'bold',
      fontSize: '14px',
      marginBottom: '8px',
      textAlign: 'center',
    },
  },
}));

export const deckCardStyles = makeStyles({
  card: {
    position: 'relative',
    maxHeight: 100,
    height: '100%',
    width: '100%',
  },
  content: {
    overflow: 'hidden',
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
    '@media(max-width: 600px)': {
      fontSize: '16px',
    },
  },
  actionButtons: {
    padding: '10px',
    margin: '10px 0',
    borderRadius: '4px',
  },
});

// Function to merge common and specific styles
export const mergeStyles = (common, specific) => {
  const mergedStyles = {
    ...common,
    ...specific,
  };

  // Convert the merged styles into valid class names
  const classNames = {
    card: {
      ...common.card,
      ...specific.card,
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
  for (const key in mergedStyles) {
    classNames[key] = Object.keys(mergedStyles[key]).join(' ');
  }
  return classNames;
};
