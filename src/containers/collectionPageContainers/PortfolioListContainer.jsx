import React from 'react';
import { Box, Grid, Paper } from '@mui/material';
import CardList from '../../components/grids/collectionGrids/CardList';
import { useTheme } from '@mui/material/styles';
import { useMode } from '../../context/hooks/colormode';

const PortfolioListContainer = ({ selectedCards, removeCard }) => {
  const { theme } = useMode();

  return (
    <Box sx={{ maxWidth: '100%', width: '100%', padding: theme.spacing(3) }}>
      <Grid item xs={12} sx={{ maxHeight: '100vh', width: '100%' }}>
        <Paper
          elevation={3}
          sx={{
            background:
              'linear-gradient(45deg, rgba(255,255,255,1) 30%, rgba(204,204,204,1) 100%)',
            borderRadius: theme.shape.borderRadius,
            p: theme.spacing(2),
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

export default PortfolioListContainer;
