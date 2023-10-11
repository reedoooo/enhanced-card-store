import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Grid } from '@mui/material';
import { styled } from '@mui/system';
import LinearChart from './LinearChart';
import useUpdateChartData from '../../context/cleanUp/useUpdateChartData';
import { useCollectionStore } from '../../context/hooks/collection';

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
  const { selectedCollection } = useCollectionStore();
  const datasets = selectedCollection?.chartData?.allXYValues;

  useEffect(() => {
    if (!datasets) return;
    const currentTime = new Date().getTime();

    if (!lastUpdateTime || currentTime - lastUpdateTime >= 600000) {
      setLastUpdateTime(currentTime);

      const lastDatasetIndex = datasets.length - 1;
      const lastDataset = datasets[lastDatasetIndex];
      lastDataset && setLatestData(lastDataset);
    }
    // If you intend to add timeouts or intervals later, ensure you add the cleanup
    // return () => {
    //   clearTimeout(yourTimeout);
    // };
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
            data={datasets || []}
            latestData={latestData}
            dimensions={chartDimensions}
          />
        ) : (
          <div>No data available</div>
        )}
      </ChartPaper>
    </Grid>
  );
};

export default PortfolioChart;
