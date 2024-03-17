/* eslint-disable max-len */
import React from 'react';
import { Box, useTheme } from '@mui/material';
import PropTypes from 'prop-types';
import RCToolTip from './RCTOOLTIP/RCToolTip';
import { useMode } from '../../context';

// ProgressCircle now expects an array of collections instead of a single progress value.
const ProgressCircle = ({ collections, size = 120 }) => {
  const { theme } = useMode();

  // Calculate the total value of all collections.
  const totalValue = collections?.reduce(
    (sum, { totalPrice }) => sum + totalPrice,
    0
  );

  // Generate a conic-gradient background based on the collections' value distribution.
  let cumulativePercentage = 0;
  const background = collections
    ?.reduce((gradient, collection) => {
      const collectionPercentage = (collection.totalPrice / totalValue) * 100;
      const nextCumulativePercentage =
        cumulativePercentage + collectionPercentage;
      const color = theme.palette.chartTheme.blueAccent.default; // Color for each segment
      gradient += `${color} ${cumulativePercentage}% ${nextCumulativePercentage}%,`;
      cumulativePercentage = nextCumulativePercentage;
      return gradient;
    }, '')
    .slice(0, -1); // Remove the trailing comma

  // Prepare tooltip content displaying the name and value of each collection.
  const tooltipContent = collections
    ?.map(
      (collection) =>
        `${collection.name}: $${collection.totalPrice?.toFixed(2)} (${((collection.totalPrice / totalValue) * 100)?.toFixed(2)}%)`
    )
    .join('\n');

  return (
    <RCToolTip tooltipContent={tooltipContent}>
      <Box
        sx={{
          background: `conic-gradient(${background}),
                       radial-gradient(circle, transparent 55%, ${theme.palette.chartTheme.primary.default} 55%) center/100% no-repeat,
                       ${theme.palette.chartTheme.greenAccent.default}`,
          borderRadius: '50%',
          width: size,
          height: size,
          '&:hover': {
            cursor: 'pointer',
          },
        }}
      />
    </RCToolTip>
  );
};

ProgressCircle.propTypes = {
  collections: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      totalPrice: PropTypes.number.isRequired,
    })
  ).isRequired,
  size: PropTypes.number,
};

export default ProgressCircle;
