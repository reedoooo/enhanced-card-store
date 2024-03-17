import { Grid, Skeleton } from '@mui/material';
import TotalValueOfCollectionsDisplay from './TotalValueOfCollectionsDisplay';
import TopFiveExpensiveCards from './TopFiveExpensiveCards';
import { useStatisticsStore } from '../context';
import SimpleCard from '../layout/REUSABLE_COMPONENTS/unique/SimpleCard';
import uniqueTheme from '../layout/REUSABLE_COMPONENTS/unique/uniqueTheme';

const CollectionListStats = () => {
  const { topFiveCards, totalValue, chartData } = useStatisticsStore();
  return (
    <Grid container spacing={2}>
      <Grid item xs={12} md={6} lg={4}>
        <SimpleCard
          theme={uniqueTheme}
          hasTitle={true}
          isPrimary={true}
          cardTitle="Primary Card Title"
          data={''}
        >
          This is a primary styled card content.
        </SimpleCard>
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
