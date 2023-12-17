import React from 'react';
import { Grid } from '@mui/material';
import DeckDisplay from '../../layout/DeckDisplay';
import DeckSearch from '../../components/search/DeckSearch';
import { styled } from '@mui/styles';
import { useMode } from '../../context/hooks/colormode';

const SearchGrid = styled(Grid)(({ theme }) => ({
  padding: theme.spacing(2),
  [theme.breakpoints.down('md')]: {
    width: '50%', // Half width on small and medium screens
  },
}));

const DisplayGrid = styled(Grid)(({ theme }) => ({
  padding: theme.spacing(2),
  [theme.breakpoints.down('md')]: {
    width: '50%', // Half width on small and medium screens
  },
}));

const RootGrid = styled(Grid)(({ theme }) => ({
  overflow: 'auto',
  display: 'flex',
  flexDirection: 'row',
  flexWrap: 'wrap', // Ensure wrapping on smaller screens
  backgroundColor: theme.palette.background.secondary,
  padding: theme.spacing(3),
  borderRadius: theme.shape.borderRadius,
  boxShadow: theme.shadows[5],
  width: '100%',
}));

const DeckBuilderContainer = () => {
  const { theme } = useMode();

  return (
    <RootGrid container>
      <SearchGrid item xs={12} md={6} lg={4}>
        <DeckSearch />
      </SearchGrid>
      <DisplayGrid item xs={12} md={6} lg={8}>
        <DeckDisplay />
      </DisplayGrid>
    </RootGrid>
  );
};

export default DeckBuilderContainer;
