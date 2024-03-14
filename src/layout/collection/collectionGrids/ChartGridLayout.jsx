import React, { Suspense, useEffect, useMemo } from 'react';
import { Grid, Card, useMediaQuery, Icon, Container } from '@mui/material';
import MDBox from '../../REUSABLE_COMPONENTS/MDBOX';
import DataTable from './cards-datatable';
import { useMode, useStatisticsStore } from '../../../context';
import DashboardBox from '../../REUSABLE_COMPONENTS/DashboardBox';
import BoxHeader from '../../REUSABLE_COMPONENTS/BoxHeader';
import { UpdaterAndStatisticsRow } from './cards-chart/UpdaterAndStatisticsRow';
import SimpleCard from '../../REUSABLE_COMPONENTS/unique/SimpleCard';
import uniqueTheme from '../../REUSABLE_COMPONENTS/unique/uniqueTheme';
import { ChartArea } from '../../../pages/pageStyles/StyledComponents';
import useSelectedCollection from '../../../context/MAIN_CONTEXT/CollectionContext/useSelectedCollection';
import useTimeRange from '../../../components/forms/selectors/useTimeRange';
import useSkeletonLoader from './cards-datatable/useSkeletonLoader';
import ChartErrorBoundary from './cards-chart/ChartErrorBoundary';
import { ChartConfiguration } from './cards-chart/ChartConfigs';
const renderCardContainer = (content) => {
  return (
    <MDBox sx={{ borderRadius: '10px', flexGrow: 1, overflow: 'hidden' }}>
      <SimpleCard theme={uniqueTheme} content={content} hasTitle={false}>
        {content}
      </SimpleCard>
    </MDBox>
  );
};

const ChartGridLayout = ({ selectedCards, removeCard, columns, data }) => {
  const { theme } = useMode();
  const isXs = useMediaQuery(theme.breakpoints.down('sm'));
  const isLg = useMediaQuery(theme.breakpoints.up('lg'));
  const tableSize = isXs ? 'less' : isLg ? 'large' : 'small';
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
  const selectedChartData = useMemo(() => {
    const averagedData = selectedCollection.averagedChartData;

    if (!averagedData || !averagedData[selectedTimeRange]) {
      console.error(
        'No averaged chart data available for the selected time range.'
      );
      return null;
    }
    const chartData = averagedData[selectedTimeRange];
    return chartData || null;
  }, [selectedCollection.averagedChartData, selectedTimeRange]);
  // if (!selectedChartData) {
  //   return (
  //     <Container sx={{ flexGrow: 1 }}>
  //       <BoxHeader
  //         title="Collection Card Chart"
  //         subtitle="List of all cards in the collection"
  //         icon={<Icon>table_chart</Icon>}
  //         sideText={new Date().toLocaleString()}
  //       />
  //       <SkeletonLoader type="chart" height={isSmall ? 150 : 500} />
  //       <SkeletonLoader type="text" count={2} />
  //       <SkeletonLoader type="listItem" count={5} />
  //     </Container>
  //   );
  // }
  useEffect(() => {
    console.log('DEBUG LOG, ', {
      selectedChartData,
      markers,
      selectedTimeRange,
    });
  }, []);

  return (
    <MDBox mt={4.5} sx={{ width: '100%' }}>
      <Grid container spacing={1} sx={{ flexGrow: 1 }}>
        <DashboardBox
          component={Grid}
          item
          xs={12}
          lg={7}
          sx={{ display: 'flex', flexDirection: 'column' }}
        >
          <SimpleCard
            theme={uniqueTheme}
            hasTitle={true}
            isPrimary={true}
            cardTitle="Collection Card List"
            data={''}
          >
            <BoxHeader
              title="Collection Card Chart"
              subtitle="List of all cards in the collection"
              icon={<Icon>table_chart</Icon>}
              sideText="+4%"
            />
          </SimpleCard>
          {renderCardContainer(
            <Suspense fallback={<SkeletonLoader type="chart" height={500} />}>
              <ChartArea
                theme={theme}
                sx={{
                  minHeight: '500px',
                }}
              >
                {/* <LinearChart
                  nivoData={selectedChartData}
                  height={500}
                  timeRange={selectedTimeRange}
                  specialPoints={markers}
                /> */}
                <ChartConfiguration
                  nivoChartData={[selectedChartData]}
                  markers={markers}
                  height={500}
                  range={selectedTimeRange}
                  loadingID={selectedTimeRange}
                />
              </ChartArea>
            </Suspense>
          )}
          <SimpleCard
            theme={uniqueTheme}
            hasTitle={false}
            isPrimary={true}
            // cardTitle=""
            data={''}
          >
            <UpdaterAndStatisticsRow isSmall={isXs} />
          </SimpleCard>
        </DashboardBox>
        <DashboardBox
          component={Grid}
          item
          xs={12}
          lg={5}
          sx={{ display: 'flex', flexDirection: 'column' }}
        >
          <SimpleCard
            theme={uniqueTheme}
            hasTitle={true}
            isPrimary={true}
            cardTitle="Collection Card List"
            data={''}
          >
            <BoxHeader
              title="Collection Card List"
              subtitle="List of all cards in the collection"
              icon={<Icon>table_chart</Icon>}
              sideText="+4%"
            />
          </SimpleCard>
          {renderCardContainer(
            <DataTable
              table={{ columns, data }}
              isSorted={true}
              entriesPerPage={{
                defaultValue: 10,
                entries: [5, 10, 15, 20, 25],
              }}
              canSearch={true}
              showTotalEntries={true}
              noEndBorder
              tableSize={tableSize}
            />
          )}
        </DashboardBox>
      </Grid>
    </MDBox>
  );
};

export default ChartGridLayout;
