import React, { useEffect, useState } from 'react';
import { Grid } from '@mui/material';
import MDBox from '../layout/REUSABLE_COMPONENTS/MDBOX';
import ComplexStatisticsCard from './ComplexStatisticsCard';
import LoadingIndicator from '../layout/LoadingIndicator';
import useSelectedCollection from '../context/MAIN_CONTEXT/CollectionContext/useSelectedCollection';

const cardData = [
  {
    icon: 'attach_money',
    title: 'Cards Added',
    countFunc: (collection) =>
      collection?.cards?.reduce((acc, card) => acc + card.quantity, 0),
    percentage: { color: 'success', amount: '+55%', label: 'than last week' },
  },
  {
    icon: 'leaderboard',
    title: "Today's Total Value",
    countFunc: (collection) => `$${collection.totalPrice}`,
    percentage: { color: 'success', amount: '+3%', label: 'than last month' },
  },
  {
    icon: 'store',
    title: 'Most Valuable Card',
    countFunc: (collection) => {
      const mostValuableCard = collection?.cards?.reduce((acc, card) =>
        acc.price > card.price ? acc : card
      );
      return `${mostValuableCard?.name} - $${mostValuableCard?.price}`;
    },
    percentage: { color: 'success', amount: '+1%', label: 'than yesterday' },
  },
  {
    icon: 'trending_up',
    title: 'Weekly Performance',
    countFunc: (collection) =>
      `+${collection?.collectionStatistics?.percentageChange}%`,
    percentage: { color: 'success', amount: '', label: 'Just updated' },
  },
];

const gridItemStyle = {
  display: 'flex',
  justifyContent: 'center',
  width: '100%',
  height: '100%',
};

const StatisticsCardGrid = () => {
  const { allCollections, selectedCollection } = useSelectedCollection();

  return (
    <MDBox>
      <Grid container spacing={1} sx={{ flexGrow: 1 }}>
        {cardData?.map((data, index) => (
          <Grid item xs={3} sm={6} md={6} lg={6} key={index} sx={gridItemStyle}>
            <ComplexStatisticsCard
              icon={data?.icon}
              title={data?.title}
              count={data?.countFunc(selectedCollection)}
              percentage={data?.percentage}
              sx={{ height: '100%', flexGrow: 1 }}
            />
          </Grid>
        ))}
      </Grid>
    </MDBox>
  );
};

export default StatisticsCardGrid;
