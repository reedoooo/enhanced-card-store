import React, { Suspense, useEffect, useMemo, useState } from 'react';
import { Grid, useMediaQuery, Icon, Box, Typography } from '@mui/material';
import { CircularProgress } from '@mui/joy';
import MDBox from 'layout/REUSABLE_COMPONENTS/MDBOX';
import { useMode } from 'context';
import DashboardBox from 'layout/REUSABLE_COMPONENTS/utils/layout-utils/DashboardBox';
import BoxHeader from 'layout/REUSABLE_COMPONENTS/utils/layout-utils/BoxHeader';
import LoadingOverlay from 'layout/REUSABLE_COMPONENTS/utils/system-utils/LoadingOverlay';
import { ResponsiveContainer } from 'recharts';
import { formatDateBasedOnRange, roundToNearestTenth } from 'context/Helpers';
import { formFields } from 'data/formsConfig';
import RCDynamicForm from 'layout/REUSABLE_COMPONENTS/RC_FORMS/RCDynamicForm';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import NivoContainer from 'layout/REUSABLE_COMPONENTS/utils/layout-utils/NivoContainer';
import { ChartArea } from 'layout/REUSABLE_STYLED_COMPONENTS/ReusableStyledComponents';
import useManager from 'context/state/useManager';
import useSelectorActions from 'context/hooks/useSelectorActions';
import RCWrappedIcon from 'layout/REUSABLE_COMPONENTS/RCWRAPPEDICON';
import prepareTableData from 'data/prepareTableData';
import { styled } from 'styled-components';
import TopCardsSwiper from './TopCardsSwiper';
import MyPortfolioLineChart from './MyPortfolioLineChart';
import RCCard from 'layout/REUSABLE_COMPONENTS/RCCARD';
import useBreakpoint from 'context/hooks/useBreakPoint';
const renderCardContainer = (content, isChart, isForm) => {
  return (
    <MDBox
      sx={{
        borderRadius: '10px',
        flexGrow: 1,
        overflow: 'hidden',
        my: isForm ? '1rem' : null,
      }}
    >
      <RCCard
        content={content}
        variant={isChart ? 'chart' : 'default'}
        hasTitle={false}
        noBottomMargin={false}
        // isChart={isChart ? true : false}
        sx={{ height: '100%' }}
      >
        {content}
      </RCCard>
    </MDBox>
  );
};
const StyledInfoPanel = styled(Box)(({ theme }) => ({
  padding: theme.spacing(2),
  backgroundColor: theme.palette.background.paper,
  borderRadius: theme.borders.borderRadius.md,
  boxShadow: theme.shadows[4],
  position: 'relative',
  width: 280,
  zIndex: 1500, // Ensure it is above the dialog
}));

const PortfolioViewLayout = () => {
  const { theme } = useMode();
  const { isMobile } = useBreakpoint();
  const {
    fetchCollections,
    hasFetchedCollections,
    selectedCollectionId,
    selectedCollection,
  } = useManager();
  // useEffect(() => {
  //   if (!hasFetchedCollections) {
  //     fetchCollections();
  //   }
  // }, []);
  const showCollections = selectedCollectionId ? true : false;
  const percentageChange =
    roundToNearestTenth(
      selectedCollection?.collectionStatistics?.percentageChange?.value
    ) || 0;
  const { data, columns } = useMemo(() => {
    if (!selectedCollection?.cards) {
      return { data: [], columns: [] }; // Provide default empty structures
    }
    return prepareTableData(selectedCollection.cards, 'portfolio');
  }, [selectedCollection?.cards]);
  if (!selectedCollection) {
    return <LoadingOverlay />;
  }
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
          <RCCard hasTitle={false} variant="table" noBottomMargin={false}>
            <BoxHeader
              title="Collection Card Chart"
              subtitle="Chart of the collection price performance"
              titleVariant="body1"
              icon={
                <MDBox border="none">
                  <RCWrappedIcon
                    color="white"
                    sx={{
                      background: theme.palette.success.main,
                    }}
                  >
                    <Icon fontSize="1.5 rem">show_chart</Icon>
                  </RCWrappedIcon>
                </MDBox>
              }
              sideText={`Change: ${percentageChange}%`}
            />
          </RCCard>
          {/* CHART ROW SECTION */}
          {selectedCollection?.cards?.length < 5 ? (
            <Grid
              container
              spacing={2}
              sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <Grid item xs={12} sm={6} md={6} lg={6}>
                <StyledInfoPanel theme={theme}>
                  <CircularProgress />
                </StyledInfoPanel>
              </Grid>
              <Grid item xs={12} sm={6} md={6} lg={6}>
                <StyledInfoPanel theme={theme}>
                  <Typography
                    variant="h6"
                    color="textPrimary"
                    gutterBottom
                    theme={theme}
                  >
                    Chart stuck loading?
                  </Typography>
                  <Typography
                    variant="body1"
                    color={theme.palette.text.secondary}
                    theme={theme}
                  >
                    No worries, the chart requires that users add a minimum of 5
                    cards before chart functionality is activated to ensure the
                    best possible chart.
                  </Typography>
                </StyledInfoPanel>
              </Grid>
            </Grid>
          ) : (
            <ChartAreaComponent />
          )}
          {/* FORM SELECTOR ROW SECTION */}
          <FormSelectorRow isXs={isMobile} />
          {/* TOP CARDS ROW SECTION */}
          <TopCardsDisplayRowComponent isXs={isMobile} />
        </DashboardBox>
        {/* CARD LIST SECTION */}
        <CollectionCardList
          data={data}
          columns={columns}
          theme={theme}
          selectedCollection={selectedCollection}
        />
      </Grid>
    </MDBox>
  );
};

export default PortfolioViewLayout;
// !--------------------- FORM SELECTOR ROW COMPONENTS ---------------------
const FormSelectorRow = React.memo(({ isXs }) => {
  const { theme } = useMode();
  const formKeys = ['statRangeForm', 'timeRangeForm', 'themeRangeForm'];
  return renderCardContainer(
    <Grid
      container
      sx={{
        width: '100%',
        flexDirection: isXs ? 'column' : 'row',
        mt: theme.spacing(1),
      }}
    >
      <Grid
        item
        sx={{
          flexGrow: 1,
          display: 'flex',
          flexDirection: 'row',
        }}
      >
        {formKeys?.map((formKey) => (
          <RCDynamicForm
            key={formKey}
            formKey={formKey}
            inputs={formFields[formKey]}
            userInterfaceOptions={{
              formBoxStyles: {
                boxShadow: 'none',
                py: '0.5rem',
              },
            }}
          />
        ))}
      </Grid>
    </Grid>,
    false,
    true
  );
});
FormSelectorRow.displayName = 'FormSelectorRow';
// !--------------------- CHART COMPONENT ---------------------
const ChartAreaComponent = React.memo(() => {
  const { theme } = useMode();
  const { success, error, grey } = theme.palette;
  const { selectedTimeRange, selectedStat } = useSelectorActions();
  const { selectedCollection, handleSelectCollection } = useManager();
  const [collection, setCollection] = useState(selectedCollection);
  const [timeRange, setTimeRange] = useState('24hr');
  const [marker, setMarker] = useState(null);
  useEffect(() => {
    const handleStorageChange = (event) => {
      if (event.key === 'selectedCollection' && event.newValue) {
        // console.log('selectedCollection changed', event.newValue);
        setCollection(JSON.parse(event.newValue));
        setTimeRange(JSON.parse(event.newValue).selectedChartDataKey);
        setMarker(
          JSON.parse(event.newValue).collectionStatistics[
            event.newValue.selectedStatDataKey
          ]
        );
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, [
    collection,
    setTimeRange,
    selectedCollection,
    handleSelectCollection,
    marker,
    setMarker,
  ]);
  if (!selectedCollection) {
    return <LoadingOverlay />;
  }
  const memoChartData = useMemo(() => {
    const { selectedChartData, averagedChartData, selectedChartDataKey } =
      collection;
    return !selectedChartData?.data?.length ||
      selectedChartData?.data?.length < 5
      ? averagedChartData[timeRange]
      : selectedChartData;
  }, [
    timeRange,
    collection.selectedChartData,
    collection.averagedChartData,
    collection.selectedChartDataKey,
  ]);
  if (!memoChartData) {
    return <LoadingOverlay />;
  }
  const memoMarker = useMemo(() => {
    const { selectedStatData, collectionStatistics, selectedStatDataKey } =
      collection;
    console.log('MARKER SET: ', collectionStatistics[selectedStatDataKey]);
    const newMarker = !selectedStatData
      ? collectionStatistics[selectedStatDataKey]
      : selectedStatData;
    // setMarker(newMarker);
    return newMarker;
  }, [collection, selectedStat]);

  const tickValues = useMemo(() => {
    const { ticks } = formatDateBasedOnRange(timeRange);
    return ticks.split(' ').map((tick) => new Date(tick).getTime());
  }, [timeRange]);
  useEffect(() => {
    console.log('Chart data:', memoChartData);
    console.log('TIME RANGE:', timeRange);

    console.log('SELCTED RANGE:', selectedTimeRange);
    // console.log('MARKER:', memoMarker);
    console.log('SELECTED MARKER', selectedStat);
  }, [memoChartData, timeRange, selectedTimeRange]);
  return renderCardContainer(
    <Suspense fallback={<LoadingOverlay />}>
      <ResponsiveContainer width="100%" height="100%" background={'#e0e0e0'}>
        <ChartArea theme={theme} sx={{ minHeight: '500px' }}>
          <NivoContainer height={500}>
            <MyPortfolioLineChart
              key={timeRange}
              data={[memoChartData]}
              tickValues={tickValues}
              validMarkers={[memoMarker]}
              xFormat={memoChartData.id === '24hr' ? '%H:%M' : '%b %d'}
              error={error}
              success={success}
              grey={grey}
              text={theme.palette.text.primary}
            />
          </NivoContainer>
        </ChartArea>
      </ResponsiveContainer>
    </Suspense>,
    true
  );
});
ChartAreaComponent.displayName = 'ChartAreaComponent';
//!--------------------- CARD DISPLAY COMPONENT ---------------------
const TopCardsDisplayRowComponent = React.memo(({ isXs }) => {
  return (
    <RCCard hasTitle={false} noBottomMargin={true}>
      <Grid
        container
        spacing={2}
        sx={{ width: '100%', flexDirection: isXs ? 'column' : 'row' }}
      >
        <Grid
          item
          xs={12}
          sm={12}
          md={12}
          lg={12}
          sx={{
            width: '100%',
            flexGrow: 1,
            display: 'flex',
            justifyContent: 'center',
          }}
        >
          <TopCardsSwiper />
        </Grid>
      </Grid>
    </RCCard>
  );
});
TopCardsDisplayRowComponent.displayName = 'TopCardsDisplayRowComponent';
//!--------------------- CARD LIST COMPONENT ---------------------
const CollectionCardList = React.memo(({ data, columns, theme }) => {
  const { selectedCollection } = useManager();
  const formattedTime = selectedCollection?.updatedAt
    ? new Date(selectedCollection?.updatedAt).toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit',
      })
    : 'Loading...';
  const entriesPerPage = {
    defaultValue: 10,
    entries: [5, 10, 25, 50, 100],
  };
  const [pageSize, setPageSize] = useState(entriesPerPage.defaultValue);

  useEffect(() => {
    setPageSize(entriesPerPage.defaultValue);
  }, [entriesPerPage.defaultValue]);
  return (
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
      <RCCard
        hasTitle={false}
        variant="table"
        noBottomMargin={false}
        sx={{
          alignItems: 'flex-start',
        }}
      >
        <BoxHeader
          title="Collection Card List"
          subtitle="List of all cards in the collection"
          titleVariant="body1"
          icon={
            <MDBox border="none">
              <RCWrappedIcon
                color="white"
                sx={{
                  background: theme.palette.success.main,
                }}
              >
                <Icon fontSize="1.5 rem">list</Icon>
              </RCWrappedIcon>
            </MDBox>
          }
          sideText={`Last Updated: ${formattedTime}`}
        />
      </RCCard>
      {renderCardContainer(
        <Box sx={{ height: 510, width: '100%' }}>
          <DataGrid
            rows={data?.map((row, index) => ({ id: index, ...row }))}
            columns={columns}
            pageSize={pageSize}
            onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
            rowsPerPageOptions={[5, 10, 15, 20].map((pageSize) => ({
              value: pageSize,
              label: pageSize,
            }))}
            slots={{ toolbar: GridToolbar }}
            slotProps={{
              toolbar: {
                showQuickFilter: true,
              },
            }}
            initialState={{
              filter: {
                filterModel: {
                  items: [],
                  quickFilterValues: [''],
                },
              },
            }}
            checkboxSelection
            sx={{
              '& .MuiDataGrid-root': {
                color: theme.palette.grey.dark,
                border: 'none',
              },
              '& .MuiDataGrid-cell': {
                borderBottom: `1px solid ${theme.palette.grey.lightest} !important`,
              },
              '& .MuiDataGrid-columnHeaders': {
                borderBottom: `1px solid ${theme.palette.grey.lightest} !important`,
              },
              '& .MuiDataGrid-columnSeparator': {
                visibility: 'hidden',
              },
            }}
          />
        </Box>
      )}
    </DashboardBox>
  );
});
CollectionCardList.displayName = 'CollectionCardList';
// !--------------------- END OF COMPONENTS ---------------------
