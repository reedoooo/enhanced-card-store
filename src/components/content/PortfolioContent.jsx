import React from 'react';
import { Box } from '@mui/system';
import { Typography } from '@mui/material';
import PortfolioHeader from '../headings/PortfolioHeader';
import PortfolioListContainer from '../../containers/PortfolioListContainer';
import PortfolioChart from '../other/PortfolioChart';
import { useCollectionStore } from '../../context/CollectionContext/CollectionContext';
import { useUtility } from '../../context/UtilityContext/UtilityContext';

const PortfolioContent = ({ error, selectedCards, removeCard, chartData }) => {
  const { allCollections, selectedCollection, totalCost } =
    useCollectionStore();
  const { cronCounter, totalCardPrice, cardPriceUpdates, cronData } =
    useUtility();
  console.log('PORTFOLIOCONTENT CRONDATA:', cronData);
  console.log('PORTFOLIOCONTENT CRONRUNS:', cronCounter);
  console.log('PORTFOLIOCONTENT TOTALCARDPRICE:', totalCardPrice);
  console.log('PORTFOLIOCONTENT CARDPRICEUPDATES:', cardPriceUpdates);
  console.log('PORTFOLIOCONTENT ALLCOLLECTIONS:', allCollections);
  console.log('PORTFOLIOCONTENT SELECTEDCOLLECTION:', selectedCollection);
  // const totalPrice = selectedCards.reduce((total, card) => {
  //   if (
  //     card.card_prices &&
  //     card.card_prices[0] &&
  //     card.card_prices[0].tcgplayer_price
  //   ) {
  //     return total + parseFloat(card.card_prices[0].tcgplayer_price);
  //   }
  //   return total;
  // }, 0);
  console.log('PORTFOLIOCONTENT TOTALCOST:', totalCost);
  return (
    <Box
      height="100vh"
      display="flex"
      flexDirection="column"
      alignItems="center"
      padding="20px"
    >
      <PortfolioHeader error={error} />

      {/* Container for Chart and List */}
      <Box
        display="flex"
        flexDirection="row"
        justifyContent="space-between"
        alignItems="flex-start"
        width="100%" // Full width
        marginTop="20px" // Add some top margin for separation
      >
        {/* Chart */}
        <Box flex="1" marginRight="10px">
          {' '}
          {/* Adjust the right margin for spacing */}
          <PortfolioChart
            data={chartData}
            xAxisLabel={`x-axis: ${cronCounter} cron jobs`}
            yAxisLabel={`y-axis: $${totalCardPrice}`}
          />
        </Box>

        {/* List */}
        <Box flex="1" marginLeft="10px">
          {' '}
          {/* Adjust the left margin for spacing */}
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
