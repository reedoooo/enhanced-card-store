import React from 'react';
import StatisticsDisplaySection from './StatisticsDisplaySection';
import { Skeleton, Typography } from '@mui/material';

const TotalValueOfCollectionsDisplay = ({ totalValue, iconName }) => {
  const renderTotalValueContent = () => {
    return totalValue != null ? (
      <Typography variant="h2">${totalValue.toFixed(2)}</Typography>
    ) : (
      <Skeleton variant="text" width={200} height={60} />
    );
  };

  return (
    <StatisticsDisplaySection
      iconName={iconName}
      title="Total Value of Collections"
      renderContent={renderTotalValueContent}
    />
  );
};

export default TotalValueOfCollectionsDisplay;

// import React from 'react';
// import {
//   Box,
//   Card,
//   Grid,
//   Icon,
//   Paper,
//   Skeleton,
//   Typography,
//   useTheme,
// } from '@mui/material';
// import { useMode } from '../../../context';
// import { StatisticHeader } from '../../../context/hooks/style-hooks/usePortfolioStyles';
// import styled from 'styled-components';
// import MDTypography from '../../../layout/collection/MDTypography';
// import MDBox from '../../../layout/collection/MDBOX';

// // Styled components
// const StatisticPaper = styled(Paper)(({ theme }) => ({
//   padding: theme.spacing(2),
//   flexGrow: 1,
//   color: theme.palette.text.secondary,
//   background: theme.palette.backgroundA.lightest,
//   boxShadow: theme.shadows[2],
//   borderRadius: theme.shape.borderRadius,
//   transition: 'box-shadow 0.3s',
//   '&:hover': {
//     boxShadow: theme.shadows[4],
//   },
// }));

// const StatisticValue = styled(Typography)(({ theme }) => ({
//   fontWeight: 'bold',
//   fontSize: '2rem',
//   color: theme.palette.backgroundA.lighter,
// }));

// const TotalValueOfCollectionsDisplay = ({ totalValue, icon }) => {
//   const { theme } = useMode();

//   const renderValue = () => {
//     if (totalValue == null) {
//       // Checks if totalValue is null or undefined
//       return <Skeleton variant="text" width={200} height={60} />;
//     }
//     return `$${totalValue.toFixed(2)}`;
//   };

//   return (
//     <Card
//       sx={{
//         height: '100%',
//         width: '100%',
//         display: 'flex',
//         flexGrow: 1,
//         flexDirection: 'row',
//         justifyContent: 'space-between',
//       }}
//     >
//       {/* <Grid item xs={12} sm={4}> */}
//       <StatisticPaper theme={theme}>
//         <StatisticHeader variant="h6" theme={theme}>
//           Total Value of Collections
//         </StatisticHeader>
//         <Box
//           sx={{
//             width: '100%',
//             height: '150px',
//             overflow: 'auto',
//           }}
//         >
//           {icon.component && (
//             // Icon JSX
//             <MDBox
//               display="flex"
//               alignItems="center"
//               justifyContent="center"
//               width={icon.component ? '4rem' : 'auto'}
//               height={icon.component ? '4rem' : 'auto'}
//               bgcolor={icon.color}
//             >
//               <Icon>{icon.component}</Icon>
//             </MDBox>
//           )}
//           {/* <StyledPaper
//               theme={theme}
//               sx={{ height: '100%', alignItems: 'center' }}
//             > */}
//           <StatisticHeader variant="h6" theme={theme}>
//             <MDTypography component="div" variant="button" color="text">
//               {'Total Value of Collections'}
//             </MDTypography>
//           </StatisticHeader>
//           <Box sx={{ height: '100%' }}>
//             <StatisticValue variant="h2" theme={theme}>
//               {renderValue()}
//             </StatisticValue>
//           </Box>

//           {/* </StyledPaper> */}
//           {/* </MDBox>
//       </MDBox>
//     </Card> */}
//         </Box>
//       </StatisticPaper>
//       {/* </Grid> */}
//     </Card>
//   );
// };

// export default TotalValueOfCollectionsDisplay;
