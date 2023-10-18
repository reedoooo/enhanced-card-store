import React from 'react';
import { Box } from '@mui/system';
import PortfolioHeader from '../headings/PortfolioHeader';
import PortfolioListContainer from '../../containers/PortfolioListContainer';
import { useCollectionStore } from '../../context/hooks/collection';
import PortfolioChartContainer from '../../containers/PortfolioChartContainer';

const PortfolioContent = ({ error, selectedCards, removeCard }) => {
  const { selectedCollection } = useCollectionStore();

  return (
    <Box
      sx={{
        height: '100vh',
        width: '100vw',
        display: 'flex',
        m: 'auto',
        justifyContent: 'center',
        flexDirection: 'column',
        alignItems: 'center',
        p: 2,
      }}
    >
      <PortfolioHeader error={error} />
      <Box
        sx={{
          display: 'flex',
          flexDirection: { xs: 'column', md: 'row' },
          justifyContent: 'space-between',
          alignItems: 'stretch', // Make child elements stretch to maximum available height
          width: '100%',
          mt: 2,
          height: '100%',
        }}
      >
        <Box
          sx={{
            flex: { md: 1, lg: 7 },
            mb: { xs: 1, md: 0 },
            mr: { md: 1 },
            width: '100%',
            height: '100%',
          }}
        >
          <PortfolioChartContainer
            selectedCards={selectedCards}
            removeCard={removeCard}
          />
        </Box>
        <Box
          sx={{
            flex: { md: 1, lg: 3 },
            mt: { xs: 1, md: 0 },
            ml: { md: 1 },
            width: '100%',
            height: '100%',
          }}
        >
          <PortfolioListContainer
            selectedCards={selectedCards}
            removeCard={removeCard}
          />
        </Box>
      </Box>
    </Box>
  );
};

export default PortfolioContent;
