import React, { useState, useEffect } from 'react';
import { Typography, Box, useTheme } from '@mui/material';
import { useCombinedContext } from '../../context/CombinedProvider';
import { useCollectionStore } from '../../context/CollectionContext/CollectionContext';

const CollectionValueTracker = ({ data }) => {
  const theme = useTheme();
  const { allCardPrices } = useCombinedContext();
  const { totalCost } = useCollectionStore();
  const [totalValue, setTotalValue] = useState(0);
  const [changeOverTime, setChangeOverTime] = useState(0);
  console.log('allCardPrices', data.allCardPrices);
  // useEffect(() => {
  //   const allPrices = data?.cards?.map((card) => card?.price);
  //   console.log('[1]allPrices', allPrices);
  //   const newValue = data?cards?.reduce((acc, card) => acc + (card?.price, 0));
  //   console.log('[2]newValue', newValue);
  //   const change = data?cards?.reduce(
  //     (acc, card) => acc + (card?.latestPrice?.num - card?.lastSavedPrice?.num),
  //   	0
  //   );
  // 	console.log('[3]change', change);

  //   setTotalValue(newValue);
  //   setChangeOverTime(change);
  // }, [data]);

  // useEffect(() => {
  //   // Update total value based on allCardPrices
  //   if (Array.isArray(allCardPrices) && allCardPrices?.length > 0) {
  //     const total = allCardPrices
  //       .map((price) => parseFloat(price)) // Convert each price to a number
  //       .filter((price) => !isNaN(price)) // Filter out non-numeric values
  //       .reduce((acc, price) => acc + price, 0); // Sum up all prices
  //     console.log('total', total);
  //     setTotalValue(total);
  //   }
  // }, [allCardPrices]);

  const trend = changeOverTime > 0 ? 'increased' : 'decreased';
  const trendColor = changeOverTime > 0 ? 'success.main' : 'error.main';

  console.log('totalValue', totalValue);
  return (
    <Box
      sx={{
        p: 2,
        backgroundColor: theme.palette.background.paper,
        borderRadius: theme.shape.borderRadius,
      }}
    >
      <Typography
        variant="h6"
        sx={{ fontWeight: 'bold', color: theme.palette.text.primary }}
      >
        Total Collection Value: ${totalCost?.toFixed(2)}
      </Typography>
      <Typography
        variant="subtitle1"
        sx={{
          fontWeight: 'medium',
          color: theme.palette[trendColor],
        }}
      >
        Value {trend} in the last 24h: ${Math.abs(changeOverTime)?.toFixed(2)}
      </Typography>
    </Box>
  );
};

export default CollectionValueTracker;
