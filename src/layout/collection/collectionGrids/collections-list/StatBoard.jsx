/* eslint-disable react/jsx-key */
import { Box, Grid, Typography } from '@mui/material';
// import PieChart from './statItems/PieChart';
import TotalPriceStatBox from './statItems/TotalPriceStatBox';
// import ValuDistributionCircle from './statItems/ValuDistributionCircle';
// import PricedCardList from './statItems/PricedCardList';
import SimpleCard from '../../../REUSABLE_COMPONENTS/unique/SimpleCard';
import uniqueTheme from '../../../REUSABLE_COMPONENTS/unique/uniqueTheme';
import { useAppContext, useMode } from '../../../../context';
import ValuDistributionCircle from './statItems/ValuDistributionCircle';
import PricedCardList from './statItems/PricedCardList';
import PerformanceStatBox from './statItems/PerformanceStatBox';
import MDBox from '../../../REUSABLE_COMPONENTS/MDBOX';
import styled from 'styled-components';
// const StatBoard = () => {
//   const { theme } = useMode();
//   return (
//     <SimpleCard
//       theme={uniqueTheme}
//       hasTitle={false}
//       isPrimary={false}
//       noBottomMargin={true}
//     >
//       <Grid
//         container
//         // spacing={2}
//         // gap={'20px'}
//         sx={{
//           alignItems: 'center',
//           // pt: '20px',
//           // mb: '20px',
//         }}
//       >
//         <Grid
//           item
//           xs={12}
//           sm={12}
//           md={4}
//           sx={{
//             alignContent: 'space-around',
//             // mb: '2rem',
//             borderRadius: theme.shape.borderRadius,
//           }}
//         >
//           {' '}
//           <ValuDistributionCircle />
//         </Grid>

//         <Grid
//           item
//           xs={12}
//           sm={12}
//           md={4}
//           sx={{
//             alignContent: 'space-around',
//             // mb: '2rem',
//             borderRadius: theme.shape.borderRadius,
//           }}
//         >
//           <TotalPriceStatBox
//             sx={{ mb: '2rem', borderRadius: theme.shape.borderRadius }}
//           />
//           <TotalPriceStatBox
//             sx={{ mb: '2rem', borderRadius: theme.shape.borderRadius }}
//           />
//         </Grid>
//         <Grid
//           item
//           xs={12}
//           sm={12}
//           md={4}
//           sx={{
//             alignContent: 'space-around',
//             // mb: '2rem',
//             borderRadius: theme.shape.borderRadius,
//           }}
//         >
//           <PricedCardList />
//         </Grid>
//       </Grid>
//     </SimpleCard>
//   );
// };

// export default StatBoard;
const StatBoxes = () => {
  const { theme } = useMode();
  return (
    <MDBox sx={{ width: '100%', minHeight: '100%' }}>
      <PerformanceStatBox />
      <TotalPriceStatBox />
    </MDBox>
  );
};
const DistCircle = () => {
  const { theme } = useMode();
  const colors = theme.palette.chartTheme;

  return (
    <MDBox sx={{ width: '100%', minHeight: '100%' }}>
      <ValuDistributionCircle />
    </MDBox>
  );
};

const PriceList = () => {
  const { theme } = useMode();
  const colors = theme.palette.chartTheme;

  return (
    <MDBox sx={{ width: '100%', minHeight: '100%' }}>
      <PricedCardList />
    </MDBox>
  );
};
const StatBoard = () => {
  return (
    <SimpleCard
      theme={uniqueTheme}
      hasTitle={false}
      isPrimary={false}
      noBottomMargin={true}
    >
      <Grid
        container
        // spacing={2}
        sx={{
          alignItems: 'flex-start',
          maxHeight: '270px',
          minHeight: '270px',
        }}
      >
        {[<StatBoxes />, <DistCircle />, <PriceList />].map(
          (component, index) => (
            <Grid
              item
              xs={12}
              sm={12}
              md={4}
              key={index}
              sx={{ width: '100%', minHeight: '100%' }}
            >
              {component}
            </Grid>
          )
        )}
      </Grid>
    </SimpleCard>
  );
};

export default StatBoard;
