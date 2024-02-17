import React, { useEffect, useMemo, useState } from 'react';
import { Box, useMediaQuery, Grid, Container, Icon } from '@mui/material';
import {
  useChartContext,
  useCombinedContext,
  useStatisticsStore,
  useMode,
  useCollectionStore,
} from '../../../context';
import LoadingIndicator from '../../../components/reusable/indicators/LoadingIndicator';
import LinearChart from '../../../components/other/dataDisplay/chart/LinearChart';
import { ChartArea } from '../../../pages/pageStyles/StyledComponents';
// import { ChartGridBox } from './sub-components/ChartGridBox';
import { UpdaterAndStatisticsRow } from '../sub-components/UpdaterAndStatisticsRow';
import { defaultChartConstants } from '../../../context/constants';
import BoxHeader from '../../REUSABLE_COMPONENTS/BoxHeader';
const {
  HEIGHT_TO_WIDTH_RATIO,
  DEFAULT_THRESHOLD,
  TIME_RANGES,
  TIME_RANGES_KEYS,
} = defaultChartConstants;

const CollectionPortfolioChartContainer = () => {
  const { theme } = useMode();
  const isSmall = useMediaQuery(theme.breakpoints.down('sm'));
  const { allCollections, selectedCollection, newNivoChartData } =
    useCollectionStore();
  const { selectedTimeRange, timeRange, setTimeRange } = useChartContext();

  const [selectedChartData, setSelectedChartData] = useState(
    newNivoChartData[0]
  );

  const { socket } = useCombinedContext();
  const { stats, markers } = useStatisticsStore();
  console.log('SELECTED timeRange:', timeRange);
  useEffect(() => {
    console.log('ADJUSTED TIME RANGE ID:', newNivoChartData[0]);
    const oneDay = newNivoChartData[0];
    const sevenDays = newNivoChartData[1];
    const thirtyDays = newNivoChartData[2];
    const ninetyDays = newNivoChartData[3];
    const oneEightyDays = newNivoChartData[4];
    const twoSeventyDays = newNivoChartData[5];
    const threeSixtyFiveDays = newNivoChartData[6];
    // console.log('ALL RANES:', oneDay, sevenDays, thirtyDays, ninetyDays);
    if (timeRange.id === '24hr') {
      setSelectedChartData(oneDay);
    }
    if (timeRange.id === '7d') {
      console.log('SETTING SEVEN DAYS:', sevenDays);
      setSelectedChartData(sevenDays);
    }
    if (timeRange.id === '30d') {
      setSelectedChartData(thirtyDays);
    }
    if (timeRange.id === '90d') {
      setSelectedChartData(ninetyDays);
    }
    if (timeRange.id === '180d') {
      setSelectedChartData(oneEightyDays);
    }
    if (timeRange.id === '270d') {
      setSelectedChartData(twoSeventyDays);
    }
    if (timeRange.id === '365d') {
      setSelectedChartData(threeSixtyFiveDays);
    }
  }, [newNivoChartData, timeRange]); // Dependencies

  if (!selectedChartData || !timeRange) {
    return <LoadingIndicator />;
  }
  console.log('SELECTED CHARTD:', selectedChartData);

  return (
    <Container
      sx={{
        flexGrow: 1,
      }}
    >
      <BoxHeader
        title="Collection Card Chart"
        subtitle="List of all cards in the collection"
        icon={<Icon>table_chart</Icon>}
        sideText="+4%"
      />
      <Grid container spacing={3}>
        <Grid
          item
          xs={12}
          sx={{
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <ChartArea theme={theme}>
            <LinearChart
              nivoData={selectedChartData}
              height={500}
              timeRange={timeRange}
              specialPoints={markers}
            />
          </ChartArea>
        </Grid>
      </Grid>
      <Grid item xs={12}>
        <UpdaterAndStatisticsRow
          isSmall={isSmall}
          socket={socket}
          timeRange={timeRange}
          stats={stats}
        />
      </Grid>
    </Container>
  );
};

export default CollectionPortfolioChartContainer;
