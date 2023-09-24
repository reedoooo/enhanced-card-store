import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Grid, Paper } from '@mui/material';
import { styled } from '@mui/system';
import LinearChart from './LinearChart';
import UpdateChartData from '../collection/UpdateChartData';

const ChartPaper = styled(Paper)(({ theme }) => ({
  borderRadius: '12px',
  width: '100%',
  height: '100%', // Ensure it takes the full height of the parent container
  boxShadow: '0 3px 5px 2px rgba(0, 0, 0, .3)',
  backgroundColor: '#ffffff',
  color: '#333',
  position: 'relative',
}));

const PortfolioChart = () => {
  const [latestData, setLatestData] = useState(null);
  const [lastUpdateTime, setLastUpdateTime] = useState(null);
  const chartContainerRef = useRef(null);

  const { datasets } = UpdateChartData();
  console.log('DATASETS:', datasets);

  useEffect(() => {
    if (!datasets) return;
    const currentTime = new Date().getTime();

    if (lastUpdateTime === null || currentTime - lastUpdateTime >= 3600000) {
      setLastUpdateTime(currentTime);

      const lastDataset = datasets[0]?.data?.[datasets[0]?.data?.length - 1];
      if (lastDataset) {
        setLatestData({
          x: lastDataset?.x,
          y: lastDataset?.y,
        });
      }
    }
    // Notice that I added lastUpdateTime to the dependency array.
    // This ensures that if you update the time, the effect won't re-run until datasets changes or an hour has passed.
  }, [
    datasets,
    lastUpdateTime,
    setLastUpdateTime,
    setLatestData,
    latestData,
    setLatestData,
    setLastUpdateTime,
  ]);

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
