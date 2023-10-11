import React from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Box } from '@mui/system';
import PortfolioHeader from '../headings/PortfolioHeader';
import PortfolioListContainer from '../../containers/PortfolioListContainer';
import PortfolioChart from '../other/PortfolioChart';
import { useCollectionStore } from '../../context/hooks/collection';

const PortfolioContent = ({ error, selectedCards, removeCard }) => {
  const { selectedCollection } = useCollectionStore();

  // Define a custom theme with a breakpoint at 950px
  const theme = createTheme({
    breakpoints: {
      values: {
        xs: 0,
        sm: 600,
        md: 950, // Set md breakpoint to 950px
        lg: 1280,
        xl: 1920,
      },
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <Box
        height="100vh"
        width={{ md: '100vw', lg: '100vw' }} // Adjust width based on the custom breakpoint
        display="flex"
        margin={'auto'}
        justifyContent={'center'}
        flexDirection="column"
        alignItems="center"
        padding="20px"
      >
        <PortfolioHeader error={error} />
        <Box
          display="flex"
          flexDirection={{ xs: 'column', md: 'row' }}
          justifyContent="space-between"
          alignItems="flex-start"
          width="100%"
          marginTop="20px"
          height="100%" // Ensure it takes the rest of the available height
        >
          <Box
            flex="1"
            marginBottom={{ xs: '10px', md: '0px' }}
            marginRight={{ md: '10px' }}
            height="100%"
          >
            <PortfolioChart selectedCards={selectedCards} />
          </Box>
          <Box
            flex="1"
            marginTop={{ xs: '10px', md: '0px' }}
            marginLeft={{ md: '10px' }}
            height="100%"
          >
            <PortfolioListContainer
              selectedCards={selectedCards}
              removeCard={removeCard}
            />
          </Box>
        </Box>
      </Box>
    </ThemeProvider>
  );
};

export default PortfolioContent;
