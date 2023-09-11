import React from 'react';
import { Grid, useMediaQuery } from '@mui/material';
import { useTheme } from '@emotion/react';
import DeckCard from '../cleanUp/DeckCard';
import GenericCard from '../cards/GenericCard';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme) => ({
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

const DeckSearchCardGrid = ({ cards, userDecks }) => {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));
  const classes = useStyles();

  return (
    <Grid container spacing={1}>
      {cards.map((card, i) => (
        <Grid key={i} item xs={isSmallScreen ? 6 : 4} marginTop={1}>
          <GenericCard
            card={card}
            cardInfo={card}
            userDecks={userDecks}
            context={'Deck'}
            className={classes.card} // Passing down common className
          />
        </Grid>
      ))}
    </Grid>
  );
};

export default DeckSearchCardGrid;

// import React from 'react';
// import { Grid, useMediaQuery } from '@mui/material';
// import { useTheme } from '@emotion/react';
// import DeckCard from '../cards/DeckCard';

// const DeckSearchCardGrid = ({ cards, userDecks }) => {
//   const theme = useTheme();
//   const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));

//   return (
//     <Grid container spacing={1}>
//       {cards.map((card, i) => (
//         <Grid key={i} item xs={isSmallScreen ? 6 : 4} marginTop={1}>
//           <DeckCard card={card} userDecks={userDecks} />
//         </Grid>
//       ))}
//     </Grid>
//   );
// };

// export default DeckSearchCardGrid;
