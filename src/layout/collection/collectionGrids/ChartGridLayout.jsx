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
import IconStatWrapper from '../../REUSABLE_COMPONENTS/unique/IconStatWrapper';
import { TopCardsDisplayRow } from '../sub-components/TopCardsDisplayRow';
import LoadingOverlay from '../../LoadingOverlay';
import RCWrappedIcon from '../../REUSABLE_COMPONENTS/RCWRAPPEDICON/RCWrappedIcon';
import {
  ResponsiveContainer,
  CartesianGrid,
  AreaChart,
  BarChart,
  Bar,
  LineChart,
  XAxis,
  YAxis,
  Legend,
  Line,
  Tooltip,
  Area,
} from 'recharts';
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
  const { selectedCollection, showCollections } = useSelectedCollection();
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
  const averagedData = selectedCollection.averagedChartData;
  if (!averagedData || !averagedData[selectedTimeRange]) {
    return <LoadingOverlay />;
  }
  // if (!averagedData || !averagedData[selectedTimeRange]) {
  //   return (
  //     <Container
  //       sx={{
  //         flexGrow: 1,
  //         height: '100%',
  //         display: 'flex',
  //         flexDirection: 'row',
  //       }}
  //     >
  //       <MDBox sx={{ width: '50%', height: '100%' }}>
  //         <Grid container spacing={2}>
  //           <Grid
  //             item
  //             xs={12}
  //             sx={{ display: 'flex', justifyContent: 'center' }}
  //           >
  //             <DashboardBox sx={{ height: 400, width: '100%' }}>
  //               <SkeletonLoader type="chart" height="100%" />
  //             </DashboardBox>
  //           </Grid>
  //         </Grid>
  //       </MDBox>
  //       <MDBox sx={{ width: '50%', height: '100%', overflow: 'auto' }}>
  //         <Grid container spacing={2} direction="column">
  //           {[...Array(5)].map((_, index) => (
  //             <Grid
  //               item
  //               key={`skeleton-item-${index}`}
  //               sx={{ display: 'flex', justifyContent: 'center' }}
  //             >
  //               <DashboardBox sx={{ height: 100, width: '90%', my: 0.5 }}>
  //                 <SkeletonLoader type="text" height={60} />
  //               </DashboardBox>
  //             </Grid>
  //           ))}
  //         </Grid>
  //       </MDBox>
  //     </Container>
  //   );
  // }

  const selectedChartData = useMemo(() => {
    const chartData = averagedData[selectedTimeRange];
    return chartData || null;
  }, [selectedCollection.averagedChartData, selectedTimeRange]);
  useEffect(() => {
    console.log('DEBUG LOG, ', {
      selectedChartData,
      markers,
      selectedTimeRange,
    });
  }, []);

  const updatedAt = selectedCollection?.updatedAt;
  const formattedTime = updatedAt
    ? new Date(updatedAt).toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit',
      })
    : 'Loading...';

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
            // cardTitle="Collection Card List"
            // data={''}
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
                    range={'24h'}
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
          sx={{ display: 'flex', flexDirection: 'column' }}
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
