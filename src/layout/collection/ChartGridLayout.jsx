import React, { Suspense, useEffect, useMemo, useState } from 'react';
import { Grid, useMediaQuery, Icon, Box } from '@mui/material';
import MDBox from '../REUSABLE_COMPONENTS/MDBOX';
import { useAppContext, useMode } from '../../context';
import DashboardBox from '../REUSABLE_COMPONENTS/DashboardBox';
import BoxHeader from '../REUSABLE_COMPONENTS/BoxHeader';
import SimpleCard from '../REUSABLE_COMPONENTS/unique/SimpleCard';
import uniqueTheme from '../REUSABLE_COMPONENTS/unique/uniqueTheme';
import { ChartArea } from '../../pages/pageStyles/StyledComponents';
import useSelectedCollection from '../../context/MAIN_CONTEXT/CollectionContext/useSelectedCollection';
import { ChartConfiguration } from './ChartConfigs';
import LoadingOverlay from '../REUSABLE_COMPONENTS/system-utils/LoadingOverlay';
import RCWrappedIcon from '../REUSABLE_COMPONENTS/RCWRAPPEDICON/RCWrappedIcon';
import { ResponsiveContainer } from 'recharts';
import preparePortfolioTableData from './data/portfolioData';
import { calculateChangePercentage } from '../../context/Helpers';
import { TopCardsDisplayRow } from './TopCardsDisplayRow';
import { formFields } from '../../components/forms/formsConfig';
import RCDynamicForm from '../../components/forms/Factory/RCDynamicForm';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';

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
  const selectionData = useSelectedCollection();
  if (!selectionData) {
    return <LoadingOverlay />;
  }
  const { selectedCollection, showCollections } = useSelectedCollection();
  const { data, columns } = useMemo(
    () => preparePortfolioTableData(selectedCollection?.cards),
    [selectedCollection?.cards]
  );
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
          <ChartAreaComponent theme={theme} />
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
const FormSelectorRow = React.memo(({ isXs }) => {
  const formKeys = ['statRangeForm', 'timeRangeForm', 'themeRangeForm'];
  return (
    <SimpleCard theme={uniqueTheme} hasTitle={false} isSelectorRow={true}>
      <Grid
        container
        spacing={2}
        sx={{ width: '100%', flexDirection: isXs ? 'column' : 'row' }}
      >
        <Grid
          item
          // xs={12}
          // sm={4}
          // md={4}
          // lg={4}
          sx={{
            width: '100%',
            flexGrow: 1,
            display: 'flex',
            flexDirection: 'row',
          }}
          // key={formKey}
        >
          {' '}
          {formKeys?.map((formKey) => (
            <RCDynamicForm
              key={formKey}
              formKey={formKey}
              inputs={formFields[formKey]}
              userInterfaceOptions={{}}
            />
          ))}
        </Grid>
      </Grid>
    </SimpleCard>
  );
});
FormSelectorRow.displayName = 'FormSelectorRow';
const ChartAreaComponent = React.memo(({ theme }) => {
  const { selectedCollection, markers } = useSelectedCollection();
  return renderCardContainer(
    <Suspense fallback={<LoadingOverlay />}>
      <ResponsiveContainer width="100%" height="100%">
        <ChartConfiguration />
      </ResponsiveContainer>
    </Suspense>
  );
});
ChartAreaComponent.displayName = 'ChartAreaComponent';
const TopCardsDisplayRowComponent = React.memo(({ isXs }) => {
  return (
    <SimpleCard theme={uniqueTheme} hasTitle={false} isPrimary={true} data={''}>
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
          sx={{ width: '100%', flexGrow: 1 }}
        >
          <TopCardsDisplayRow />
        </Grid>
      </Grid>
    </SimpleCard>
  );
});
TopCardsDisplayRowComponent.displayName = 'TopCardsDisplayRowComponent';
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
{
  /* <PricedDataTable
entriesPerPage={{
  defaultValue: 5,
  entries: [5, 10, 15, 20],
}}
canSearch={true}
table={{ columns, data }}
isSorted={true}
noEndBorder
/> */
}
