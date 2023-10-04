import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Grid } from '@mui/material';
import { styled } from '@mui/system';
import LinearChart from './LinearChart';
import useUpdateChartData from '../collection/UpdateChartData';

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
  const [latestData, setLatestData] = useState(null);
  const [lastUpdateTime, setLastUpdateTime] = useState(null);
  const chartContainerRef = useRef(null);
  const { datasets } = useUpdateChartData();
  console.log('datasets', datasets);
  // Update the latest data point every 10 minutes
  useEffect(() => {
    if (!datasets) return;
    const currentTime = new Date().getTime();
    if (!lastUpdateTime || currentTime - lastUpdateTime >= 600000) {
      setLastUpdateTime(currentTime);

      const lastDataset = datasets[0]?.data?.[datasets[0]?.data?.length - 1];
      lastDataset && setLatestData(lastDataset);
    }
  }, [datasets, lastUpdateTime]);
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
        {datasets && datasets?.length > 0 ? (
          <LinearChart
            data={datasets}
            dimensions={
              chartContainerRef.current?.getBoundingClientRect() || {
                width: 400,
                height: 500,
              }
            }
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
