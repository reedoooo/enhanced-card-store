import React from 'react';
import { Typography, Box, useTheme, Grid } from '@mui/material';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import { useCollectionStore } from '../../context/CollectionContext/CollectionContext';
import { styled } from '@mui/styles';

const StatBox = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
  borderRadius: theme.shape.borderRadius,
  padding: theme.spacing(2),
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'space-around',
  boxShadow: theme.shadows[2],
}));

const StatItem = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  marginBottom: theme.spacing(1),
}));

const CollectionValueTracker = ({ stats }) => {
  const theme = useTheme();
  const {
    totalCost,
    selectedCollection,
    getTotalPrice,
    getTotalPrice2,
    totalPrice,
    allCardPrices,
  } = useCollectionStore();
  const twentyFourHourChange = stats.twentyFourHourAverage;
  const newTotal = getTotalPrice();

  console.log('newTotal:', newTotal);

  const statsArray = [
    {
      label: 'Total Collection Value',
      value: `$${newTotal}`,
    },
    {
      label: '24 Hour Change',
      value: `${twentyFourHourChange?.percentageChange}`,
      isIncrease: twentyFourHourChange?.priceIncreased,
    },
    // Additional stats
    { label: 'Last Price', value: `${twentyFourHourChange?.lastPrice}` },
    { label: 'Average Price', value: `${twentyFourHourChange?.averagePrice}` },
    { label: 'Volume', value: `${twentyFourHourChange?.volume}` },
    { label: 'Volatility', value: `${twentyFourHourChange?.volatility}` },
    { label: 'High Point', value: `${twentyFourHourChange?.highPoint}` },
    { label: 'Low Point', value: `${twentyFourHourChange?.lowPoint}` },
  ];

  return (
    <StatBox>
      {statsArray.map((stat, index) => {
        const IconComponent =
          stat?.isIncrease !== undefined
            ? stat?.isIncrease
              ? ArrowUpwardIcon
              : ArrowDownwardIcon
            : null;
        const iconColor = stat?.isIncrease
          ? theme.palette.success.main
          : theme.palette.error.main;

        return (
          <StatItem key={index}>
            {IconComponent && (
              <IconComponent sx={{ color: iconColor, marginRight: 1 }} />
            )}
            <Typography
              variant="subtitle1"
              sx={{ fontWeight: 'medium', color: theme.palette.text.primary }}
            >
              {stat?.label}: {stat?.value}
            </Typography>
          </StatItem>
        );
      })}
    </StatBox>
  );
};

export default CollectionValueTracker;
