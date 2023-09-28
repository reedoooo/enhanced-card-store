// import React from 'react';
// import { Grid, useMediaQuery } from '@mui/material';
// import { useTheme } from '@emotion/react';
// import DeckDisplay from '../../components/other/DeckDisplay';
// import DeckSearch from '../../components/search/DeckSearch';
// import { makeStyles } from '@mui/styles';

// const useStyles = makeStyles((theme) => ({
//   root: {
//     overflow: 'auto',
//     backgroundColor: '#f4f6f8',
//     padding: theme.spacing(3),
//     borderRadius: '10px',
//     boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
//     width: '100%', // Add this to make sure the container takes full width
//   },
//   searchGrid: {
//     [theme.breakpoints.up('lg')]: { flexBasis: '35%' }, // Increased from 30%
//     [theme.breakpoints.between('md', 'lg')]: { flexBasis: '50%' }, // Increased from 45%
//     [theme.breakpoints.down('sm')]: { flexBasis: '50%' }, // Increased from 40%
//   },
//   displayGrid: {
//     flex: 1,
//     padding: theme.spacing(1),
//   },
// }));

// const DeckBuilderContainer = ({ userDecks }) => {
//   const classes = useStyles();
//   const theme = useTheme();
//   const isMediumScreen = useMediaQuery(theme.breakpoints.between('sm', 'md'));
//   const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));

//   const getXsValue = () => {
//     if (isSmallScreen || isMediumScreen) return 5; // Increased from 4
//     return 3;
//   };

//   const getDisplayXsValue = () => {
//     if (isSmallScreen || isMediumScreen) return 7; // Decreased from 8
//     return 9;
//   };

//   return (
//     <Grid container spacing={3} className={classes.root}>
//       <Grid item className={classes.searchGrid} xs={getXsValue()}>
//         <DeckSearch userDecks={userDecks} />
//       </Grid>
//       <Grid item className={classes.displayGrid} xs={getDisplayXsValue()}>
//         <DeckDisplay userDecks={userDecks} />
//       </Grid>
//     </Grid>
//   );
// };

// export default DeckBuilderContainer;
import React from 'react';
import { Grid, useMediaQuery, useTheme } from '@mui/material';
// Removed import { useTheme } from '@emotion/react';

import DeckDisplay from '../../components/other/DeckDisplay';
import DeckSearch from '../../components/search/DeckSearch';
import { styled } from '@mui/system'; // Use @mui/system for Emotion styling

// Define your components using the styled function from @mui/system
const SearchGrid = styled(Grid)(({ theme }) => ({
  [theme.breakpoints.up('lg')]: { flexBasis: '35%' },
  [theme.breakpoints.between('md', 'lg')]: { flexBasis: '50%' },
  [theme.breakpoints.down('sm')]: { flexBasis: '50%' },
}));

const DisplayGrid = styled(Grid)(({ theme }) => ({
  flex: 1,
  padding: theme.spacing(1),
}));

const RootGrid = styled(Grid)(({ theme }) => ({
  overflow: 'auto',
  backgroundColor: '#f4f6f8',
  padding: theme.spacing(3),
  borderRadius: '10px',
  boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
  width: '100%',
}));

const DeckBuilderContainer = ({ userDecks }) => {
  const theme = useTheme(); // Use the theme from Emotion
  const isMediumScreen = useMediaQuery(theme.breakpoints.between('sm', 'md'));
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));

  const getXsValue = () => {
    if (isSmallScreen || isMediumScreen) return 5;
    return 3;
  };

  const getDisplayXsValue = () => {
    if (isSmallScreen || isMediumScreen) return 7;
    return 9;
  };

  return (
    <RootGrid container spacing={3}>
      <SearchGrid item xs={getXsValue()}>
        <DeckSearch userDecks={userDecks} />
      </SearchGrid>
      <DisplayGrid item xs={getDisplayXsValue()}>
        <DeckDisplay userDecks={userDecks} />
      </DisplayGrid>
    </RootGrid>
  );
};

export default DeckBuilderContainer;
