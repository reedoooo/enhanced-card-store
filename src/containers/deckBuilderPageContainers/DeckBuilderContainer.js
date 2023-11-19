import React from 'react';
import { Grid, useMediaQuery, useTheme } from '@mui/material';
import DeckDisplay from '../../components/grids/DeckDisplay';
import DeckSearch from '../../components/search/DeckSearch';
import { styled } from '@mui/system'; // Use @mui/system for Emotion styling

// Define your components using the styled function from @mui/system
const SearchGrid = styled(Grid)(({ theme }) => ({
  [theme.breakpoints.up('xl')]: { flexBasis: '60%' },
  [theme.breakpoints.up('lg')]: { flexBasis: '50%' },
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
  const isLargeScreen = useMediaQuery(theme.breakpoints.up('lg'));
  const isMediumScreen = useMediaQuery(theme.breakpoints.between('sm', 'md'));
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));

  const getXsValue = () => {
    if (isLargeScreen) return 3;
    if (isMediumScreen) return 4;
    return 5;
  };
  const getDisplayXsValue = () => {
    // if (isSmallScreen || isMediumScreen) return 7;
    // return 9;
    if (isLargeScreen) return 9;
    if (isMediumScreen) return 8;
    return 7;
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
