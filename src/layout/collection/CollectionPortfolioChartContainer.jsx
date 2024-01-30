import React, { useMemo } from 'react';
import { Box, useMediaQuery, Grid, Container } from '@mui/material';
import {
  useChartContext,
  useCombinedContext,
  useStatisticsStore,
  useMode,
  useCollectionStore,
} from '../../context';
import LoadingIndicator from '../../components/reusable/indicators/LoadingIndicator';
import LinearChart from '../../components/other/dataDisplay/chart/LinearChart';
import {
  ChartArea,
  ChartContainer,
} from '../../pages/pageStyles/StyledComponents';
// import { ChartGridBox } from './sub-components/ChartGridBox';
import { UpdaterAndStatisticsRow } from './sub-components/UpdaterAndStatisticsRow';
import { TopCardsDisplayRow } from './sub-components/TopCardsDisplayRow';
import { chartConstants } from '../../context/constants';
import { AutoSizer } from 'react-virtualized';
const { HEIGHT_TO_WIDTH_RATIO, DEFAULT_THRESHOLD, TIME_RANGES } =
  chartConstants;
const convertTimeRangeToMs = (timeRange) =>
  TIME_RANGES[timeRange.label] || DEFAULT_THRESHOLD;
const getMillisecondsFromDateString = (dateString) =>
  new Date(dateString).getTime();
// Updated handleThresholdUpdate function
function handleThresholdUpdate(currentTime, lastUpdateTime, setLastUpdateTime) {
  if (!lastUpdateTime || currentTime - lastUpdateTime >= DEFAULT_THRESHOLD) {
    setLastUpdateTime(currentTime);
    return currentTime;
  }
  return lastUpdateTime;
}
/**
 * Groups and averages a collection of data points.
 *
 * @param {Array} collection - The data points collection.
 * @param {number} threshold - Time threshold for clustering.
 * @returns {Array} - Array with clustered and averaged data points.
 */
const groupAndAverageCollection = (collection, threshold) => {
  let clusters = [];
  let currentCluster = [collection[0]];

  for (let i = 1; i < collection?.length; i++) {
    const prevTime = new Date(collection[i - 1]?.x).getTime();
    const currentTime = new Date(collection[i]?.x).getTime();

    if (currentTime - prevTime <= threshold) {
      currentCluster.push(collection[i]);
    } else {
      clusters.push(currentCluster);
      currentCluster = [collection[i]];
    }
  }
  clusters.push(currentCluster); // Push the last cluster

  return clusters.map((cluster) => {
    const avgY =
      cluster.reduce((sum, point) => sum + parseFloat(point.y), 0) /
      cluster.length;
    return {
      x: cluster[0]?.x, // Set x to the start of the threshold
      y: avgY?.toFixed(2), // Average of y values
    };
  });
};
/**
 * Groups and averages data points based on a time threshold.
 *
 * @param {Array} data - Array of objects containing data points.
 * @param {number} threshold - Time threshold for clustering in milliseconds.
 * @param {string} timeRange - Time range string corresponding to the threshold.
 * @returns {Array} - Array with clustered and averaged data points.
 */
export const groupAndAverageData = (
  data,
  threshold = DEFAULT_THRESHOLD,
  timeRange
) => {
  if (!data || data?.length === 0) return [];
  const adjustedThreshold = timeRange
    ? convertTimeRangeToMs(timeRange)
    : threshold;
  return data?.map((collection) => ({
    ...collection,
    data: groupAndAverageCollection(collection?.data, adjustedThreshold),
  }));
};
/**
 * Filters a collection of data points based on a time threshold.
 *
 * @param {Array} collection - The data points collection.
 * @param {number} threshold - Time threshold for filtering.
 * @returns {Array} - Array with data points filtered by the time threshold.
 */
const filterCollectionByTimeRange = (collection, threshold) => {
  return collection?.filter((point) => {
    const pointTime = new Date(point.x).getTime();
    return pointTime >= threshold;
  });
};
/**
 * Filters data points based on a time range.
 *
 * @param {Array} data - Array of objects containing data points.
 * @param {string} timeRange - Time range string for filtering data points.
 * @returns {Array} - Array with data points filtered by the time range.
 */
export const filterDataByTimeRange = (data, timeRange) => {
  if (!data || data.length === 0) return [];

  const now = new Date().getTime();
  console.log('TIME RANGE:', timeRange);
  const timeThreshold = timeRange;
  console.log('Time Threshold:', timeThreshold);
  if (!timeThreshold) {
    console.error(`Invalid timeRange provided: ${timeRange}`);
    return [];
  }

  return data.map((collection) => ({
    ...collection,
    data: filterCollectionByTimeRange(collection.data, now - timeThreshold),
  }));
};

const CollectionPortfolioChartContainer = ({ selectedCards, removeCard }) => {
  const { theme } = useMode();
  const isSmall = useMediaQuery(theme.breakpoints.down('sm'));
  const { allCollections, selectedCollection } = useCollectionStore();
  const { timeRange } = useChartContext();
  const { socket } = useCombinedContext();
  const { stats, markers } = useStatisticsStore();
  // const chartRef = useRef(null);
  if (!selectedCollection || !selectedCollection?._id) {
    return <LoadingIndicator />;
  }
  // const BASIC_NIVO_CHART_DATA = selectedCollection?.nivoChartData;
  const BASIC_NIVO_CHART_DATA = useMemo(
    () => [
      {
        id: selectedCollection?.nivoChartData[0]?.id || 'default',
        data: selectedCollection?.nivoChartData[0]?.data?.map(({ x, y }) => ({
          x: x,
          y: y,
        })),
      },
    ],
    [selectedCollection]
  );

  return (
    <Container
      maxWidth="lg"
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: theme.spacing(2),
        gap: theme.spacing(2),
        background: '#333', // Darker background for Paper
        color: '#fff', // White text color
        border: '1px solid #555',
        borderRadius: 2,
      }}
    >
      <ChartArea theme={theme} style={{ width: '100%', height: '100%' }}>
        <AutoSizer>
          {({ width, height }) => (
            <ChartContainer width={width} height={height} theme={theme}>
              <LinearChart
                nivoChartData={BASIC_NIVO_CHART_DATA}
                width={width}
                height={height}
                timeRange={timeRange}
                specialPoints={markers}
              />
            </ChartContainer>
          )}
        </AutoSizer>
      </ChartArea>
      <UpdaterAndStatisticsRow
        isSmall={isSmall}
        socket={socket}
        timeRange={timeRange}
        stats={stats}
      />
      <TopCardsDisplayRow isSmall={isSmall} theme={theme} />
    </Container>
  );
};

export default CollectionPortfolioChartContainer;
