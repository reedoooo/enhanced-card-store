import React, { Suspense, useEffect, useMemo, useState } from 'react';
import { Grid, useMediaQuery, Icon, Box, Typography } from '@mui/material';
import MDBox from '../REUSABLE_COMPONENTS/MDBOX';
import { useMode } from '../../context';
import DashboardBox from '../REUSABLE_COMPONENTS/layout-utils/DashboardBox';
import BoxHeader from '../REUSABLE_COMPONENTS/layout-utils/BoxHeader';
import SimpleCard from '../REUSABLE_COMPONENTS/unique/SimpleCard';
import uniqueTheme from '../REUSABLE_COMPONENTS/unique/uniqueTheme';
import LoadingOverlay from '../REUSABLE_COMPONENTS/system-utils/LoadingOverlay';
import { ResponsiveContainer } from 'recharts';
import {
  formatDateBasedOnRange,
  roundToNearestTenth,
} from '../../context/Helpers';
import { TopCardsDisplayRow } from './TopCardsDisplayRow';
import { formFields } from '../../components/forms/formsConfig';
import RCDynamicForm from '../../components/forms/Factory/RCDynamicForm';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import NivoContainer from '../REUSABLE_COMPONENTS/layout-utils/NivoContainer';
import MyResponsiveLine from './MyPortfolioLineChart';
import { CircularProgress } from '@mui/joy';
import { ChartArea } from '../REUSABLE_STYLED_COMPONENTS/ReusableStyledComponents';
import useManager from '../../context/useManager';
import useSelectorActions from '../../context/hooks/useSelectorActions';
import RCWrappedIcon from 'layout/REUSABLE_COMPONENTS/RCWRAPPEDICON';
import prepareTableData from '../../data/prepareTableData';
import { styled } from 'styled-components';
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
      <SimpleCard
        theme={uniqueTheme}
        content={content}
        hasTitle={false}
        isChart={isChart ? true : false}
        sx={{ height: '100%' }}
      >
        {content}
      </SimpleCard>
    </MDBox>
  );
};
const StyledInfoPanel = styled(Box)(({ theme }) => ({
  padding: theme.spacing(2),
  backgroundColor: theme.palette.background.paper,
  borderRadius: theme.shape.borderRadius,
  boxShadow: theme.shadows[4],
  position: 'relative',
  // right: 15, // Align to the right edge of the parent dialog
  // top: 15, // Align to the top of the dialog
  // transform: 'translate(15%, 0%)', // Adjust so it slightly overlaps
  width: 280,
  zIndex: 1500, // Ensure it is above the dialog
}));

const newCollectionPanel = () => {
  const { theme } = useMode();

  return (
    <StyledInfoPanel theme={theme}>
      <Typography variant="h6" color="textPrimary" gutterBottom theme={theme}>
        First Time Here?
      </Typography>
      <Typography
        variant="body1"
        color={theme.newPalette.text.secondary}
        theme={theme}
      >
        Use the guest account to explore:
      </Typography>
      <Typography
        variant="body2"
        color={theme.newPalette.text.secondary}
        sx={{ mt: 1 }}
        theme={theme}
      >
        Username: <strong>guest</strong>
      </Typography>
      <Typography
        variant="body2"
        color={theme.newPalette.text.secondary}
        theme={theme}
      >
        Password: <strong>password123</strong>
      </Typography>
    </StyledInfoPanel>
  );
};
const ChartGridLayout = () => {
  const { theme } = useMode();
  const isXs = useMediaQuery(theme.breakpoints.down('sm'));
  const {
    fetchCollections,
    collections,
    hasFetchedCollections,
    selectedCollectionId,
    selectedCollection,
  } = useManager();
  useEffect(() => {
    if (!hasFetchedCollections) {
      fetchCollections();
    }
  }, []);
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
          <SimpleCard
            theme={uniqueTheme}
            hasTitle={false}
            isTableOrChart={true}
          >
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
                    <Icon>show_chart</Icon>
                  </RCWrappedIcon>
                </MDBox>
              }
              sideText={`Change: ${percentageChange}%`}
            />
          </SimpleCard>
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
              <Grid item xs={12} sm={6} md={4} lg={3}>
                <CircularProgress />
              </Grid>
              <Grid item xs={12} sm={6} md={8} lg={9}>
                <newCollectionPanel />
              </Grid>
            </Grid>
          ) : (
            <ChartAreaComponent />
          )}
          {/* {selectedCollection?.cards?.length < 5 ? (
            <MDBox
              sx={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <CircularProgress />
              <newCollectionPanel />
            </MDBox>
          ) : (
            <ChartAreaComponent />
          )} */}
          {/* FORM SELECTOR ROW SECTION */}
          <FormSelectorRow isXs={isXs} />
          {/* TOP CARDS ROW SECTION */}
          <TopCardsDisplayRowComponent isXs={isXs} />
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

export default ChartGridLayout;
// !--------------------- FORM SELECTOR ROW COMPONENTS ---------------------
const FormSelectorRow = React.memo(({ isXs }) => {
  const { theme } = useMode();
  const formKeys = ['statRangeForm', 'timeRangeForm', 'themeRangeForm'];
  return renderCardContainer(
    // <SimpleCard theme={uniqueTheme} hasTitle={false} isSelectorRow={true}>
    <Grid
      container
      // spacing={2}
      sx={{
        width: '100%',
        flexDirection: isXs ? 'column' : 'row',
        // mx: 'auto',
        mt: theme.spacing(1),
      }}
    >
      <Grid
        item
        // xs={12}
        // sm={4}
        // md={4}
        // lg={4}
        sx={{
          // width: '100%',
          // ml: -16,
          flexGrow: 1,
          display: 'flex',
          flexDirection: 'row',
          // bgcolor: theme.palette.background.default,
        }}
        // key={formKey}
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
                // width: '100%',
              },
            }}
          />
        ))}
      </Grid>
    </Grid>,
    false,
    true
    // </SimpleCard>
  );
});
FormSelectorRow.displayName = 'FormSelectorRow';
// !--------------------- CHART COMPONENT ---------------------
const ChartAreaComponent = React.memo(() => {
  const { theme } = useMode();
  const { greenAccent, redAccent, grey } = theme.palette.chartTheme;
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
            <MyResponsiveLine
              key={timeRange}
              data={[memoChartData]}
              tickValues={tickValues}
              validMarkers={[memoMarker]}
              xFormat={memoChartData.id === '24hr' ? '%H:%M' : '%b %d'}
              redAccent={redAccent}
              greenAccent={greenAccent}
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
    <SimpleCard
      theme={uniqueTheme}
      hasTitle={false}
      isPrimary={false}
      data={''}
      noBottomMargin={true}
    >
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
          <TopCardsDisplayRow />
        </Grid>
      </Grid>
    </SimpleCard>
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
      <SimpleCard
        theme={uniqueTheme}
        hasTitle={false}
        data=""
        isTableOrChart={true}
        sx={{
          alignItems: 'flex-start',
        }}
      >
        <BoxHeader
          title="Collection Card List"
          subtitle="List of all cards in the collection"
          titleVariant="body1"
          icon={
            <MDBox>
              <RCWrappedIcon
                color="white"
                sx={{
                  background: theme.palette.success.main,
                }}
              >
                <Icon>list</Icon>
              </RCWrappedIcon>
            </MDBox>
          }
          sideText={`Last Updated: ${formattedTime}`}
        />
      </SimpleCard>
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
                color: theme.palette.chartTheme.grey.dark,
                border: 'none',
              },
              '& .MuiDataGrid-cell': {
                borderBottom: `1px solid ${theme.palette.chartTheme.grey.lightest} !important`,
              },
              '& .MuiDataGrid-columnHeaders': {
                borderBottom: `1px solid ${theme.palette.chartTheme.grey.lightest} !important`,
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
