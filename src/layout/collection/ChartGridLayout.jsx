import React, { Suspense, useEffect, useMemo, useState } from 'react';
import { Grid, useMediaQuery, Icon, Box } from '@mui/material';
import MDBox from '../REUSABLE_COMPONENTS/MDBOX';
import { useMode } from '../../context';
import DashboardBox from '../REUSABLE_COMPONENTS/layout-utils/DashboardBox';
import BoxHeader from '../REUSABLE_COMPONENTS/layout-utils/BoxHeader';
import SimpleCard from '../REUSABLE_COMPONENTS/unique/SimpleCard';
import uniqueTheme from '../REUSABLE_COMPONENTS/unique/uniqueTheme';
import LoadingOverlay from '../REUSABLE_COMPONENTS/system-utils/LoadingOverlay';
import RCWrappedIcon from '../REUSABLE_COMPONENTS/RCWRAPPEDICON/RCWrappedIcon';
import { ResponsiveContainer } from 'recharts';
import {
  calculateChangePercentage,
  createMarkers,
  formatDateBasedOnRange,
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
import preparePortfolioTableData from './data/portfolioData';
import { useCompileCardData } from '../../context/MISC_CONTEXT/AppContext/useCompileCardData';

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

const ChartGridLayout = () => {
  const { theme } = useMode();
  const isXs = useMediaQuery(theme.breakpoints.down('sm'));
  const {
    fetchCollections,
    collections: allCollections,
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
  const { data, columns } = useMemo(() => {
    if (!selectedCollection?.cards) {
      return { data: [], columns: [] }; // Provide default empty structures
    }
    return preparePortfolioTableData(selectedCollection.cards);
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
                <MDBox>
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
              sideText={`Change: ${calculateChangePercentage(selectedCollection)}`}
            />
          </SimpleCard>
          {/* CHART ROW SECTION */}
          {selectedCollection?.cards?.length < 5 ? (
            <MDBox
              sx={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <CircularProgress />
            </MDBox>
          ) : (
            <ChartAreaComponent />
          )}
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
  return (
    <SimpleCard theme={uniqueTheme} hasTitle={false} isSelectorRow={true}>
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
            bgcolor: theme.palette.background.default,
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
      </Grid>
    </SimpleCard>
  );
});
FormSelectorRow.displayName = 'FormSelectorRow';
// !--------------------- CHART COMPONENT ---------------------
const ChartAreaComponent = React.memo(() => {
  const { theme } = useMode();
  const { greenAccent, redAccent, grey } = theme.palette.chartTheme;
  const { selectedTimeRange = '24hr' } = useCompileCardData();
  const { selectedCollection } = useManager();
  if (!selectedCollection) {
    return <LoadingOverlay />;
  }
  const memoChartData = useMemo(() => {
    const { selectedChartData, averagedChartData, selectedChartDataKey } =
      selectedCollection;
    return !selectedChartData?.data?.length ||
      selectedChartData?.data?.length < 5
      ? averagedChartData[selectedChartDataKey]
      : selectedChartData;
  }, [
    selectedCollection.selectedChartData,
    selectedCollection.averagedChartData,
    selectedCollection.selectedChartDataKey,
  ]);
  if (!memoChartData) {
    return <LoadingOverlay />;
  }
  const validMarkers = useMemo(() => {
    const markers = createMarkers(selectedCollection);
    return markers.filter((marker) => marker.id && marker.value !== undefined);
  }, [createMarkers, selectedCollection]);
  const tickValues = useMemo(() => {
    const { ticks } = formatDateBasedOnRange(selectedTimeRange);
    return ticks.split(' ').map((tick) => new Date(tick).getTime());
  }, [selectedTimeRange]);
  useEffect(() => {
    console.log('Chart data:', memoChartData);
  }, [memoChartData]);
  return renderCardContainer(
    <Suspense fallback={<LoadingOverlay />}>
      <ResponsiveContainer width="100%" height="100%">
        <ChartArea theme={theme} sx={{ minHeight: '500px' }}>
          <NivoContainer height={500}>
            <MyResponsiveLine
              key={selectedCollection.selectedChartDataKey}
              data={[memoChartData]}
              tickValues={tickValues}
              validMarkers={validMarkers}
              xFormat={memoChartData.id === '24hr' ? '%H:%M' : '%b %d'}
              redAccent={redAccent}
              greenAccent={greenAccent}
              grey={grey}
              text={theme.palette.text.primary}
            />
          </NivoContainer>
        </ChartArea>
      </ResponsiveContainer>
    </Suspense>
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
const CollectionCardList = React.memo(
  ({ data, columns, theme, selectedCollection }) => {
    const formattedTime = selectedCollection?.updatedAt
      ? new Date(selectedCollection?.updatedAt).toLocaleTimeString([], {
          hour: '2-digit',
          minute: '2-digit',
        })
      : 'Loading...';
    const entriesPerPage = {
      defaultValue: 5,
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
  }
);
CollectionCardList.displayName = 'CollectionCardList';
// !--------------------- END OF COMPONENTS ---------------------
