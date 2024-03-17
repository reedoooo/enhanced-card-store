/* eslint-disable max-len */
import React from 'react';
import { Box, Typography } from '@mui/material';
import MDBox from '../../../../REUSABLE_COMPONENTS/MDBOX';
import { useMode } from '../../../../../context';
import ProgressCircle from '../../../../REUSABLE_COMPONENTS/ProgressCircle';

const ValuDistributionCircle = ({ collections }) => {
  const { theme } = useMode();
  const collectionMetaData = collections.reduce(
    (meta, collection) => {
      meta.totalValue += collection.totalPrice;
      meta.tooltips.push(
        `${collection.name}: $${collection.totalPrice.toFixed(2)}`
      );
      return meta;
    },
    { totalValue: 0, tooltips: [] }
  );

  let cumulativePercent = 0;
  const gradientStops = collections
    .map((collection) => {
      const valuePercent =
        (collection.totalPrice / collectionMetaData.totalValue) * 100;
      const stop = `${theme.palette.chartTheme.blueAccent.default} ${cumulativePercent}%, ${theme.palette.chartTheme.blueAccent.default} ${cumulativePercent + valuePercent}%`;
      cumulativePercent += valuePercent;
      return stop;
    })
    .join(', ');

  const tooltipContent = collectionMetaData.tooltips.join('\n');

  return (
    <MDBox sx={{ width: '100%', height: '100%', flexGrow: 1 }}>
      <Box
        sx={{
          bgcolor: theme.palette.chartTheme.primary.dark,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          flexDirection: 'column',
          borderRadius: theme.shape.borderRadius,
          minHeight: '270px',
        }}
      >
        <Typography variant="h5" fontWeight="600" sx={{ mb: 2 }}>
          Collection Value Distribution
        </Typography>
        <ProgressCircle
          progress={1} // Full circle
          size={120}
          collections={collections}
          tooltipContent={tooltipContent}
          background={`conic-gradient(${gradientStops}), 
                       radial-gradient(circle, transparent 55%, ${theme.palette.chartTheme.primary.default} 55%) center/100% no-repeat, 
                       ${theme.palette.chartTheme.greenAccent.default}`}
        />
        <Typography
          variant="h5"
          color={theme.palette.chartTheme.greenAccent.light}
          sx={{ mt: 2 }}
        >
          Total Value: ${collectionMetaData.totalValue.toFixed(2)}
        </Typography>
        <Typography variant="caption">
          Includes extra misc expenditures and costs
        </Typography>
      </Box>
    </MDBox>
  );
};

export default ValuDistributionCircle;
