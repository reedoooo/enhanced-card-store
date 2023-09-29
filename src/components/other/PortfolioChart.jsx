import React, { useMemo, useRef, useState } from 'react';
import { Grid } from '@mui/material';
import { styled } from '@mui/system';
import LinearChart from './LinearChart';
import UpdateChartData from '../collection/UpdateChartData';

const ChartPaper = styled('div')(({ theme }) => ({
  borderRadius: '12px',
  width: '100%',
  height: '100%',
  boxShadow: '0 3px 5px 2px rgba(0, 0, 0, .3)',
  backgroundColor: '#ffffff',
  color: '#333',
  position: 'relative',
}));

const PortfolioChart = () => {
  const chartContainerRef = useRef(null);
  const { datasets, transformedData, latestData } = UpdateChartData();

  const chartDimensions = useMemo(
    () =>
      chartContainerRef.current?.getBoundingClientRect() || {
        width: 400,
        height: 500,
      },
    [chartContainerRef.current]
  );

  return (
    <Grid item xs={12} sx={{ height: '100%', minWidth: '800px' }}>
      <ChartPaper elevation={3} ref={chartContainerRef}>
        {transformedData?.length ? (
          <LinearChart
            data={transformedData}
            dimensions={chartDimensions}
            latestData={latestData}
          />
        ) : (
          <div>No data available</div>
        )}
      </ChartPaper>
    </Grid>
  );
};

export default PortfolioChart;
