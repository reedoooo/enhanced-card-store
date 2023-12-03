import React from 'react';
import { Box, Grid, Paper } from '@mui/material';
import CardList from '../../components/grids/collectionGrids/CardList';
import { useTheme } from '@mui/material/styles';
import { useMode } from '../../context/hooks/colormode';

const CollectionPortfolioListContainer = ({ selectedCards, removeCard }) => {
  const theme2 = useTheme();
  const { theme } = useMode();

  return (
    <Box
      sx={{
        maxWidth: '100%',
        background: theme.palette.background.dark,
        borderRadius: theme.shape.borderRadius,
        width: {
          xs: '100%', // Full width on mobile screens
          md: '100%', // Full width on mobile screens
        },
        padding: theme.spacing(1), // Reduced padding for mobile screens
      }}
    >
      <Grid item xs={12} sx={{ maxHeight: '100vh', width: '100%' }}>
        <Paper
          elevation={3}
          sx={{
            background: theme.palette.background.dark,
            borderRadius: theme.shape.borderRadius,
            padding: theme.spacing(1), // Reduced padding for mobile screens
            maxHeight: '100%',
            height: 'auto',
            width: '100%',
            boxShadow: theme.shadows[3],
          }}
        >
          <CardList selectedCards={selectedCards} removeCard={removeCard} />
        </Paper>
      </Grid>
    </Box>
  );
};

export default CollectionPortfolioListContainer;
