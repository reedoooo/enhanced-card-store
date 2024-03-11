import React from 'react';
import { Grid, Card, useMediaQuery, Icon } from '@mui/material';
import MDBox from '../../REUSABLE_COMPONENTS/MDBOX';
import CollectionPortfolioChartContainer from './cards-chart/CollectionPortfolioChartContainer';
import DataTable from './cards-datatable';
import { useMode } from '../../../context';
import DashboardBox from '../../REUSABLE_COMPONENTS/DashboardBox';
import BoxHeader from '../../REUSABLE_COMPONENTS/BoxHeader';
import { UpdaterAndStatisticsRow } from './cards-chart/UpdaterAndStatisticsRow';
import SimpleCard from '../../REUSABLE_COMPONENTS/unique/SimpleCard';
import uniqueTheme from '../../REUSABLE_COMPONENTS/unique/uniqueTheme';

const ChartGridLayout = ({ selectedCards, removeCard, columns, data }) => {
  const { theme } = useMode();
  const isXs = useMediaQuery(theme.breakpoints.down('sm'));
  const isLg = useMediaQuery(theme.breakpoints.up('lg'));
  const tableSize = isXs ? 'less' : isLg ? 'large' : 'small';
  console.log({ selectedCards, tableSize, columns, data }); // Debug log
  // A function to render MDBox Card container for reusability
  const renderCardContainer = (content) => (
    <MDBox sx={{ borderRadius: '10px', flexGrow: 1, overflow: 'hidden' }}>
      <SimpleCard theme={uniqueTheme} content={content} hasTitle={false}>
        {/* <Card sx={{ height: '100%', borderRadius: '10px' }}> */}
        {/* <MDBox pt={3} sx={{ borderRadius: '10px' }}> */}
        {content}
        {/* </MDBox> */}
      </SimpleCard>
    </MDBox>
  );

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
            <CollectionPortfolioChartContainer
              selectedCards={selectedCards}
              removeCard={removeCard}
            />
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
