import React, { useEffect, useRef, useState } from 'react';
import { Box, Grid, useMediaQuery, useTheme } from '@mui/material';
import GenericCard from '../../cards/GenericCard';
import { makeStyles } from '@mui/styles';
import CustomPopover from '../../cards/CustomPopover';
import LoadingIndicator from '../../indicators/LoadingIndicator';

const useStyles = makeStyles((theme) => ({
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

const DeckSearchCardGrid = ({ cards, userDecks }) => {
  const classes = useStyles();
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme?.breakpoints?.down('sm'));
  const [hoveredCard, setHoveredCard] = useState(null);
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const cardRef = useRef(null);

  useEffect(() => {
    // Mock fetching data or some asynchronous action
    // Remove this if you have actual data fetching logic
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  }, []);

  if (isLoading) {
    return (
      <Box className={classes.loading}>
        <LoadingIndicator
          // className={classes.loading}
          size={100}
          thickness={4}
        />
      </Box>
    );
  }

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid
        container
        spacing={{ xs: 2, md: 1 }}
        columns={{ xs: 4, sm: 8, md: 12 }}
      >
        {cards?.map((card, i) => (
          <Grid key={i} item xs={4} sm={4} md={4} marginTop={1}>
            <div className={classes.cardContainer}>
              <GenericCard
                card={card}
                userDecks={userDecks}
                context={'Deck'}
                className={classes.card}
                cardRef={cardRef}
                hoveredCard={hoveredCard}
                setHoveredCard={setHoveredCard}
                isPopoverOpen={isPopoverOpen}
                setIsPopoverOpen={setIsPopoverOpen}
              />
            </div>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default DeckSearchCardGrid;

// const DeckSearchCardGrid = ({ cards, userDecks }) => {
//   const theme = useTheme();
//   const isSmallScreen = useMediaQuery(theme?.breakpoints?.down('sm'));
//   const classes = useStyles();
//   // const [anchorEl, setAnchorEl] = useState(null);
//   const [isHovering, setHovering] = useState(false);
//   const cardRef = useRef(null);
//   const [hoveredCard, setHoveredCard] = useState(null);
//   const [anchorEl, setAnchorEl] = React.useState(null);

//   const handlePopoverOpen = (event) => {
//     setAnchorEl(event.currentTarget);
//   };

//   const handlePopoverClose = () => {
//     setAnchorEl(null);
//   };
//   // const handlePopoverOpen = (card) => {
//   //   setHoveredCard(card);
//   // };

//   // const handlePopoverClose = () => {
//   //   setHoveredCard(null);
//   // };

//   const open = Boolean(anchorEl);

//   return (
//     <Grid container spacing={1}>
//       {cards?.map((card, i) => (
//         <Grid
//           key={i}
//           item
//           xs={isSmallScreen ? 6 : 4}
//           marginTop={1}
//           // onMouseEnter={handleMouseEnter}
//           // onMouseLeave={handleMouseLeave}
//         >
//           {/* <CustomPopover
//             card={card}
//             // anchorEl={hoveredCard === card ? cardRef.current : null}
//             // setAnchorEl={setHoveredCard}
//             open={open}
//             anchorEl={anchorEl}
//             handlePopoverClose={handlePopoverClose}
//             // handleMouseEnter={() => handlePopoverOpen(card)}
//             // handleMouseLeave={handlePopoverClose} */}
//           {/* > */}
//           <div className={classes.cardContainer}>
//             <GenericCard
//               card={card}
//               item
//               cardInfo={card}
//               userDecks={userDecks}
//               context={'Deck'}
//               className={classes.card}
//               cardRef={cardRef}
//               open={open}
//               anchorEl={anchorEl}
//               handlePopoverClose={handlePopoverClose}
//               // handlePopoverOpen={() => handlePopoverOpen(card)}
//               handlePopoverOpen={handlePopoverOpen}
//               isHovering={hoveredCard === card}
//               setHovering={setHoveredCard}
//             />
//           </div>
//           {/* </CustomPopover> */}
//         </Grid>
//       ))}
//     </Grid>
//   );
// };

// export default DeckSearchCardGrid;
