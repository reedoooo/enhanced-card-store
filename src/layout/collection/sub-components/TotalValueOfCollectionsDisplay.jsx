import React from 'react';
import StatisticsDisplaySection from './StatisticsDisplaySection';
import { Skeleton, Typography } from '@mui/material';

const TotalValueOfCollectionsDisplay = ({ totalValue, iconName }) => {
  const renderTotalValueContent = () => {
    return totalValue != null ? (
      <Typography variant="h2">${totalValue?.toFixed(2)}</Typography>
    ) : (
      <Skeleton variant="text" width={200} height={60} />
    );
  };

  return (
    <StatisticsDisplaySection
      iconName={iconName}
      title="Total Value of Collections"
      renderContent={renderTotalValueContent}
    />
  );
};

export default TotalValueOfCollectionsDisplay;
