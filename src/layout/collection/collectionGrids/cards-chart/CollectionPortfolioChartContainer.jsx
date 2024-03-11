import React, { useEffect, useMemo, useState } from 'react';
import { Box, useMediaQuery, Grid, Container, Icon } from '@mui/material';
import {
  useChartContext,
  useStatisticsStore,
  useMode,
  useCollectionStore,
} from '../../../../context';
import { ChartArea } from '../../../../pages/pageStyles/StyledComponents';
import BoxHeader from '../../../REUSABLE_COMPONENTS/BoxHeader';
import LinearChart from './LinearChart';
import { Suspense } from 'react';
import useSkeletonLoader from '../cards-datatable/useSkeletonLoader';
import useSelectedCollection from '../../../../context/MAIN_CONTEXT/CollectionContext/useSelectedCollection';
import useTimeRange from '../../../../components/forms/selectors/useTimeRange';

const CollectionPortfolioChartContainer = () => {
  const { theme } = useMode();
  const env = process.env.CHART_ENVIRONMENT;
  const isSmall = useMediaQuery(theme.breakpoints.down('sm'));
  const { selectedCollection } = useSelectedCollection();
  const chartDataVariants = {
    averaged: selectedCollection.averagedChartData,
    raw: selectedCollection.nivoChartData,
    new: selectedCollection.newNivoChartData,
    test: selectedCollection.nivoTestData,
  };
  const selectedData = chartDataVariants.averaged;
  const { selectedTimeRange } = useTimeRange();
  const { stats, markers } = useStatisticsStore();
  const { SkeletonLoader } = useSkeletonLoader();
  // Directly use the averagedChartData map for selecting the data based on timeRange
  const selectedChartData = useMemo(() => {
    const averagedData = selectedCollection.averagedChartData;

    if (!averagedData || !averagedData[selectedTimeRange]) {
      console.error(
        'No averaged chart data available for the selected time range.'
      );
      return null;
    }

    // Retrieve the specific dataset for the current time range directly
    const chartData = averagedData[selectedTimeRange];
    return chartData || null; // Return null if the specific range data is not available
  }, [selectedCollection.averagedChartData, selectedTimeRange]);

  if (!selectedChartData) {
    return (
      <Container sx={{ flexGrow: 1 }}>
        <BoxHeader
          title="Collection Card Chart"
          subtitle="List of all cards in the collection"
          icon={<Icon>table_chart</Icon>}
          sideText={new Date().toLocaleString()}
        />
        <SkeletonLoader type="chart" height={isSmall ? 150 : 500} />
        <SkeletonLoader type="text" count={2} />
        <SkeletonLoader type="listItem" count={5} />
      </Container>
    );
  }

  // const setSelectedChartData = (chartData) => {
  //   console.log('setSelectedChartData', chartData);
  //   setTimeRange(chartData);
  // };
  // useEffect(() => {
  //   const timeRangeIdMap = nivoTestData?.reduce((acc, data) => {
  //     acc[data.id] = data;
  //     return acc;
  //   }, {});
  //   console.log('TIME RANGE ID MAP:', timeRangeIdMap);

  //   const matchedData = timeRangeIdMap[timeRange.id];
  //   if (matchedData) {
  //     console.log('SET SELECTED DATA:', matchedData);
  //     setSelectedChartData(matchedData);
  //     // setSelectedChartData(matchedData);
  //   }
  // }, [selectedData, timeRange]);

  // if (!selectedChartData) {
  //   return (
  //     <Container sx={{ flexGrow: 1 }}>
  //       <BoxHeader
  //         title="Collection Card Chart"
  //         subtitle="List of all cards in the collection"
  //         icon={<Icon>table_chart</Icon>}
  //         sideText={new Date().toLocaleString()}
  //       />
  //       <SkeletonLoader
  //         type="chart"
  //         height={theme.breakpoints.down('sm') ? 150 : 500}
  //       />
  //       <SkeletonLoader type="text" count={2} />
  //       <SkeletonLoader type="listItem" count={5} />
  //     </Container>
  //   );
  // }
  return (
    <Suspense fallback={<SkeletonLoader type="chart" height={500} />}>
      {/* <ChartWrapper theme={uniqueTheme}> */}
      <ChartArea theme={theme}>
        <LinearChart
          nivoData={selectedChartData}
          height={500}
          timeRange={selectedTimeRange}
          specialPoints={markers}
        />
      </ChartArea>
      {/* </ChartWrapper> */}
    </Suspense>
  );
};

export default CollectionPortfolioChartContainer;
// useEffect(() => {
//   console.log('ADJUSTED TIME RANGE ID:', newNivoChartData[0].id);
//   const oneDay = newNivoChartData[0].id;
//   const sevenDays = newNivoChartData[1].id;
//   const thirtyDays = newNivoChartData[2].id;
//   const ninetyDays = newNivoChartData[3].id;
//   const oneEightyDays = newNivoChartData[4].id;
//   const twoSeventyDays = newNivoChartData[5].id;
//   const threeSixtyFiveDays = newNivoChartData[6].id;

//   setTimeRangeIds([
//     oneDay,
//     sevenDays,
//     thirtyDays,
//     ninetyDays,
//     oneEightyDays,
//     twoSeventyDays,
//     threeSixtyFiveDays,
//   ]);

//   // console.log('ALL RANES:', oneDay, sevenDays, thirtyDays, ninetyDays);
//   if (timeRange.id === '24hr') {
//     setSelectedChartData(oneDay);
//   }
//   if (timeRange.id === '7d') {
//     console.log('SETTING SEVEN DAYS:', sevenDays);
//     setSelectedChartData(sevenDays);
//   }
//   if (timeRange.id === '30d') {
//     setSelectedChartData(thirtyDays);
//   }
//   if (timeRange.id === '90d') {
//     setSelectedChartData(ninetyDays);
//   }
//   if (timeRange.id === '180d') {
//     setSelectedChartData(oneEightyDays);
//   }
//   if (timeRange.id === '270d') {
//     setSelectedChartData(twoSeventyDays);
//   }
//   if (timeRange.id === '365d') {
//     setSelectedChartData(threeSixtyFiveDays);
//   }
// }, [newNivoChartData, timeRange]); // Dependencies

// if (!selectedChartData || !timeRange) {
//   return <LoadingIndicator />;
// }
