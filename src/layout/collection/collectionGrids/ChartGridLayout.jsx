import React, { Suspense, useEffect, useMemo } from 'react';
import {
  Grid,
  Card,
  useMediaQuery,
  Icon,
  Container,
  Grow,
  Box,
} from '@mui/material';
import MDBox from '../../REUSABLE_COMPONENTS/MDBOX';
import { useMode } from '../../../context';
import DashboardBox from '../../REUSABLE_COMPONENTS/DashboardBox';
import BoxHeader from '../../REUSABLE_COMPONENTS/BoxHeader';
import { UpdaterAndStatisticsRow } from './cards-chart/UpdaterAndStatisticsRow';
import SimpleCard from '../../REUSABLE_COMPONENTS/unique/SimpleCard';
import uniqueTheme from '../../REUSABLE_COMPONENTS/unique/uniqueTheme';
import { ChartArea } from '../../../pages/pageStyles/StyledComponents';
import useSelectedCollection from '../../../context/MAIN_CONTEXT/CollectionContext/useSelectedCollection';
import useTimeRange from '../../../components/forms/selectors/useTimeRange';
import useSkeletonLoader from '../../REUSABLE_COMPONENTS/useSkeletonLoader';
import { ChartConfiguration } from './cards-chart/ChartConfigs';
import { TopCardsDisplayRow } from '../sub-components/TopCardsDisplayRow';
import LoadingOverlay from '../../LoadingOverlay';
import RCWrappedIcon from '../../REUSABLE_COMPONENTS/RCWRAPPEDICON/RCWrappedIcon';
import { ResponsiveContainer } from 'recharts';
import PricedDataTable from './cards-datatable/PricedDataTable';
import preparePortfolioTableData from '../data/portfolioData';

const renderCardContainer = (content) => {
  return (
    <MDBox sx={{ borderRadius: '10px', flexGrow: 1, overflow: 'hidden' }}>
      <SimpleCard
        theme={uniqueTheme}
        content={content}
        hasTitle={false}
        sx={{ height: '100%' }}
      >
        {content}
      </SimpleCard>
    </MDBox>
  );
};

const ChartGridLayout = ({ selectedCards, removeCard }) => {
  const { theme } = useMode();
  const isXs = useMediaQuery(theme.breakpoints.down('sm'));
  const { selectedCollection, showCollections, markers } =
    useSelectedCollection();
  const { selectedTimeRange } = useTimeRange();
  const { SkeletonLoader } = useSkeletonLoader();
  const averagedData = selectedCollection.averagedChartData;
  if (!averagedData || !averagedData[selectedTimeRange]) {
    return <LoadingOverlay />;
  }
  const selectedChartData = useMemo(() => {
    const chartData = averagedData[selectedTimeRange];
    return chartData || null;
  }, [selectedCollection?.averagedChartData, selectedTimeRange]);

  const { data, columns } = useMemo(
    () => preparePortfolioTableData(selectedCollection?.cards),
    [selectedCollection?.cards]
  );
  const updatedAt = selectedCollection?.updatedAt;
  const formattedTime = updatedAt
    ? new Date(updatedAt).toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit',
      })
    : 'Loading...';
  const entriesPerPage = {
    defaultValue: 5,
    entries: [5, 10, 15, 20],
  };
  return (
    <MDBox mt={4.5} sx={{ width: '100%', hidden: showCollections }}>
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
            hasTitle={false}
            isTableOrChart={true}
          >
            <BoxHeader
              title="Collection Card Chart"
              subtitle="List of all cards in the collection"
              icon={
                <RCWrappedIcon>
                  <Icon>show_chart</Icon>
                </RCWrappedIcon>
              }
              sideText="+4%"
            />
          </SimpleCard>
          {renderCardContainer(
            <Suspense fallback={<SkeletonLoader type="chart" height={500} />}>
              <ResponsiveContainer width="100%" height="100%">
                <ChartArea
                  theme={theme}
                  sx={{
                    minHeight: '500px',
                  }}
                >
                  <ChartConfiguration
                    nivoChartData={[selectedChartData]}
                    markers={markers}
                    height={500}
                    // range={selectedTimeRange}
                    loadingID={selectedTimeRange}
                    range={'24hr'}
                  />
                </ChartArea>
              </ResponsiveContainer>
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
          <SimpleCard
            theme={uniqueTheme}
            hasTitle={false}
            isPrimary={true}
            // cardTitle=""
            data={''}
          >
            <TopCardsDisplayRow />
          </SimpleCard>
        </DashboardBox>
        <DashboardBox
          component={Grid}
          item
          xs={12}
          lg={5}
          sx={{
            display: 'flex',
            flexDirection: 'column',
            minHeight: '800px',
          }}
        >
          <SimpleCard
            theme={uniqueTheme}
            hasTitle={false}
            data=""
            isTableOrChart={true}
          >
            <BoxHeader
              title="Collection Card List"
              subtitle="List of all cards in the collection"
              icon={
                <RCWrappedIcon color="success">
                  <Icon>list</Icon>
                </RCWrappedIcon>
              }
              // sideText="Updated recently"
              sideText={`Last Updated: ${formattedTime}`}
            />
          </SimpleCard>
          {renderCardContainer(
            <PricedDataTable
              entriesPerPage={entriesPerPage}
              canSearch={true}
              table={{ columns, data }}
              isSorted={true}
              noEndBorder
            />
          )}
        </DashboardBox>
      </Grid>
    </MDBox>
  );
};

export default ChartGridLayout;
