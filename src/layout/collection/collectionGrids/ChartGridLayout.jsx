import React from 'react';
import { Grid, Card, useMediaQuery } from '@mui/material';
import MDBox from '../../REUSABLE_COMPONENTS/MDBOX';
import CollectionPortfolioChartContainer from './CollectionPortfolioChartContainer';
import DataTable from '.';
import { useTheme } from '@mui/material/styles';

const ChartGridLayout = ({ selectedCards, removeCard, columns, data }) => {
  const theme = useTheme();
  const isXs = useMediaQuery(theme.breakpoints.down('sm'));
  const isLg = useMediaQuery(theme.breakpoints.up('lg'));

  // Simplified determination of tableSize based on the screen size
  const tableSize = isXs ? 'less' : isLg ? 'large' : 'small';

  // A function to render MDBox Card container for reusability
  const renderCardContainer = (content) => (
    <MDBox sx={{ borderRadius: '10px', flexGrow: 1 }}>
      <Card sx={{ height: '100%', borderRadius: '10px' }}>
        <MDBox pt={3} sx={{ borderRadius: '10px' }}>
          {content}
        </MDBox>
      </Card>
    </MDBox>
  );

  return (
    <MDBox mt={4.5}>
      <Grid container spacing={3} sx={{ flexGrow: 1 }}>
        {/* PORTFOLIO CHARTS */}
        <Grid item xs={12} lg={7} sx={{ display: 'flex' }}>
          {renderCardContainer(
            <CollectionPortfolioChartContainer
              selectedCards={selectedCards}
              removeCard={removeCard}
            />
          )}
        </Grid>
        {/* PORTFOLIO CARD LIST TABLE */}
        <Grid item xs={12} lg={5} sx={{ display: 'flex' }}>
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
        </Grid>
      </Grid>
    </MDBox>
  );
};

export default ChartGridLayout;
