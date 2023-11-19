import React from 'react';
import { Box, Paper } from '@mui/material';
import PortfolioHeader from '../headings/PortfolioHeader';
import PortfolioListContainer from '../../containers/PortfolioListContainer';
import PortfolioChartContainer from '../../containers/PortfolioChartContainer';

const PortfolioContent = ({ error, selectedCards, removeCard }) => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        // p: 2,
      }}
    >
      <PortfolioHeader error={error} />
      <Box
        sx={{
          display: 'flex',
          flexDirection: { xs: 'column', md: 'row' },
          justifyContent: 'space-between',
          alignItems: 'start', // Align items to the start of the container
          width: '100%',
          gap: 2, // Adds space between the components
        }}
      >
        <Paper
          sx={{
            flex: 1, // Allows the paper to grow
            display: 'flex',
            flexDirection: 'column',
            height: 'auto', // The height will be determined by the content
            mb: 2, // Adds margin at the bottom
          }}
        >
          <PortfolioChartContainer
            selectedCards={selectedCards}
            removeCard={removeCard}
          />
        </Paper>
        <Paper
          sx={{
            flex: 1, // Allows the paper to grow
            display: 'flex',
            flexDirection: 'column',
            height: 'auto', // The height will be determined by the content
            overflow: 'auto', // Adds scrollbar if content overflows
          }}
        >
          <PortfolioListContainer
            selectedCards={selectedCards}
            removeCard={removeCard}
          />
        </Paper>
      </Box>
    </Box>
  );
};

export default PortfolioContent;
