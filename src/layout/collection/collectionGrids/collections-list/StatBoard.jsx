import { Grid } from '@mui/material';
// import PieChart from './statItems/PieChart';
// import TotalPriceStatBox from './statItems/TotalPriceStatBox';
// import ValuDistributionCircle from './statItems/ValuDistributionCircle';
// import PricedCardList from './statItems/PricedCardList';
import SimpleCard from '../../../REUSABLE_COMPONENTS/unique/SimpleCard';
import uniqueTheme from '../../../REUSABLE_COMPONENTS/unique/uniqueTheme';
import { ChartArea } from '../../../../pages/pageStyles/StyledComponents';
import NivoContainer from '../cards-chart/NivoContainer';
import { useMode } from '../../../../context';
import ValuDistributionCircle from './statItems/ValuDistributionCircle';
import PricedCardList from './statItems/PricedCardList';
import ZenEnso from '../../../../assets/animations/ZenEnso';
import MDBox from '../../../REUSABLE_COMPONENTS/MDBOX';
// import ValueDistPieChart from './statItems/ValueDistPieChart';

// const StatBoard = () => {
//   return (
//     <Grid container spacing={2} alignItems="center">
//       <Grid item xs={12} sm={6} md={3}>
//         {item}
//       </Grid>
//       <Grid item xs={12} sm={6} md={3}>
//         {item}
//       </Grid>
//       <Grid item xs={12} sm={6} md={3}>
//         {item}
//       </Grid>
//     </Grid>
//   );
// };

const StatBoard = () => {
  const { theme } = useMode();
  return (
    <SimpleCard
      // ref={listRef}
      theme={uniqueTheme}
      hasTitle={false}
      isPrimary={false}
      noBottomMargin={true}
    >
      <Grid
        container
        spacing={2}
        // gap={'20px'}
        sx={{
          alignItems: 'center',
          // pt: '20px',
          // mb: '20px',
        }}
      >
        {/* <Grid item xs={12}>
          <MDBox
            sx={{
              height: '400px',
            }}
          >
            <ZenEnso />
          </MDBox>{' '}
        </Grid> */}
        {/* <ChartArea theme={theme}> */}
        {/* <ChartErrorBoundary> */}
        {/* <NivoContainer height={500}>
              <ValuDistributionCircle />
            </NivoContainer> */}
        {/* </ChartErrorBoundary> */}
        {/* </ChartArea>
        {/* <Grid item xs={12} sm={6} md={3}>
          <TotalPriceStatBox />
        </Grid> */}
        {/* <Grid item xs={12} sm={6} md={3}>
        <ValuDistributionCircle />
      </Grid> */}
        <Grid item xs={12} md={6}>
          <PricedCardList />
        </Grid>
      </Grid>
    </SimpleCard>
  );
};

export default StatBoard;
