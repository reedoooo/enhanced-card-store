import React from 'react';
import { Box, Grid, useTheme, useMediaQuery } from '@mui/material';
import PortfolioChart from '../../components/other/dataDisplay/chart/PortfolioChart';
import TimeRangeSelector from '../../components/other/InputComponents/TimeRangeSelector';
import UpdateStatusBox2 from '../../components/other/InputComponents/UpdateStatusBox2';
import TopCardsDisplay from '../../components/other/dataDisplay/TopCardsDisplay';
import CollectionStatisticsSelector from '../../components/other/InputComponents/CollectionStatisticsSelector';
import {
  useChartContext,
  useCollectionStore,
  useCombinedContext,
  useStatisticsStore,
  useMode,
} from '../../context';

const CollectionPortfolioChartContainer = ({ selectedCards, removeCard }) => {
  const { theme } = useMode();
  const theme2 = useTheme();
  const isMobile = useMediaQuery(theme2.breakpoints.down('sm'));
  const { timeRange } = useChartContext();
  const { allCollections } = useCollectionStore();
  const { socket } = useCombinedContext();
  const { stats, statsByCollectionId } = useStatisticsStore();

  return (
    <Box
      sx={{
        maxWidth: '100%',
        width: '100%',
        minHeight: '90vh',
        margin: 'auto',
        justifyContent: 'center',
        alignItems: 'center',
        padding: isMobile ? theme.spacing(1) : theme.spacing(2),
      }}
    >
      {/* Portfolio Chart Row */}
      <Grid container spacing={isMobile ? 1 : 2}>
        <Grid item xs={12}>
          <PortfolioChart
            selectedCards={selectedCards}
            removeCard={removeCard}
          />
        </Grid>
      </Grid>

      {/* Updaters Row */}
      <Grid container spacing={isMobile ? 1 : 2} marginBottom={2}>
        <Grid item xs={12} sm={4}>
          <UpdateStatusBox2 socket={socket} />
        </Grid>
        <Grid item xs={12} sm={4}>
          <TimeRangeSelector />
        </Grid>
        <Grid item xs={12} sm={4}>
          <CollectionStatisticsSelector timeRange={timeRange} stats={stats} />
        </Grid>
      </Grid>

      {/* Top Cards Display Row */}
      <Grid container spacing={isMobile ? 1 : 2}>
        <Grid item xs={12}>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              height: '100%',
              alignItems: 'center',
              background: theme.palette.background.dark,
              padding: isMobile ? theme.spacing(1) : theme.spacing(2),
              color: '#fff',
              borderRadius: 4,
            }}
          >
            <TopCardsDisplay />
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default CollectionPortfolioChartContainer;
