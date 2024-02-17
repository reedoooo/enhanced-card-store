import { Grid, Skeleton } from '@mui/material';
import TotalValueOfCollectionsDisplay from '../../../components/other/dataDisplay/TotalValueOfCollectionsDisplay';
import TopFiveExpensiveCards from '../../../components/other/dataDisplay/TopFiveExpensiveCards';
import { useStatisticsStore } from '../../../context';

const CollectionListStats = () => {
  const { topFiveCards, totalValue, chartData } = useStatisticsStore();
  return (
    <Grid container spacing={2}>
      <Grid item xs={12} md={6} lg={4}>
        {/* <PieChartStats
				title="Collection Statistics"
				description="(+15%) increase in overall collection value."
				date="updated 4 min ago"
				chartData={chartData}
				iconName="PieChartIcon"
			/> */}
        <Skeleton variant="rectangular" width="100%" height={180} />
      </Grid>
      <Grid
        item
        xs={false}
        md={6}
        lg={false}
        sx={{ display: { xs: 'none', md: 'block', lg: 'none' } }}
      >
        <Skeleton variant="rectangular" width="100%" height={200} />
      </Grid>
      <Grid item xs={12} md={6} lg={4}>
        <TotalValueOfCollectionsDisplay
          totalValue={totalValue && totalValue}
          iconName="AttachMoneyIcon"
        />
      </Grid>
      <Grid item xs={12} md={6} lg={4}>
        <TopFiveExpensiveCards
          topFiveCards={topFiveCards && topFiveCards}
          iconName="EmojiEventsIcon"
        />
      </Grid>
    </Grid>
  );
};

export default CollectionListStats;
